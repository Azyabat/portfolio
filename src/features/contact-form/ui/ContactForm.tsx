'use client'
import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/shared/ui/Button'
import styles from './ContactForm.module.css'

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

export const ContactForm = () => {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(data.message ?? 'Не удалось отправить заявку')
      }

      setStatus('sent')
      setForm({ name: '', phone: '', message: '' })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Не удалось отправить заявку')
    }
  }

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={styles.success}
      >
        <span className={styles.successIcon}>🎉</span>
        <div className={styles.successTitle}>Сообщение отправлено!</div>
        <div className={styles.successText}>Я свяжусь с вами в течение нескольких часов.</div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <input
          className={styles.input}
          placeholder="Ваше имя"
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          disabled={status === 'sending'}
          required
        />
        <input
          className={styles.input}
          placeholder="Телефон или Telegram"
          value={form.phone}
          onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
          disabled={status === 'sending'}
          required
        />
      </div>
      <textarea
        className={`${styles.input} ${styles.textarea}`}
        placeholder="Сообщение"
        rows={4}
        value={form.message}
        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
        disabled={status === 'sending'}
      />
      {status === 'error' && (
        <div className={styles.error} role="alert">
          {errorMessage}
        </div>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'sending'}
        style={{ width: '100%', justifyContent: 'center' }}
      >
        {status === 'sending' ? 'Отправляю...' : 'Отправить сообщение'}
      </Button>
    </form>
  )
}
