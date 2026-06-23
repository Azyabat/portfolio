'use client'
import { motion } from 'framer-motion'
import { scaleIn } from '@/shared/lib/animations'
import { Button } from '@/shared/ui/Button'
import type { PricingPlan } from '../model'
import styles from './PricingCard.module.css'

interface Props {
  plan: PricingPlan
}

export function PricingCard({ plan }: Props) {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`${styles.card} ${plan.highlighted ? styles.highlighted : ''}`}
    >
      {plan.badge && <div className={styles.badge}>{plan.badge}</div>}
      <div className={styles.title}>{plan.title}</div>
      <div className={styles.duration}>{plan.duration}</div>
      <div className={styles.priceRow}>
        <span className={styles.price}>{plan.price}</span>
        {plan.period && <span className={styles.period}>{plan.period}</span>}
      </div>
      <ul className={styles.features}>
        {plan.features.map(f => (
          <li key={f} className={styles.feature}>
            <span className={styles.check}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Button
        variant={plan.highlighted ? 'primary' : 'outline'}
        onClick={scrollToContact}
        style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
      >
        Записаться
      </Button>
    </motion.div>
  )
}
