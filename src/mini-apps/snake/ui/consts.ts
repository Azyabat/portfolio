import type { Cell } from './types'

export const BOARD_SIZE = 12

export const START_SNAKE: Cell[] = [
  { x: 5, y: 6 },
  { x: 4, y: 6 },
  { x: 3, y: 6 },
]

export const START_DIRECTION: Cell = { x: 1, y: 0 }

export const KEY_DIRECTIONS: Record<string, Cell> = {
  ArrowUp: { x: 0, y: -1 },
  KeyW: { x: 0, y: -1 },
  ArrowRight: { x: 1, y: 0 },
  KeyD: { x: 1, y: 0 },
  ArrowDown: { x: 0, y: 1 },
  KeyS: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  KeyA: { x: -1, y: 0 },
}
