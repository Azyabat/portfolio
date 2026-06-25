'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/shared/ui/Button'
import { NAV_LINKS } from '@/shared/config'
import styles from './Header.module.css'

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoBracket}>{'{}'}</span>
          <div>
            <div className={styles.logoName}>Азамат Салькаев</div>
            <div className={styles.logoSub}>Репетитор по программированию</div>
          </div>
        </div>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              className={styles.navLink}
              onClick={() => scrollTo(link.href)}
            >
              {link.label}
            </button>
          ))}
          <Button variant="primary" size="sm" onClick={() => scrollTo('#contact')}>
            Записаться на урок
          </Button>
        </nav>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Меню"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
        </button>
      </div>
    </motion.header>
  )
}
