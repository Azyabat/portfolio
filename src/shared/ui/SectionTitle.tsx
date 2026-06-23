'use client'
import { motion } from 'framer-motion'
import { fadeUp } from '@/shared/lib/animations'
import styles from './SectionTitle.module.css'

interface Props {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function SectionTitle({ children, className, style }: Props) {
  return (
    <motion.h2
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`${styles.title} ${className ?? ''}`}
      style={style}
    >
      {children}
    </motion.h2>
  )
}
