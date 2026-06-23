'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { stagger } from '@/shared/lib/animations'
import { PricingCard } from '@/entities/pricing-plan/ui/PricingCard'
import { PRICING_PLANS } from '@/entities/pricing-plan/model'
import styles from './Pricing.module.css'

export function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.container}>
        <SectionTitle>Стоимость занятий</SectionTitle>
        <motion.div
          className={styles.grid}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {PRICING_PLANS.map(p => (
            <PricingCard key={p.id} plan={p} />
          ))}
        </motion.div>
        <p className={styles.note}>Возможно индивидуальное расписание и формат занятий</p>
      </div>
    </section>
  )
}
