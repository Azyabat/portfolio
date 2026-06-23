'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/shared/ui/SectionTitle'
import { ContactForm } from '@/features/contact-form/ui/ContactForm'
import { TelegramIcon } from '@/shared/ui/TelegramIcon'
import { slideLeft, slideRight } from '@/shared/lib/animations'
import styles from './Contact.module.css'

const CONTACTS = [
  { icon: 'telegram', label: 'Telegram', value: '@azyabat', href: 'https://t.me/azyabat', external: true },
  { icon: 'phone', label: 'Номер телефона', value: '+7 951 051 46 67', href: 'tel:+79510514667' },
  { icon: 'email', label: 'Email', value: 'azamatsalkaev@gmail.com', href: 'mailto:azamatsalkaev@gmail.com' },
]

function ContactIcon({ icon }: { icon: string }) {
  if (icon === 'telegram') {
    return <TelegramIcon className={styles.telegramIcon} />
  }

  return <span>{icon === 'phone' ? '☎' : '@'}</span>
}

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
                <a
                  key={c.label}
                  href={c.href}
                  className={styles.contactLink}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noreferrer' : undefined}
                >
                  <span className={styles.contactIcon}>
                    <ContactIcon icon={c.icon} />
                  </span>
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
