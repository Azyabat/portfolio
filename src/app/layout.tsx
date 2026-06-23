import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/widgets/header/ui/Header'
import { Footer } from '@/widgets/footer/ui/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Азамат Салькаев — Репетитор по программированию',
  description:
    'Помогаю освоить программирование с нуля, подготовиться к ОГЭ по информатике и создавать собственные проекты. Онлайн-занятия для детей, подростков и взрослых.',
  keywords: 'репетитор программирование, ОГЭ информатика, обучение программированию, онлайн курсы',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
