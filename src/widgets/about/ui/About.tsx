'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { fadeUp, stagger, slideLeft, slideRight } from '@/shared/lib/animations'
import { ABOUT_CREDENTIALS, ABOUT_EXPERTISE, ABOUT_PRINCIPLES, ABOUT_STATS } from './consts'
import styles from './About.module.css'

export const About = () => {
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
              {ABOUT_STATS.map(stat => (
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
              {ABOUT_PRINCIPLES.map((principle, index) => (
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
                {ABOUT_EXPERTISE.map(item => (
                  <span key={item} className={styles.tech}>{item}</span>
                ))}
              </div>
            </div>

            <div className={styles.credentials}>
              {ABOUT_CREDENTIALS.map(item => (
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
