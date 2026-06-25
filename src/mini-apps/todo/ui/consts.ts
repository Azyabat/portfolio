import type { Filter, Todo } from './types'

export const INITIAL_TODOS: Todo[] = [
  { id: 1, text: 'Повторить массивы', isDone: false },
  { id: 2, text: 'Сделать мини-проект', isDone: true },
  { id: 3, text: 'Разобрать обработчики событий', isDone: false },
]

export const FILTERS: Filter[] = ['all', 'active', 'done']

export const FILTER_LABELS: Record<Filter, string> = {
  all: 'Все',
  active: 'Активные',
  done: 'Готовые',
}
