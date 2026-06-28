import type { Metadata } from 'next'
import { VisitTracker } from '@/features/visit-tracker/ui/VisitTracker'
import { Header } from '@/widgets/header/ui/Header'
import { Footer } from '@/widgets/footer/ui/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Азамат Салькаев — Репетитор по программированию',
  description:
    'Помогаю освоить программирование с нуля, подготовиться к ОГЭ по информатике и создавать собственные проекты. Онлайн-занятия для детей, подростков и взрослых.',
  keywords: 'репетитор программирование, ОГЭ информатика, обучение программированию, онлайн курсы',
  icons: {
    icon: '/favicon.svg',
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="ru" suppressHydrationWarning>
    <body>
      <VisitTracker />
      <Header />
      {children}
      <Footer />
    </body>
  </html>
)

export default RootLayout
