'use client'
import { motion } from 'framer-motion'
import { scaleIn } from '@/shared/lib/animations'
import type { Review } from '../model'
import styles from './ReviewCard.module.css'

interface Props {
  review: Review
}

export function ReviewCard({ review }: Props) {
  return (
    <motion.div
      variants={scaleIn}
      className={styles.card}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className={styles.header}>
        <span className={styles.avatar}>{review.avatar}</span>
        <div>
          <div className={styles.name}>{review.name}</div>
          {review.age && <div className={styles.age}>{review.age}</div>}
        </div>
      </div>
      <div className={styles.stars}>
        {'★'.repeat(review.rating)}
        {'☆'.repeat(5 - review.rating)}
      </div>
      <p className={styles.text}>{review.text}</p>
    </motion.div>
  )
}
