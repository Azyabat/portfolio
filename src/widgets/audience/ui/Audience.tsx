'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { stagger, fadeUp } from '@/shared/lib/animations'
import { AUDIENCE_GROUPS } from './consts'
import styles from './Audience.module.css'

export const Audience = () => {
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
          {AUDIENCE_GROUPS.map(g => (
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
