'use client'
import styles from './Footer.module.css'
import { NAV_LINKS } from '@/shared/config'
import { TelegramIcon } from '@/shared/ui/TelegramIcon'

export const Footer = () => {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.bracket}>{'{}'}</span>
            <div>
              <div className={styles.name}>Азамат Салькаев</div>
              <div className={styles.sub}>Репетитор по программированию и информатике</div>
            </div>
          </div>

          <div className={styles.columns}>
            <div>
              <div className={styles.colTitle}>Навигация</div>
              {NAV_LINKS.slice(0, 3).map(l => (
                <button key={l.href} className={styles.navBtn} onClick={() => scrollTo(l.href)}>
                  {l.label}
                </button>
              ))}
            </div>
            <div>
              <div className={styles.colTitle}>&nbsp;</div>
              {NAV_LINKS.slice(3).map(l => (
                <button key={l.href} className={styles.navBtn} onClick={() => scrollTo(l.href)}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 Азамат Салькаев. Все права защищены.</span>
          <div className={styles.socials}>
            <a
              href="https://t.me/azyabat"
              target="_blank"
              rel="noreferrer"
              className={styles.social}
              aria-label="Telegram @azyabat"
              title="Telegram @azyabat"
            >
              <TelegramIcon className={styles.telegramIcon} />
            </a>
            <a
              href="tel:+79510514667"
              className={styles.social}
              aria-label="Номер телефона +7 951 051 46 67"
              title="+7 951 051 46 67"
            >
              ☎
            </a>
            <a
              href="mailto:azamatsalkaev@gmail.com"
              className={styles.social}
              aria-label="Email azamatsalkaev@gmail.com"
              title="azamatsalkaev@gmail.com"
            >
              @
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
