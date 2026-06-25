import type { Metadata } from 'next'
import { GuessNumberApp } from '@/mini-apps/guess-number/ui/GuessNumberApp'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Угадай число — мини-игра',
  description: 'Учебная мини-игра для практики условий, случайных чисел и состояния в React.',
}

const GuessNumberPage = () => (
  <main className={styles.page}>
    <section className={styles.container}>
      <div className={styles.content}>
        <a href="/#projects" className={styles.backLink}>
          ← Назад к проектам
        </a>

        <div className={styles.badge}>Мини-приложение</div>
        <h1 className={styles.title}>Игра «Угадай число»</h1>
        <p className={styles.description}>
          Простая игра для первых занятий: компьютер загадывает число, а ученик пишет
          логику проверки, подсказки и перезапуска.
        </p>

        <ul className={styles.topics}>
          <li>случайное число через Math.random</li>
          <li>условия if/else и сравнение чисел</li>
          <li>состояние формы, попыток и завершения игры</li>
        </ul>
      </div>

      <div className={styles.app}>
        <GuessNumberApp />
      </div>
    </section>
  </main>
)

export default GuessNumberPage
