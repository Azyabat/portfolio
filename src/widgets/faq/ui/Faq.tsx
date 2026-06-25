'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { Accordion } from '@/features/accordion/ui/Accordion'
import { fadeUp } from '@/shared/lib/animations'
import { FAQ_ITEMS } from './consts'
import styles from './Faq.module.css'

export const Faq = () => {
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
          <Accordion items={FAQ_ITEMS} />
        </motion.div>
      </div>
    </section>
  )
}
