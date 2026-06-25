'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { stagger } from '@/shared/lib/animations'
import { ReviewCard } from '@/entities/review/ui/ReviewCard'
import { REVIEWS } from '@/entities/review/consts'
import styles from './Reviews.module.css'

export const Reviews = () => {
  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.container}>
        <SectionTitle>Отзывы</SectionTitle>
        <motion.div
          className={styles.grid}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {REVIEWS.map(r => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
