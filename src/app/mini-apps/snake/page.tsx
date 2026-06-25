import type { Metadata } from 'next'
import { SnakeApp } from '@/mini-apps/snake/ui/SnakeApp'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Змейка — мини-игра',
  description: 'Учебная мини-игра для практики состояния, таймеров, управления и столкновений в React.',
}

export default function SnakePage() {
  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.content}>
          <a href="/#projects" className={styles.backLink}>
            ← Назад к проектам
          </a>

          <div className={styles.badge}>Мини-приложение</div>
          <h1 className={styles.title}>Игра «Змейка»</h1>
          <p className={styles.description}>
            Классическая мини-игра для изучения игрового цикла: двигаем персонажа по сетке,
            собираем еду, увеличиваем счёт и обрабатываем столкновения.
          </p>

          <ul className={styles.topics}>
            <li>движение по координатам x/y</li>
            <li>таймер через setInterval и useEffect</li>
            <li>проверка столкновений со стенами и собой</li>
            <li>управление клавиатурой и кнопками</li>
          </ul>
        </div>

        <div className={styles.app}>
          <SnakeApp />
        </div>
      </section>
    </main>
  )
}
