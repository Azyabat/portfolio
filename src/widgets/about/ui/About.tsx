'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { fadeUp, stagger, slideLeft, slideRight } from '@/shared/lib/animations'
import styles from './About.module.css'

const FACTS = [
  { icon: '🎓', text: 'Высшее образование по направлению «Информатика и вычислительная техника»' },
  { icon: '💼', text: 'Более 6 лет в коммерческой разработке' },
  { icon: '📚', text: 'Преподавательская практика с 2021 года' },
  { icon: '📈', text: 'Постоянно повышаю квалификацию' },
]

const TECHS = ['HTML', 'CSS', 'JS', 'TS', 'React', 'Git', 'Алгоритмы', 'Python/Базовый']

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
            <div className={styles.avatarBlock}>
              <div className={styles.avatar}>
                <span>👨‍💻</span>
              </div>
              <div>
                <div className={styles.name}>Азамат Салькаев</div>
                <div className={styles.role}>Senior Frontend Developer</div>
              </div>
            </div>

            <p className={styles.bio}>
              Я Senior Frontend Developer и преподаю программирование более 3 лет. Помогаю ученикам
              разных возрастов освоить программирование, подготовиться к ОГЭ и создавать собственные
              проекты.
            </p>

            <motion.ul
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={styles.facts}
            >
              {FACTS.map(f => (
                <motion.li key={f.text} variants={fadeUp} className={styles.fact}>
                  <span className={styles.factIcon}>{f.icon}</span>
                  <span>{f.text}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className={styles.techRow}>
              <span className={styles.techLabel}>Технологии:</span>
              <div className={styles.techs}>
                {TECHS.map(t => (
                  <span key={t} className={styles.tech}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className={styles.right}
          >
            <div className={styles.certsTitle}>Сертификаты и дипломы</div>
            <div className={styles.certs}>
              {['JavaScript Advanced', 'Диплом Бакалавра', 'React Developer'].map(c => (
                <div key={c} className={styles.cert}>
                  <div className={styles.certIcon}>🏆</div>
                  <div className={styles.certName}>{c}</div>
                </div>
              ))}
            </div>
            <p className={styles.certsNote}>
              Подтверждённые знания и регулярное повышение квалификации
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
