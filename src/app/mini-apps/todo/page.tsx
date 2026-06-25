import type { Metadata } from 'next'
import { TodoApp } from '@/mini-apps/todo/ui/TodoApp'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'ToDo приложение — мини-приложение',
  description: 'Учебное ToDo приложение для практики списков, состояния, фильтрации и событий в React.',
}

const TodoPage = () => (
  <main className={styles.page}>
    <section className={styles.container}>
      <div className={styles.content}>
        <a href="/#projects" className={styles.backLink}>
          ← Назад к проектам
        </a>

        <div className={styles.badge}>Мини-приложение</div>
        <h1 className={styles.title}>ToDo приложение</h1>
        <p className={styles.description}>
          Учебное приложение для работы со списком задач: добавляем элементы,
          меняем статус, фильтруем и удаляем лишнее.
        </p>

        <ul className={styles.topics}>
          <li>массив задач в состоянии компонента</li>
          <li>добавление, удаление и переключение задачи</li>
          <li>фильтры Все, Активные и Готовые</li>
        </ul>
      </div>

      <div className={styles.app}>
        <TodoApp />
      </div>
    </section>
  </main>
)

export default TodoPage
