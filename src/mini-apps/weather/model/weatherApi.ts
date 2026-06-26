import {
  CITY_SUGGESTIONS_LIMIT,
  FORECAST_HOURS,
  NOMINATIM_SEARCH_URL,
  WEATHER_LABELS,
  WTTR_WEATHER_URL,
} from './consts'

export type WeatherType = 'sun' | 'clouds' | 'overcast' | 'rain'

export type ForecastItem = {
  time: string
  temperature: number
  type: WeatherType
}

export type WeatherData = {
  city: string
  temperature: number
  feelsLike: number
  condition: string
  type: WeatherType
  wind: number
  humidity: number
  today: ForecastItem[]
  tomorrow: ForecastItem[]
}

type NominatimAddress = {
  city?: string
  town?: string
  village?: string
  municipality?: string
  state?: string
  region?: string
  country?: string
}

type NominatimResult = {
  place_id: number
  lat: string
  lon: string
  display_name: string
  name?: string
  address?: NominatimAddress
}

type WttrWeatherDescription = {
  value: string
}

type WttrCurrentCondition = {
  temp_C: string
  FeelsLikeC: string
  humidity: string
  windspeedKmph: string
  weatherCode: string
  weatherDesc?: WttrWeatherDescription[]
  lang_ru?: WttrWeatherDescription[]
}

type WttrHourlyForecast = {
  time: string
  tempC: string
  weatherCode: string
}

type WttrDayForecast = {
  hourly: WttrHourlyForecast[]
}

type WttrForecastResponse = {
  current_condition: WttrCurrentCondition[]
  weather: WttrDayForecast[]
}

export type CitySuggestion = {
  id: number
  name: string
  label: string
  details: string
  latitude: number
  longitude: number
}

function getWeatherType(code: number): WeatherType {
  if (code === 113) return 'sun'
  if (code === 116 || code === 119) return 'clouds'
  if (code === 122 || code === 143 || code === 248 || code === 260) return 'overcast'

  return 'rain'
}

function getWeatherLabel(condition: WttrCurrentCondition) {
  const code = Number(condition.weatherCode)

  return condition.lang_ru?.[0]?.value ?? condition.weatherDesc?.[0]?.value ?? WEATHER_LABELS[getWeatherType(code)]
}

function roundTemperature(value: number) {
  return Math.round(value)
}

function getNumberValue(value: string) {
  const numberValue = Number(value)

  return Number.isFinite(numberValue) ? numberValue : 0
}

function getForecastHour(time: string) {
  const hour = Math.floor(getNumberValue(time) / 100)

  return String(hour).padStart(2, '0')
}

function getForecastItems(response: WttrForecastResponse, dayOffset: number): ForecastItem[] {
  const dayForecast = response.weather[dayOffset]

  if (!dayForecast) return []

  const preferredItems = dayForecast.hourly.filter(item => FORECAST_HOURS.includes(getNumberValue(item.time) / 100))
  const items = preferredItems.length > 0 ? preferredItems : dayForecast.hourly.slice(0, FORECAST_HOURS.length)

  return items.slice(0, FORECAST_HOURS.length).map(item => ({
    time: `${getForecastHour(item.time)}:00`,
    temperature: roundTemperature(getNumberValue(item.tempC)),
    type: getWeatherType(getNumberValue(item.weatherCode)),
  }))
}

function getCityName(city: NominatimResult) {
  return (
    city.address?.city ??
    city.address?.town ??
    city.address?.village ??
    city.address?.municipality ??
    city.name ??
    city.display_name.split(',')[0]
  )
}

function getCityDetails(city: NominatimResult, name: string) {
  return [city.address?.state ?? city.address?.region, city.address?.country]
    .filter(item => item && item !== name)
    .join(', ')
}

function mapCitySuggestion(city: NominatimResult): CitySuggestion {
  const name = getCityName(city)
  const details = getCityDetails(city, name)

  return {
    id: city.place_id,
    name,
    label: [name, details].filter(Boolean).join(', '),
    details,
    latitude: getNumberValue(city.lat),
    longitude: getNumberValue(city.lon),
  }
}

async function getCityCoordinates(city: string) {
  const suggestions = await searchCitySuggestions(city)
  const result = suggestions[0]

  if (!result) {
    throw new Error('Город не найден')
  }

  return result
}

async function fetchCitySuggestions(city: string) {
  const params = new URLSearchParams({
    q: city,
    format: 'jsonv2',
    addressdetails: '1',
    limit: String(CITY_SUGGESTIONS_LIMIT),
    'accept-language': 'ru',
  })

  const response = await fetch(`${NOMINATIM_SEARCH_URL}?${params}`)

  if (!response.ok) {
    throw new Error('Не удалось найти город')
  }

  return response.json() as Promise<NominatimResult[]>
}

export async function searchCitySuggestions(city: string): Promise<CitySuggestion[]> {
  const trimmedCity = city.trim()

  if (trimmedCity.length < 2) return []

  const cities = await fetchCitySuggestions(trimmedCity)

  return cities.map(mapCitySuggestion)
}

async function getForecast(latitude: number, longitude: number) {
  const location = `${latitude},${longitude}`
  const params = new URLSearchParams({ format: 'j1', lang: 'ru' })

  const response = await fetch(`${WTTR_WEATHER_URL}/${location}?${params}`)

  if (!response.ok) {
    throw new Error('Не удалось загрузить прогноз')
  }

  return response.json() as Promise<WttrForecastResponse>
}

export async function getWeatherByLocation(location: CitySuggestion): Promise<WeatherData> {
  const forecast = await getForecast(location.latitude, location.longitude)
  const current = forecast.current_condition[0]

  if (!current) {
    throw new Error('Не удалось загрузить текущую погоду')
  }

  return {
    city: location.name,
    temperature: roundTemperature(getNumberValue(current.temp_C)),
    feelsLike: roundTemperature(getNumberValue(current.FeelsLikeC)),
    condition: getWeatherLabel(current),
    type: getWeatherType(getNumberValue(current.weatherCode)),
    wind: Math.round(getNumberValue(current.windspeedKmph) / 3.6),
    humidity: getNumberValue(current.humidity),
    today: getForecastItems(forecast, 0),
    tomorrow: getForecastItems(forecast, 1),
  }
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const location = await getCityCoordinates(city)

  return getWeatherByLocation({
    id: location.id,
    name: location.name,
    label: location.label,
    details: location.details,
    latitude: location.latitude,
    longitude: location.longitude,
  })
}
