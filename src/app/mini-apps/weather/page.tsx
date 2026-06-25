import type { Metadata } from 'next'
import { WeatherApp } from '@/mini-apps/weather/ui/WeatherApp'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Погодное приложение — мини-приложение',
  description: 'Учебное погодное приложение с поиском города, текущей погодой и прогнозом на завтра.',
}

export default function WeatherPage() {
  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.content}>
          <a href="/#projects" className={styles.backLink}>
            ← Назад к проектам
          </a>

          <div className={styles.badge}>Мини-приложение</div>
          <h1 className={styles.title}>Погодное приложение</h1>
          <p className={styles.description}>
            Учебный экран погоды: ищем город, показываем текущие данные,
            прогноз на сегодня и отдельный блок на завтра.
          </p>

          <ul className={styles.topics}>
            <li>поиск по названию города</li>
            <li>отображение разных состояний погоды через SVG</li>
            <li>разделение данных на текущую погоду, сегодня и завтра</li>
          </ul>
        </div>

        <div className={styles.app}>
          <WeatherApp />
        </div>
      </section>
    </main>
  )
}
