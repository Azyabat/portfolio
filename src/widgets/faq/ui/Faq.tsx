'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { Accordion } from '@/features/accordion/ui/Accordion'
import { fadeUp } from '@/shared/lib/animations'
import styles from './Faq.module.css'

const FAQ = [
  { question: 'Нужен ли опыт программирования?', answer: 'Нет, не нужен. Занятия подходят для полных новичков. Мы начнём с самых основ и постепенно углубим знания.' },
  { question: 'Можно ли заниматься онлайн?', answer: 'Да, все занятия проходят онлайн через удобный для вас сервис: Zoom, Google Meet или Telegram.' },
  { question: 'Сколько длится урок?', answer: 'Стандартное занятие длится 60 минут. Для школьников 10–13 лет возможен формат 45 минут.' },
  { question: 'С какого возраста можно заниматься?', answer: 'Принимаю учеников с 10 лет. Программа адаптируется под возраст и уровень подготовки.' },
]

export function Faq() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionTitle>Частые вопросы</SectionTitle>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <Accordion items={FAQ} />
        </motion.div>
      </div>
    </section>
  )
}
