'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/shared/ui/Button'
import styles from './ContactForm.module.css'

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
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
          required
        />
        <input
          className={styles.input}
          placeholder="Телефон или Telegram"
          value={form.phone}
          onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
          required
        />
      </div>
      <textarea
        className={`${styles.input} ${styles.textarea}`}
        placeholder="Сообщение"
        rows={4}
        value={form.message}
        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
      />
      <Button type="submit" variant="primary" size="lg" style={{ width: '100%', justifyContent: 'center' }}>
        Отправить сообщение ✈️
      </Button>
    </form>
  )
}
