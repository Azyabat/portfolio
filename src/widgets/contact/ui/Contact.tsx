'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { ContactForm } from '@/features/contact-form/ui/ContactForm'
import { slideLeft, slideRight } from '@/shared/lib/animations'
import styles from './Contact.module.css'

const CONTACTS = [
  { icon: '✈️', label: 'Telegram', value: '@azamat_dev', href: 'https://t.me/azamat_dev' },
  { icon: '📱', label: 'WhatsApp', value: '+7 777 123-45-67', href: 'https://wa.me/77771234567' },
  { icon: '📧', label: 'Email', value: 'azamat.dev@mail.ru', href: 'mailto:azamat.dev@mail.ru' },
]

export function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <SectionTitle style={{ marginBottom: 24 }}>Связаться со мной</SectionTitle>
            <div className={styles.contactLinks}>
              {CONTACTS.map(c => (
                <a key={c.label} href={c.href} className={styles.contactLink} target="_blank" rel="noreferrer">
                  <span className={styles.contactIcon}>{c.icon}</span>
                  <div>
                    <div className={styles.contactLabel}>{c.label}</div>
                    <div className={styles.contactValue}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className={styles.formBlock}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
