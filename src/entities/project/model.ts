export enum ProjectLevel {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
  Custom = 'custom',
}

export const PROJECT_LEVEL_LABELS: Record<ProjectLevel, string> = {
  [ProjectLevel.Beginner]: 'Начальный',
  [ProjectLevel.Intermediate]: 'Средний',
  [ProjectLevel.Advanced]: 'Продвинутый',
  [ProjectLevel.Custom]: 'Индивидуальный',
}

export interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  level: ProjectLevel
  color: string
  href?: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Калькулятор',
    description: 'Собираем понятный интерфейс, учимся обрабатывать клики и считать выражения.',
    image: '/projects/calculator-icon.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    level: ProjectLevel.Beginner,
    color: '#f5a623',
    href: '/mini-apps/calculator',
  },
  {
    id: 2,
    title: 'Игра «Угадай число»',
    description: 'Разбираем условия, случайные числа, подсказки и простую игровую логику.',
    image: '/projects/guess-number-icon.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    level: ProjectLevel.Beginner,
    color: '#00d4ff',
    href: '/mini-apps/guess-number',
  },
  {
    id: 3,
    title: 'ToDo приложение',
    description: 'Делаем список задач с добавлением, удалением, статусами и сохранением данных.',
    image: '/projects/todo-icon.png',
    tags: ['React', 'State', 'LocalStorage'],
    level: ProjectLevel.Intermediate,
    color: '#7c5cfc',
    href: '/mini-apps/todo',
  },
  {
    id: 4,
    title: 'Погодное приложение',
    description: 'Подключаем внешний API, показываем прогноз и обрабатываем загрузку и ошибки.',
    image: '/projects/weather-icon.png',
    tags: ['React', 'API', 'Fetch'],
    level: ProjectLevel.Intermediate,
    color: '#4caf8d',
    href: '/mini-apps/weather',
  },
  {
    id: 5,
    title: 'Игра «Змейка»',
    description: 'Создаём игровое поле, движение, столкновения, счёт и управление с клавиатуры.',
    image: '/projects/snake-icon.png',
    tags: ['JavaScript', 'Canvas', 'Game loop'],
    level: ProjectLevel.Advanced,
    color: '#e91e8c',
  },
  {
    id: 6,
    title: 'Собственный проект',
    description: 'Проходим путь от идеи и прототипа до готового проекта для портфолио.',
    image: '/projects/custom-project-icon.png',
    tags: ['React', 'TypeScript', 'Проектирование'],
    level: ProjectLevel.Custom,
    color: '#ff6b35',
  },
]
