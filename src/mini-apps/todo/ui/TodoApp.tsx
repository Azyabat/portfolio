'use client'
import { FormEvent, useState } from 'react'
import styles from './TodoApp.module.css'

type Todo = {
  id: number
  text: string
  isDone: boolean
}

type Filter = 'all' | 'active' | 'done'

const INITIAL_TODOS: Todo[] = [
  { id: 1, text: 'Повторить массивы', isDone: false },
  { id: 2, text: 'Сделать мини-проект', isDone: true },
  { id: 3, text: 'Разобрать обработчики событий', isDone: false },
]

const FILTER_LABELS: Record<Filter, string> = {
  all: 'Все',
  active: 'Активные',
  done: 'Готовые',
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS)
  const [todoText, setTodoText] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const activeCount = todos.filter(todo => !todo.isDone).length
  const completedCount = todos.length - activeCount

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.isDone
    if (filter === 'done') return todo.isDone

    return true
  })

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedText = todoText.trim()

    if (!trimmedText) return

    const newTodo: Todo = {
      id: Date.now(),
      text: trimmedText,
      isDone: false,
    }

    setTodos([newTodo, ...todos])
    setTodoText('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => (
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    )))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.isDone))
  }

  return (
    <div className={styles.todoApp}>
      <div className={styles.header}>
        <div>
          <div className={styles.kicker}>План на сегодня</div>
          <div className={styles.title}>ToDo</div>
        </div>
        <div className={styles.counter}>
          {activeCount}/{todos.length}
        </div>
      </div>

      <form className={styles.form} onSubmit={addTodo}>
        <input
          className={styles.input}
          value={todoText}
          onChange={event => setTodoText(event.target.value)}
          placeholder="Новая задача"
        />
        <button className={styles.addButton} type="submit">+</button>
      </form>

      <div className={styles.filters}>
        {(['all', 'active', 'done'] as Filter[]).map(item => (
          <button
            key={item}
            className={`${styles.filterButton} ${filter === item ? styles.activeFilter : ''}`}
            type="button"
            onClick={() => setFilter(item)}
          >
            {FILTER_LABELS[item]}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {visibleTodos.length > 0 ? (
          visibleTodos.map(todo => (
            <div key={todo.id} className={`${styles.todoItem} ${todo.isDone ? styles.done : ''}`}>
              <button
                className={styles.checkButton}
                type="button"
                onClick={() => toggleTodo(todo.id)}
                aria-label={todo.isDone ? 'Вернуть задачу' : 'Выполнить задачу'}
              >
                {todo.isDone ? '✓' : ''}
              </button>
              <span className={styles.todoText}>{todo.text}</span>
              <button
                className={styles.deleteButton}
                type="button"
                onClick={() => deleteTodo(todo.id)}
              >
                удалить
              </button>
            </div>
          ))
        ) : (
          <div className={styles.empty}>Задач в этом списке пока нет</div>
        )}
      </div>

      <div className={styles.footer}>
        <span>Готово: {completedCount}</span>
        <button className={styles.clearButton} type="button" onClick={clearCompleted}>
          Очистить выполненные
        </button>
      </div>
    </div>
  )
}
