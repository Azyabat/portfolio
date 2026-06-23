'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { stagger } from '@/shared/lib/animations'
import { ProjectCard } from '@/entities/project/ui/ProjectCard'
import { PROJECTS } from '@/entities/project/model'
import styles from './Projects.module.css'

export function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <SectionTitle>Проекты, которые мы будем делать</SectionTitle>
        <motion.div
          className={styles.grid}
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {PROJECTS.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
