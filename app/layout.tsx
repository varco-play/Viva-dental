import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InquiryPopup from '@/components/InquiryPopup'
import ChatWidget from '@/components/ChatWidget'

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Viva Dental Group — Стоматологическая клиника в Ташкенте',
  description: 'Профессиональная стоматологическая помощь в Ташкенте. Лечение кариеса, удаление зубов, профессиональная чистка, консультации ортодонта и ортопеда. Запись онлайн.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={nunito.variable}>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <InquiryPopup />
        <ChatWidget />
      </body>
    </html>
  )
}
