import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import Image from 'next/image'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InquiryPopup from '@/components/InquiryPopup'
import ChatWidget from '@/components/ChatWidget'

// Elegant editorial serif for headings — full Cyrillic support
const cormorant = Cormorant_Garamond({
  subsets:  ['latin', 'cyrillic'],
  variable: '--font-cormorant',
  weight:   ['400', '500', '600', '700'],
  style:    ['normal', 'italic'],
  display:  'swap',
})

// Clean professional sans-serif for body text
const inter = Inter({
  subsets:  ['latin', 'cyrillic'],
  variable: '--font-inter',
  display:  'swap',
})

export const metadata: Metadata = {
  title:       'Viva Dental Group — Стоматологическая клиника в Ташкенте',
  description: 'Профессиональная стоматологическая помощь в Ташкенте. Лечение кариеса, удаление зубов, профессиональная чистка, консультации ортодонта и ортопеда. Запись онлайн.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        {/* Global background logo watermark — fixed, all pages */}
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <Image
            src="/logo.png"
            alt=""
            width={600}
            height={283}
            className="w-[80vw] sm:w-[55vw] max-w-[520px] h-auto opacity-[0.055]"
          />
        </div>

        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <InquiryPopup />
        <ChatWidget />
      </body>
    </html>
  )
}
