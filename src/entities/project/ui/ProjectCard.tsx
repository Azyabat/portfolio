'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { scaleIn } from '@/shared/lib/animations'
import { PROJECT_LEVEL_LABELS, type Project } from '../model'
import styles from './ProjectCard.module.css'

interface Props {
  project: Project
}

export function ProjectCard({ project }: Props) {
  const content = (
    <>
      <div className={styles.top}>
        <div className={styles.imageWrap}>
          <Image
            src={project.image}
            alt=""
            width={96}
            height={96}
            className={styles.image}
            aria-hidden="true"
          />
        </div>
        <div className={styles.level}>{PROJECT_LEVEL_LABELS[project.level]}</div>
      </div>

      <div>
        <div className={styles.title}>{project.title}</div>
        <div className={styles.description}>{project.description}</div>
      </div>

      <div className={styles.tags}>
        {project.tags.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </>
  )

  if (project.href) {
    return (
      <motion.a
        href={project.href}
        variants={scaleIn}
        whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
        className={styles.card}
        style={{ '--accent': project.color } as React.CSSProperties}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
      className={styles.card}
      style={{ '--accent': project.color } as React.CSSProperties}
    >
      {content}
    </motion.div>
  )
}
