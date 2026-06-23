'use client'
import { motion } from 'framer-motion'
import { scaleIn } from '@/shared/lib/animations'
import type { Project } from '../model'
import styles from './ProjectCard.module.css'

interface Props {
  project: Project
}

export function ProjectCard({ project }: Props) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
      className={styles.card}
      style={{ '--accent': project.color } as React.CSSProperties}
    >
      <div className={styles.emojiWrap}>
        <span className={styles.emoji}>{project.emoji}</span>
      </div>
      <div className={styles.title}>{project.title}</div>
      <div className={styles.description}>{project.description}</div>
      <div className={styles.tags}>
        {project.tags.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </motion.div>
  )
}
