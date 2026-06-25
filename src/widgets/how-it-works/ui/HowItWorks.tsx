'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { stagger, fadeUp } from '@/shared/lib/animations'
import { HOW_IT_WORKS_STEPS } from './consts'
import styles from './HowItWorks.module.css'

export const HowItWorks = () => {
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
          {HOW_IT_WORKS_STEPS.map((s, i) => (
            <motion.div key={s.n} variants={fadeUp} className={styles.step}>
              <motion.div
                className={styles.circle}
                whileHover={{ scale: 1.1 }}
              >
                {s.n}
              </motion.div>
              {i < HOW_IT_WORKS_STEPS.length - 1 && <div className={styles.line} />}
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
