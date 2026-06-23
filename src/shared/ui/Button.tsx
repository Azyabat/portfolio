'use client'
import { motion, HTMLMotionProps } from 'framer-motion'
import styles from './Button.module.css'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className ?? ''}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
