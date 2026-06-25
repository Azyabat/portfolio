export enum ProjectLevel {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
  Custom = 'custom',
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

export { PROJECT_LEVEL_LABELS, PROJECTS } from './consts'
