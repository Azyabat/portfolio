'use client'
import { useEffect, useMemo, useState } from 'react'
import { BOARD_SIZE, KEY_DIRECTIONS, START_DIRECTION, START_SNAKE } from './consts'
import type { Cell, GameStatus } from './types'
import styles from './SnakeApp.module.css'

function areCellsEqual(first: Cell, second: Cell) {
  return first.x === second.x && first.y === second.y
}

function isOppositeDirection(current: Cell, next: Cell) {
  return current.x + next.x === 0 && current.y + next.y === 0
}

function getCellKey(cell: Cell) {
  return `${cell.x}-${cell.y}`
}

function getRandomFood(snake: Cell[]) {
  const freeCells: Cell[] = []

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      const cell = { x, y }

      if (!snake.some(part => areCellsEqual(part, cell))) {
        freeCells.push(cell)
      }
    }
  }

  return freeCells[Math.floor(Math.random() * freeCells.length)]
}

function getDirectionByKey(key: string): Cell | null {
  return KEY_DIRECTIONS[key] ?? null
}

export const SnakeApp = () => {
  const [snake, setSnake] = useState<Cell[]>(START_SNAKE)
  const [food, setFood] = useState(() => getRandomFood(START_SNAKE))
  const [direction, setDirection] = useState<Cell>(START_DIRECTION)
  const [nextDirection, setNextDirection] = useState<Cell>(START_DIRECTION)
  const [status, setStatus] = useState<GameStatus>('ready')
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  const snakeCells = useMemo(() => new Set(snake.map(getCellKey)), [snake])

  const startGame = () => {
    setStatus('playing')
  }

  const resetGame = () => {
    setSnake(START_SNAKE)
    setFood(getRandomFood(START_SNAKE))
    setDirection(START_DIRECTION)
    setNextDirection(START_DIRECTION)
    setScore(0)
    setStatus('ready')
  }

  const changeDirection = (next: Cell) => {
    setNextDirection(current => {
      if (isOppositeDirection(direction, next) || isOppositeDirection(current, next)) {
        return current
      }

      return next
    })

    if (status === 'ready') {
      setStatus('playing')
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const next = getDirectionByKey(event.code)

      if (!next) return

      event.preventDefault()
      changeDirection(next)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [direction, status])

  useEffect(() => {
    if (status !== 'playing') return

    const timerId = window.setInterval(() => {
      setSnake(currentSnake => {
        const currentDirection = nextDirection
        const head = currentSnake[0]
        const nextHead = {
          x: head.x + currentDirection.x,
          y: head.y + currentDirection.y,
        }

        const hitWall =
          nextHead.x < 0 ||
          nextHead.x >= BOARD_SIZE ||
          nextHead.y < 0 ||
          nextHead.y >= BOARD_SIZE

        const willEatFood = areCellsEqual(nextHead, food)
        const bodyForCollision = willEatFood ? currentSnake : currentSnake.slice(0, -1)
        const hitSelf = bodyForCollision.some(part => areCellsEqual(part, nextHead))

        if (hitWall || hitSelf) {
          setStatus('gameOver')
          setBestScore(currentBestScore => Math.max(currentBestScore, score))
          return currentSnake
        }

        const nextSnake = [nextHead, ...currentSnake]

        setDirection(currentDirection)

        if (willEatFood) {
          setScore(currentScore => currentScore + 1)
          setFood(getRandomFood(nextSnake))
          return nextSnake
        }

        nextSnake.pop()
        return nextSnake
      })
    }, 190)

    return () => window.clearInterval(timerId)
  }, [food, nextDirection, score, status])

  const cells = []

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      const cell = { x, y }
      const isHead = areCellsEqual(snake[0], cell)
      const isSnake = snakeCells.has(getCellKey(cell))
      const isFood = areCellsEqual(food, cell)
      const cellContent = isFood ? (
        <span className={styles.apple} aria-hidden="true" />
      ) : isHead ? (
        <span className={styles.snakeHead} aria-hidden="true" />
      ) : isSnake ? (
        <span className={styles.snakeBody} aria-hidden="true" />
      ) : null

      cells.push(
        <div
          key={getCellKey(cell)}
          className={[
            styles.cell,
            isSnake ? styles.snakeCell : '',
            isHead ? styles.headCell : '',
            isFood ? styles.foodCell : '',
          ].join(' ')}
        >
          {cellContent}
        </div>,
      )
    }
  }

  const statusText = {
    ready: 'Нажмите старт или любую стрелку',
    playing: 'Собирайте еду и не врезайтесь',
    paused: 'Пауза',
    gameOver: 'Игра окончена',
  }[status]

  return (
    <div className={styles.game}>
      <div className={styles.header}>
        <div>
          <div className={styles.kicker}>Игра</div>
          <div className={styles.title}>Змейка</div>
        </div>
        <div className={styles.score}>
          <span>Счёт</span>
          <strong>{score}</strong>
        </div>
      </div>

      <div className={styles.board} aria-label="Игровое поле">
        {cells}
      </div>

      <div className={styles.message}>{statusText}</div>

      <div className={styles.actions}>
        {status === 'playing' ? (
          <button className={styles.secondaryButton} type="button" onClick={() => setStatus('paused')}>
            Пауза
          </button>
        ) : (
          <button className={styles.primaryButton} type="button" onClick={status === 'gameOver' ? resetGame : startGame}>
            {status === 'gameOver' ? 'Заново' : 'Старт'}
          </button>
        )}
        <button className={styles.secondaryButton} type="button" onClick={resetGame}>
          Новая игра
        </button>
      </div>

      <div className={styles.controls} aria-label="Управление">
        <button type="button" className={styles.controlButton} onClick={() => changeDirection({ x: 0, y: -1 })}>
          ↑
        </button>
        <div className={styles.controlRow}>
          <button type="button" className={styles.controlButton} onClick={() => changeDirection({ x: -1, y: 0 })}>
            ←
          </button>
          <button type="button" className={styles.controlButton} onClick={() => changeDirection({ x: 0, y: 1 })}>
            ↓
          </button>
          <button type="button" className={styles.controlButton} onClick={() => changeDirection({ x: 1, y: 0 })}>
            →
          </button>
        </div>
      </div>

      <div className={styles.footer}>
        <span>Лучший счёт</span>
        <strong>{Math.max(bestScore, score)}</strong>
      </div>
    </div>
  )
}
