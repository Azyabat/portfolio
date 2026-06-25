'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { stagger, fadeUp } from '@/shared/lib/animations'
import { CURRICULUM_TRACKS } from './consts'
import styles from './Curriculum.module.css'

export const Curriculum = () => {
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
          {CURRICULUM_TRACKS.map(t => (
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
