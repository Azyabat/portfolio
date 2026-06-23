'use client'
import { motion } from 'framer-motion'
import { Button } from '@/shared/ui/Button'
import { fadeUp, stagger, fadeIn } from '@/shared/lib/animations'
import styles from './Hero.module.css'

const BADGES = [
  { icon: '👤', text: 'Индивидуальный подход' },
  { icon: '💡', text: 'Понятно и доступно' },
  { icon: '⚡', text: 'Первые результаты уже через 4 занятия' },
]

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className={styles.hero}>
      {/* Animated background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Floating code snippets */}
      <motion.div
        className={`${styles.codeSnippet} ${styles.codeTop}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <pre>{`function solve(problem) {
  let skill = 'practice';
  while(!done) {
    practice();
    improve();
  }
  return 'success';
}`}</pre>
      </motion.div>

      <motion.div
        className={`${styles.codeSnippet} ${styles.codeBottom}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <pre>{`const result = await
  learn(programming);`}</pre>
      </motion.div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={stagger(0.12)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className={styles.onlineBadge}>
            🟢 ОНЛАЙН-ЗАНЯТИЯ
          </motion.div>

          <motion.h1 variants={fadeUp} className={styles.heading}>
            Репетитор по программированию
            и информатике{' '}
            <span className={styles.accent}>
              для детей, подростков и взрослых
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className={styles.sub}>
            Помогаю освоить программирование с нуля, подготовиться к ОГЭ по
            информатике и создавать собственные проекты.
          </motion.p>

          <motion.div variants={fadeUp} className={styles.buttons}>
            <Button variant="primary" size="lg" onClick={() => scrollTo('contact')}>
              Записаться на пробный урок
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollTo('contact')}>
              Связаться со мной ✈️
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.badges}>
            {BADGES.map(b => (
              <div key={b.text} className={styles.badge}>
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.visual}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <div className={styles.avatarWrap}>
            <div className={styles.avatarGlow} />
            <div className={styles.avatarPlaceholder}>
              <span className={styles.avatarEmoji}>👨‍💻</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
