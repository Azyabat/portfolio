import {
  CITY_SUGGESTIONS_LIMIT,
  FORECAST_HOURS,
  MET_LOCATION_FORECAST_URL,
  NOMINATIM_SEARCH_URL,
  WEATHER_LABELS,
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

type MetForecastDetails = {
  air_temperature: number
  relative_humidity: number
  wind_speed: number
}

type MetForecastSummary = {
  symbol_code: string
}

type MetForecastPeriod = {
  summary: MetForecastSummary
}

type MetForecastItem = {
  time: string
  data: {
    instant: {
      details: MetForecastDetails
    }
    next_1_hours?: MetForecastPeriod
    next_6_hours?: MetForecastPeriod
    next_12_hours?: MetForecastPeriod
  }
}

type MetForecastResponse = {
  properties: {
    timeseries: MetForecastItem[]
  }
}

export type CitySuggestion = {
  id: number
  name: string
  label: string
  details: string
  latitude: number
  longitude: number
}

function getWeatherType(symbolCode: string): WeatherType {
  if (symbolCode.startsWith('clearsky') || symbolCode.startsWith('fair')) return 'sun'
  if (symbolCode.startsWith('partlycloudy') || symbolCode.startsWith('cloudy')) return 'clouds'
  if (symbolCode.startsWith('fog')) return 'overcast'

  return 'rain'
}

function getWeatherLabel(symbolCode: string) {
  return WEATHER_LABELS[getWeatherType(symbolCode)]
}

function getWeatherSymbol(item: MetForecastItem) {
  return (
    item.data.next_1_hours?.summary.symbol_code ??
    item.data.next_6_hours?.summary.symbol_code ??
    item.data.next_12_hours?.summary.symbol_code ??
    'cloudy'
  )
}

function getFeelsLikeTemperature(temperature: number, windSpeed: number) {
  if (temperature > 10 || windSpeed <= 1.34) return temperature

  return 13.12 + 0.6215 * temperature - 11.37 * windSpeed ** 0.16 + 0.3965 * temperature * windSpeed ** 0.16
}

function getDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function roundTemperature(value: number) {
  return Math.round(value)
}

function getNumberValue(value: string | number) {
  const numberValue = Number(value)

  return Number.isFinite(numberValue) ? numberValue : 0
}

function getForecastHour(date: Date) {
  const hour = date.getHours()

  return String(hour).padStart(2, '0')
}

function getForecastItems(response: MetForecastResponse, dayOffset: number): ForecastItem[] {
  const date = new Date()
  date.setDate(date.getDate() + dayOffset)

  const dateKey = getDateKey(date)
  const dayItems = response.properties.timeseries.filter(item => getDateKey(new Date(item.time)) === dateKey)
  const preferredItems = dayItems.filter(item => FORECAST_HOURS.includes(new Date(item.time).getHours()))
  const items = preferredItems.length > 0 ? preferredItems : dayItems.slice(0, FORECAST_HOURS.length)

  return items.slice(0, FORECAST_HOURS.length).map(item => {
    const date = new Date(item.time)
    const symbolCode = getWeatherSymbol(item)

    return {
      time: `${getForecastHour(date)}:00`,
      temperature: roundTemperature(item.data.instant.details.air_temperature),
      type: getWeatherType(symbolCode),
    }
  })
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
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
  })

  const response = await fetch(`${MET_LOCATION_FORECAST_URL}?${params}`)

  if (!response.ok) {
    throw new Error('Не удалось загрузить прогноз')
  }

  return response.json() as Promise<MetForecastResponse>
}

function mapWeatherData(forecast: MetForecastResponse, city: string): WeatherData {
  const current = forecast.properties.timeseries[0]

  if (!current) {
    throw new Error('Не удалось загрузить текущую погоду')
  }

  const currentDetails = current.data.instant.details
  const currentSymbol = getWeatherSymbol(current)

  return {
    city,
    temperature: roundTemperature(currentDetails.air_temperature),
    feelsLike: roundTemperature(getFeelsLikeTemperature(currentDetails.air_temperature, currentDetails.wind_speed)),
    condition: getWeatherLabel(currentSymbol),
    type: getWeatherType(currentSymbol),
    wind: Math.round(currentDetails.wind_speed),
    humidity: Math.round(currentDetails.relative_humidity),
    today: getForecastItems(forecast, 0),
    tomorrow: getForecastItems(forecast, 1),
  }
}

export async function getWeatherByLocation(location: CitySuggestion): Promise<WeatherData> {
  const forecast = await getForecast(location.latitude, location.longitude)

  return mapWeatherData(forecast, location.name)
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const trimmedCity = city.trim()

  if (!trimmedCity) {
    throw new Error('Введите название города')
  }

  const location = await searchCitySuggestions(trimmedCity)
  const firstLocation = location[0]

  if (!firstLocation) {
    throw new Error('Город не найден')
  }

  const forecast = await getForecast(firstLocation.latitude, firstLocation.longitude)

  return mapWeatherData(forecast, firstLocation.name)
}
