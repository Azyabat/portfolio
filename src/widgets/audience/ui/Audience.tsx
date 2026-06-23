'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { stagger, fadeUp } from '@/shared/lib/animations'
import styles from './Audience.module.css'

const GROUPS = [
  {
    icon: '🎒',
    title: 'Школьникам 10–14 лет',
    color: '#f5a623',
    items: ['Первые шаги в программировании', 'Создание игр и простых проектов', 'Развитие логического мышления'],
  },
  {
    icon: '💻',
    title: 'Подросткам 14–18 лет',
    color: '#7c5cfc',
    items: ['Подготовка к ОГЭ по информатике', 'Веб-разработка и реальные проекты', 'Углублённое изучение программирования'],
  },
  {
    icon: '💼',
    title: 'Взрослым',
    color: '#00d4ff',
    items: ['Смена профессии', 'Изучение программирования с нуля', 'Помощь в обучении и развитии'],
  },
]

export function Audience() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionTitle>Кому подойдут занятия</SectionTitle>
        <motion.div
          className={styles.grid}
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {GROUPS.map(g => (
            <motion.div
              key={g.title}
              variants={fadeUp}
              className={styles.card}
              style={{ '--color': g.color } as React.CSSProperties}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{g.icon}</span>
              </div>
              <div className={styles.title}>{g.title}</div>
              <ul className={styles.list}>
                {g.items.map(i => (
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
