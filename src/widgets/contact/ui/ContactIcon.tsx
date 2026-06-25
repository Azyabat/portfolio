import { TelegramIcon } from '@/shared/ui/TelegramIcon'
import styles from './Contact.module.css'

interface ContactIconProps {
  icon: string
}

export const ContactIcon = ({ icon }: ContactIconProps) => {
  if (icon === 'telegram') {
    return <TelegramIcon className={styles.telegramIcon} />
  }

  return <span>{icon === 'phone' ? '☎' : '@'}</span>
}
