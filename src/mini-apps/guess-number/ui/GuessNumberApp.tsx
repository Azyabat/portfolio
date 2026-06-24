'use client'
import { FormEvent, useState } from 'react'
import styles from './GuessNumberApp.module.css'

const MIN_NUMBER = 1
const MAX_NUMBER = 100

function getRandomNumber() {
  return Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER
}

export function GuessNumberApp() {
  const [secretNumber, setSecretNumber] = useState(getRandomNumber)
  const [userAnswer, setUserAnswer] = useState('')
  const [message, setMessage] = useState('Я загадал число от 1 до 100')
  const [attempts, setAttempts] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  const checkAnswer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const number = Number(userAnswer)

    if (!userAnswer) {
      setMessage('Введите число')
      return
    }

    if (number < MIN_NUMBER || number > MAX_NUMBER) {
      setMessage('Число должно быть от 1 до 100')
      return
    }

    const nextAttempts = attempts + 1
    setAttempts(nextAttempts)

    if (number === secretNumber) {
      setMessage(`Верно! Вы угадали за ${nextAttempts} попыток`)
      setIsGameOver(true)
      return
    }

    if (number < secretNumber) {
      setMessage('Моё число больше')
    } else {
      setMessage('Моё число меньше')
    }

    setUserAnswer('')
  }

  const startNewGame = () => {
    setSecretNumber(getRandomNumber())
    setUserAnswer('')
    setMessage('Я загадал новое число от 1 до 100')
    setAttempts(0)
    setIsGameOver(false)
  }

  return (
    <div className={styles.game}>
      <div className={styles.header}>
        <div className={styles.kicker}>Игра</div>
        <div className={styles.title}>Угадай число</div>
      </div>

      <div className={styles.message}>{message}</div>

      <form className={styles.form} onSubmit={checkAnswer} noValidate>
        <input
          className={styles.input}
          type="number"
          min={MIN_NUMBER}
          max={MAX_NUMBER}
          value={userAnswer}
          onChange={event => setUserAnswer(event.target.value)}
          placeholder="Ваш вариант"
          disabled={isGameOver}
        />

        <button className={styles.primaryButton} type="submit" disabled={isGameOver}>
          Проверить
        </button>
      </form>

      <div className={styles.footer}>
        <div className={styles.stat}>
          <span>Попытки</span>
          <strong>{attempts}</strong>
        </div>
        <button className={styles.secondaryButton} type="button" onClick={startNewGame}>
          Новая игра
        </button>
      </div>
    </div>
  )
}
