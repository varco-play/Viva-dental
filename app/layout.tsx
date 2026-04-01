import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InquiryPopup from '@/components/InquiryPopup'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Viva Dental — Стоматологическая клиника',
  description: 'Профессиональная стоматологическая помощь. Лечение, протезирование, имплантация, ортодонтия.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <InquiryPopup />
      </body>
    </html>
  )
}
