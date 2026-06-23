'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { stagger, fadeUp } from '@/shared/lib/animations'
import styles from './HowItWorks.module.css'

const STEPS = [
  { n: 1, title: 'Бесплатное знакомство', desc: 'Определяем уровень и цели обучения' },
  { n: 2, title: 'Индивидуальный план', desc: 'Составляем программу под вас' },
  { n: 3, title: 'Теория', desc: 'Объясняю простым и понятным языком' },
  { n: 4, title: 'Практика', desc: 'Закрепляем знания на каждом уроке' },
  { n: 5, title: 'Домашние задания', desc: 'Для закрепления между занятиями' },
  { n: 6, title: 'Контроль прогресса', desc: 'Отслеживаем успехи и поддерживаем' },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <SectionTitle>Как проходят занятия</SectionTitle>
        <motion.div
          className={styles.steps}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {STEPS.map((s, i) => (
            <motion.div key={s.n} variants={fadeUp} className={styles.step}>
              <motion.div
                className={styles.circle}
                whileHover={{ scale: 1.1 }}
              >
                {s.n}
              </motion.div>
              {i < STEPS.length - 1 && <div className={styles.line} />}
              <div className={styles.label}>
                <div className={styles.stepTitle}>{s.title}</div>
                <div className={styles.stepDesc}>{s.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
