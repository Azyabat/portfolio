export const COLORS = {
  bg: '#0a0a0f',
  bgCard: '#111118',
  bgCardHover: '#16161f',
  border: 'rgba(255,255,255,0.07)',
  accent: '#7c5cfc',
  accentLight: '#9d82ff',
  accentGlow: 'rgba(124, 92, 252, 0.3)',
  cyan: '#00d4ff',
  cyanGlow: 'rgba(0, 212, 255, 0.2)',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.6)',
  textMuted: 'rgba(255,255,255,0.35)',
  gradient: 'linear-gradient(135deg, #7c5cfc 0%, #00d4ff 100%)',
} as const

export const NAV_LINKS = [
  { label: 'Обо мне', href: '#about' },
  { label: 'Проекты', href: '#projects' },
  { label: 'Как проходят занятия', href: '#how-it-works' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Стоимость', href: '#pricing' },
  { label: 'Контакты', href: '#contact' },
] as const
