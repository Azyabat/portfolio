import { FORECAST_HOURS, WEATHER_LABELS } from './consts'

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

type GeocodingResult = {
  id: number
  name: string
  country?: string
  admin1?: string
  latitude: number
  longitude: number
}

type GeocodingResponse = {
  results?: GeocodingResult[]
}

type ForecastResponse = {
  current: {
    temperature_2m: number
    apparent_temperature: number
    relative_humidity_2m: number
    weather_code: number
    wind_speed_10m: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    weather_code: number[]
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

function getWeatherType(code: number): WeatherType {
  if (code === 0 || code === 1) return 'sun'
  if (code === 2) return 'clouds'
  if (code === 3 || code === 45 || code === 48) return 'overcast'

  return 'rain'
}

function getWeatherLabel(code: number) {
  return WEATHER_LABELS[getWeatherType(code)]
}

function roundTemperature(value: number) {
  return Math.round(value)
}

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function getForecastItems(response: ForecastResponse, dayOffset: number): ForecastItem[] {
  const date = new Date()
  date.setDate(date.getDate() + dayOffset)

  const dateKey = getDateKey(date)
  const items: ForecastItem[] = []

  response.hourly.time.forEach((time, index) => {
    const hour = Number(time.slice(11, 13))

    if (time.startsWith(dateKey) && FORECAST_HOURS.includes(hour)) {
      items.push({
        time: `${time.slice(11, 13)}:00`,
        temperature: roundTemperature(response.hourly.temperature_2m[index]),
        type: getWeatherType(response.hourly.weather_code[index]),
      })
    }
  })

  return items
}

function getCityLabel(city: GeocodingResult) {
  return [city.name, getCityDetails(city)].filter(Boolean).join(', ')
}

function getCityDetails(city: GeocodingResult) {
  return [city.admin1, city.country].filter(item => item && item !== city.name).join(', ')
}

async function getCityCoordinates(city: string) {
  const params = new URLSearchParams({
    name: city,
    count: '1',
    language: 'ru',
    format: 'json',
  })

  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`)

  if (!response.ok) {
    throw new Error('Не удалось найти город')
  }

  const data: GeocodingResponse = await response.json()
  const result = data.results?.[0]

  if (!result) {
    throw new Error('Город не найден')
  }

  return result
}

export async function searchCitySuggestions(city: string): Promise<CitySuggestion[]> {
  const trimmedCity = city.trim()

  if (trimmedCity.length < 2) return []

  const params = new URLSearchParams({
    name: trimmedCity,
    count: '3',
    language: 'ru',
    format: 'json',
  })

  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`)

  if (!response.ok) {
    return []
  }

  const data: GeocodingResponse = await response.json()

  return (data.results ?? []).map(item => ({
    id: item.id,
    name: item.name,
    label: getCityLabel(item),
    details: getCityDetails(item),
    latitude: item.latitude,
    longitude: item.longitude,
  }))
}

async function getForecast(latitude: number, longitude: number) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m',
    hourly: 'temperature_2m,weather_code',
    forecast_days: '2',
    timezone: 'auto',
  })

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)

  if (!response.ok) {
    throw new Error('Не удалось загрузить прогноз')
  }

  return response.json() as Promise<ForecastResponse>
}

export async function getWeatherByLocation(location: CitySuggestion): Promise<WeatherData> {
  const forecast = await getForecast(location.latitude, location.longitude)

  return {
    city: location.name,
    temperature: roundTemperature(forecast.current.temperature_2m),
    feelsLike: roundTemperature(forecast.current.apparent_temperature),
    condition: getWeatherLabel(forecast.current.weather_code),
    type: getWeatherType(forecast.current.weather_code),
    wind: Math.round(forecast.current.wind_speed_10m),
    humidity: forecast.current.relative_humidity_2m,
    today: getForecastItems(forecast, 0),
    tomorrow: getForecastItems(forecast, 1),
  }
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const location = await getCityCoordinates(city)

  return getWeatherByLocation({
    id: location.id,
    name: location.name,
    label: getCityLabel(location),
    details: getCityDetails(location),
    latitude: location.latitude,
    longitude: location.longitude,
  })
}
