import type { Metadata } from 'next'
import { CalculatorApp } from '@/mini-apps/calculator/ui/CalculatorApp'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Калькулятор — мини-приложение',
  description: 'Учебное мини-приложение калькулятор для практики HTML, CSS, JavaScript и React.',
}

const CalculatorPage = () => (
  <main className={styles.page}>
    <section className={styles.container}>
      <div className={styles.content}>
        <a href="/#projects" className={styles.backLink}>
          ← Назад к проектам
        </a>

        <div className={styles.badge}>Мини-приложение</div>
        <h1 className={styles.title}>Калькулятор</h1>
        <p className={styles.description}>
          Простое приложение для первых уроков: состояние, обработчики кликов,
          арифметические операции и аккуратная работа с результатом.
        </p>

        <ul className={styles.topics}>
          <li>цифры и десятичная точка</li>
          <li>операции сложения, вычитания, умножения и деления</li>
          <li>очистка, удаление последней цифры и обработка деления на ноль</li>
        </ul>
      </div>

      <div className={styles.app}>
        <CalculatorApp />
      </div>
    </section>
  </main>
)

export default CalculatorPage
