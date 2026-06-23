export interface Project {
  id: number
  title: string
  description: string
  emoji: string
  tags: string[]
  color: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Калькулятор',
    description: 'Изучаем HTML, CSS и JavaScript',
    emoji: '🧮',
    tags: ['HTML', 'CSS', 'JS'],
    color: '#f5a623',
  },
  {
    id: 2,
    title: 'ToDo приложение',
    description: 'Работа с данными и интерфейсом',
    emoji: '✅',
    tags: ['React', 'State'],
    color: '#7c5cfc',
  },
  {
    id: 3,
    title: 'Игра «Угадай число»',
    description: 'Логика и условия в действии',
    emoji: '🎮',
    tags: ['JS', 'Logic'],
    color: '#00d4ff',
  },
  {
    id: 4,
    title: 'Погодное приложение',
    description: 'Работа с API и внешними данными',
    emoji: '🌤️',
    tags: ['API', 'Fetch'],
    color: '#4caf8d',
  },
  {
    id: 5,
    title: 'Интернет-магазин',
    description: 'Практика React и компонентов',
    emoji: '🛒',
    tags: ['React', 'TypeScript'],
    color: '#e91e8c',
  },
  {
    id: 6,
    title: 'Собственный проект',
    description: 'От идеи до уникального проекта',
    emoji: '🚀',
    tags: ['Fullstack', 'Идея'],
    color: '#ff6b35',
  },
]
