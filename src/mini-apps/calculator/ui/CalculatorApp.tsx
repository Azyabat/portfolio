'use client'
import { useState } from 'react'
import styles from './CalculatorApp.module.css'

type Operation = '+' | '-' | '×' | '÷'

function calculate(firstNumber: number, secondNumber: number, operation: Operation) {
  if (operation === '+') return firstNumber + secondNumber
  if (operation === '-') return firstNumber - secondNumber
  if (operation === '×') return firstNumber * secondNumber
  if (operation === '÷') return secondNumber === 0 ? 'Ошибка' : firstNumber / secondNumber

  return secondNumber
}

function formatResult(result: number | string) {
  if (typeof result === 'string') return result

  return Number.isInteger(result) ? String(result) : String(Number(result.toFixed(8)))
}

export const CalculatorApp = () => {
  const [display, setDisplay] = useState('0')
  const [firstNumber, setFirstNumber] = useState<number | null>(null)
  const [operation, setOperation] = useState<Operation | null>(null)
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

  const enterDigit = (digit: string) => {
    if (display === 'Ошибка' || shouldResetDisplay) {
      setDisplay(digit)
      setShouldResetDisplay(false)
      return
    }

    setDisplay(display === '0' ? digit : display + digit)
  }

  const enterDecimal = () => {
    if (display === 'Ошибка' || shouldResetDisplay) {
      setDisplay('0.')
      setShouldResetDisplay(false)
      return
    }

    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const chooseOperation = (nextOperation: Operation) => {
    if (firstNumber !== null && operation !== null && !shouldResetDisplay) {
      const result = calculate(firstNumber, Number(display), operation)
      const formattedResult = formatResult(result)

      setDisplay(formattedResult)
      setFirstNumber(typeof result === 'number' ? result : null)
      setOperation(typeof result === 'number' ? nextOperation : null)
      setShouldResetDisplay(true)
      return
    }

    setFirstNumber(Number(display))
    setOperation(nextOperation)
    setShouldResetDisplay(true)
  }

  const showResult = () => {
    if (firstNumber === null || operation === null) return

    const result = calculate(firstNumber, Number(display), operation)

    setDisplay(formatResult(result))
    setFirstNumber(null)
    setOperation(null)
    setShouldResetDisplay(true)
  }

  const clearCalculator = () => {
    setDisplay('0')
    setFirstNumber(null)
    setOperation(null)
    setShouldResetDisplay(false)
  }

  const removeLastDigit = () => {
    if (display === 'Ошибка' || shouldResetDisplay || display.length === 1) {
      setDisplay('0')
      setShouldResetDisplay(false)
      return
    }

    setDisplay(display.slice(0, -1))
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.displayBlock}>
        <div className={styles.expression}>
          {firstNumber !== null && operation ? `${firstNumber} ${operation}` : 'Калькулятор'}
        </div>
        <div className={styles.display}>{display}</div>
      </div>

      <div className={styles.keyboard}>
        <button className={styles.controlButton} onClick={clearCalculator}>C</button>
        <button className={styles.controlButton} onClick={removeLastDigit}>⌫</button>
        <button className={`${styles.button} ${styles.operationButton}`} onClick={() => chooseOperation('÷')}>÷</button>
        <button className={`${styles.button} ${styles.operationButton}`} onClick={() => chooseOperation('×')}>×</button>

        <button className={styles.button} onClick={() => enterDigit('7')}>7</button>
        <button className={styles.button} onClick={() => enterDigit('8')}>8</button>
        <button className={styles.button} onClick={() => enterDigit('9')}>9</button>
        <button className={`${styles.button} ${styles.operationButton}`} onClick={() => chooseOperation('-')}>−</button>

        <button className={styles.button} onClick={() => enterDigit('4')}>4</button>
        <button className={styles.button} onClick={() => enterDigit('5')}>5</button>
        <button className={styles.button} onClick={() => enterDigit('6')}>6</button>
        <button className={`${styles.button} ${styles.operationButton}`} onClick={() => chooseOperation('+')}>+</button>

        <button className={styles.button} onClick={() => enterDigit('1')}>1</button>
        <button className={styles.button} onClick={() => enterDigit('2')}>2</button>
        <button className={styles.button} onClick={() => enterDigit('3')}>3</button>
        <button className={`${styles.button} ${styles.equalButton}`} onClick={showResult}>=</button>

        <button className={`${styles.button} ${styles.zeroButton}`} onClick={() => enterDigit('0')}>
          0
        </button>
        <button className={styles.button} onClick={enterDecimal}>.</button>
      </div>
    </div>
  )
}
