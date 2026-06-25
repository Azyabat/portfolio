import Image from 'next/image'
import { WEATHER_ICONS } from '../model/consts'
import type { ForecastItem } from '../model/weatherApi'
import styles from './WeatherApp.module.css'

interface ForecastCardProps {
  item: ForecastItem
}

export const ForecastCard = ({ item }: ForecastCardProps) => (
  <div className={styles.forecastCard}>
    <span className={styles.forecastTime}>{item.time}</span>
    <Image src={WEATHER_ICONS[item.type]} alt="" width={34} height={34} aria-hidden="true" />
    <strong>{item.temperature}°</strong>
  </div>
)
