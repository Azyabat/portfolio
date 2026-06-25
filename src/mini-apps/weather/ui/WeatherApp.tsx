'use client'
import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'
import {
  getWeatherByCity,
  getWeatherByLocation,
  searchCitySuggestions,
  WEATHER_ICONS,
  WEATHER_LABELS,
  type CitySuggestion,
  type ForecastItem,
  type WeatherData,
} from '../model/weatherApi'
import styles from './WeatherApp.module.css'

function ForecastCard({ item }: { item: ForecastItem }) {
  return (
    <div className={styles.forecastCard}>
      <span className={styles.forecastTime}>{item.time}</span>
      <Image src={WEATHER_ICONS[item.type]} alt="" width={34} height={34} aria-hidden="true" />
      <strong>{item.temperature}°</strong>
    </div>
  )
}

export function WeatherApp() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [city, setCity] = useState('')
  const [message, setMessage] = useState('Введите город и загрузите прогноз')
  const [isLoading, setIsLoading] = useState(true)
  const [isSearchingCities, setIsSearchingCities] = useState(false)
  const [lastCity, setLastCity] = useState('Москва')
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([])

  const loadWeather = async (nextCity: string) => {
    const trimmedCity = nextCity.trim()

    if (!trimmedCity) {
      setMessage('Введите название города')
      return
    }

    try {
      setIsLoading(true)
      setMessage('Загружаю прогноз...')

      const weatherData = await getWeatherByCity(trimmedCity)

      setWeather(weatherData)
      setLastCity(weatherData.city)
      setCity('')
      setSuggestions([])
      setMessage(`Погода обновлена: ${weatherData.city}`)
    } catch {
      setMessage('Не удалось загрузить погоду для этого города')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadWeather('Москва')
  }, [])

  useEffect(() => {
    if (city.trim().length < 2) {
      setSuggestions([])
      return
    }

    let isActualRequest = true

    const timerId = window.setTimeout(async () => {
      setIsSearchingCities(true)

      try {
        const foundCities = await searchCitySuggestions(city)

        if (isActualRequest) {
          setSuggestions(foundCities)
        }
      } catch {
        if (isActualRequest) {
          setSuggestions([])
        }
      } finally {
        if (isActualRequest) {
          setIsSearchingCities(false)
        }
      }
    }, 350)

    return () => {
      isActualRequest = false
      window.clearTimeout(timerId)
    }
  }, [city])

  const searchWeather = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    loadWeather(city)
  }

  const chooseSuggestion = async (suggestion: CitySuggestion) => {
    try {
      setIsLoading(true)
      setCity('')
      setSuggestions([])
      setMessage(`Загружаю прогноз: ${suggestion.label}`)

      const weatherData = await getWeatherByLocation(suggestion)

      setWeather(weatherData)
      setLastCity(weatherData.city)
      setMessage(`Погода обновлена: ${suggestion.label}`)
    } catch {
      setMessage('Не удалось загрузить погоду для этого города')
    } finally {
      setIsLoading(false)
    }
  }

  const tomorrowMax = weather ? Math.max(...weather.tomorrow.map(item => item.temperature)) : 0
  const tomorrowMin = weather ? Math.min(...weather.tomorrow.map(item => item.temperature)) : 0

  return (
    <div className={styles.weatherApp}>
      <div className={styles.header}>
        <div>
          <div className={styles.kicker}>Погода</div>
          <div className={styles.city}>{weather?.city ?? lastCity}</div>
        </div>
        {weather && (
          <Image
            src={WEATHER_ICONS[weather.type]}
            alt={WEATHER_LABELS[weather.type]}
            width={82}
            height={82}
            className={styles.mainIcon}
          />
        )}
      </div>

      <form className={styles.search} onSubmit={searchWeather}>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            value={city}
            onChange={event => setCity(event.target.value)}
            placeholder="Найти город"
            disabled={isLoading}
          />
          {suggestions.length > 0 && (
            <div className={styles.suggestions}>
              {suggestions.map(suggestion => (
                <button
                  key={suggestion.id}
                  className={styles.suggestionButton}
                  type="button"
                  onClick={() => chooseSuggestion(suggestion)}
                >
                  <span>{suggestion.name}</span>
                  <small>{suggestion.details}</small>
                </button>
              ))}
            </div>
          )}
        </div>
        <button className={styles.searchButton} type="submit" disabled={isLoading}>
          {isLoading || isSearchingCities ? '...' : 'Найти'}
        </button>
      </form>

      <div className={styles.message}>{message}</div>

      {weather ? (
        <>
          <div className={styles.current}>
            <div>
              <div className={styles.temperature}>{weather.temperature}°</div>
              <div className={styles.condition}>{weather.condition}</div>
              <div className={styles.feelsLike}>Ощущается как {weather.feelsLike}°</div>
            </div>
            <div className={styles.details}>
              <div>
                <span>Ветер</span>
                <strong>{weather.wind} м/с</strong>
              </div>
              <div>
                <span>Влажность</span>
                <strong>{weather.humidity}%</strong>
              </div>
            </div>
          </div>

          <div className={styles.sectionTitle}>Сегодня</div>
          <div className={styles.forecastGrid}>
            {weather.today.map(item => (
              <ForecastCard key={item.time} item={item} />
            ))}
          </div>

          <div className={styles.tomorrow}>
            <div>
              <div className={styles.sectionTitle}>Завтра</div>
              <div className={styles.tomorrowText}>
                от {tomorrowMin}° до {tomorrowMax}°
              </div>
            </div>
            <div className={styles.tomorrowIcons}>
              {weather.tomorrow.map(item => (
                <Image key={item.time} src={WEATHER_ICONS[item.type]} alt="" width={30} height={30} aria-hidden="true" />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          {isLoading ? 'Загружаю погоду...' : 'Введите город, чтобы увидеть прогноз'}
        </div>
      )}
    </div>
  )
}
