import type { WeatherType } from './weatherApi'

export const WEATHER_LABELS: Record<WeatherType, string> = {
  sun: 'Солнечно',
  clouds: 'Облачно',
  overcast: 'Пасмурно',
  rain: 'Дождь',
}

export const WEATHER_ICONS: Record<WeatherType, string> = {
  sun: '/weather/sun.svg',
  clouds: '/weather/clouds.svg',
  overcast: '/weather/overcast.svg',
  rain: '/weather/rain.svg',
}

export const FORECAST_HOURS = [9, 12, 15, 18]
export const CITY_SUGGESTIONS_LIMIT = 3
export const NOMINATIM_SEARCH_URL = 'https://nominatim.openstreetmap.org/search'
export const MET_LOCATION_FORECAST_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact'
