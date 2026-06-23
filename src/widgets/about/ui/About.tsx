'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { fadeUp, stagger, slideLeft, slideRight } from '@/shared/lib/animations'
import styles from './About.module.css'

const STATS = [
  { value: '6+', label: 'лет в коммерческой разработке' },
  { value: '3+', label: 'года преподавательской практики' },
  { value: '2021', label: 'веду занятия по программированию' },
]

const PRINCIPLES = [
  {
    title: 'Объясняю через практику',
    text: 'Каждая тема закрепляется задачами, мини-проектами и понятными примерами из разработки.',
  },
  {
    title: 'Держу фокус на цели',
    text: 'Для ОГЭ, старта в вебе или учебных проектов собираю маршрут под уровень ученика.',
  },
  {
    title: 'Учу думать как разработчик',
    text: 'Разбираем не только синтаксис, но и логику, отладку, аккуратность и самостоятельность.',
  },
]

const EXPERTISE = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Git', 'Алгоритмы', 'Python']

const CREDENTIALS = [
  'Высшее образование: информатика и вычислительная техника',
  'Senior Frontend Developer',
  'Регулярное повышение квалификации',
]

export function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <SectionTitle>Обо мне</SectionTitle>

        <div className={styles.grid}>
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className={styles.left}
          >
            <div className={styles.intro}>
              <div className={styles.avatarBlock}>
                <div className={styles.avatar}>
                  <span>АС</span>
                </div>
                <div>
                  <div className={styles.kicker}>Преподаватель и практикующий разработчик</div>
                  <div className={styles.name}>Азамат Салькаев</div>
                  <div className={styles.role}>Senior Frontend Developer</div>
                </div>
              </div>

              <p className={styles.lead}>
                Помогаю разобраться в программировании спокойно и по шагам: от первых строк кода
                до уверенных проектов, подготовки к ОГЭ и понимания, как устроена настоящая
                разработка.
              </p>

              <p className={styles.bio}>
                На занятиях соединяю инженерный опыт и понятную подачу. Мы не заучиваем команды
                ради галочки, а разбираем, почему решение работает, как искать ошибки и как довести
                идею до результата.
              </p>
            </div>

            <motion.ul
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={styles.stats}
            >
              {STATS.map(stat => (
                <motion.li key={stat.label} variants={fadeUp} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className={styles.right}
          >
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>Как проходят занятия</div>
              <div className={styles.panelBadge}>онлайн</div>
            </div>

            <motion.div
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={styles.principles}
            >
              {PRINCIPLES.map((principle, index) => (
                <motion.div key={principle.title} variants={fadeUp} className={styles.principle}>
                  <div className={styles.step}>0{index + 1}</div>
                  <div>
                    <div className={styles.principleTitle}>{principle.title}</div>
                    <p className={styles.principleText}>{principle.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className={styles.expertiseBlock}>
              <div className={styles.smallTitle}>Технологии и темы</div>
              <div className={styles.techs}>
                {EXPERTISE.map(item => (
                  <span key={item} className={styles.tech}>{item}</span>
                ))}
              </div>
            </div>

            <div className={styles.credentials}>
              {CREDENTIALS.map(item => (
                <div key={item} className={styles.credential}>
                  <span className={styles.check}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
