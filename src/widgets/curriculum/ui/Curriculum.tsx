'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { stagger, fadeUp } from '@/shared/lib/animations'
import styles from './Curriculum.module.css'

const TRACKS = [
  {
    icon: '</>',
    title: 'Веб-разработка',
    color: '#00d4ff',
    items: ['HTML, CSS', 'JavaScript, TypeScript', 'React', 'Современные технологии'],
  },
  {
    icon: '📦',
    title: 'Основы программирования',
    color: '#7c5cfc',
    items: ['Переменные и типы данных', 'Циклы и условия', 'Функции и массивы', 'Алгоритмы и структуры данных'],
  },
  {
    icon: '📝',
    title: 'Подготовка к ОГЭ',
    color: '#f5a623',
    items: ['Разбор всех типов заданий', 'Решение задач', 'Пробные экзамены', 'Индивидуальный план'],
  },
  {
    icon: '⭐',
    title: 'Работа над проектами',
    color: '#4caf8d',
    items: ['Реальные проекты', 'От идеи до результата', 'Портфолио для будущего'],
  },
]

export function Curriculum() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionTitle>Чему мы научимся</SectionTitle>
        <motion.div
          className={styles.grid}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {TRACKS.map(t => (
            <motion.div
              key={t.title}
              variants={fadeUp}
              className={styles.card}
              style={{ '--color': t.color } as React.CSSProperties}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{t.icon}</span>
              </div>
              <div className={styles.title}>{t.title}</div>
              <ul className={styles.list}>
                {t.items.map(i => (
                  <li key={i} className={styles.item}>{i}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
