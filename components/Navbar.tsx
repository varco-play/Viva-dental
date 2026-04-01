'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'О клинике' },
  { href: '/doctors', label: 'Врачи' },
  { href: '/services', label: 'Услуги' },
  { href: '/prices', label: 'Цены' },
  { href: '/reviews', label: 'Отзывы' },
  { href: '/contacts', label: 'Контакты' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openPopup = () => {
    window.dispatchEvent(new CustomEvent('open-inquiry-popup'))
    setOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`}>
      {/* Top bar */}
      <div className="bg-primary text-white text-sm py-2 hidden md:block">
        <div className="container-wide flex justify-between items-center">
          <span>Пн–Сб: 9:00–21:00 &nbsp;|&nbsp; Вс: 10:00–18:00</span>
          <a href="tel:+74951234567" className="flex items-center gap-1 hover:text-gold transition-colors">
            <Phone size={14} />
            +7 (495) 123-45-67
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container-wide flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">VD</span>
          </div>
          <span className="font-bold text-xl text-charcoal">Viva <span className="text-primary">Dental</span></span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? 'text-primary border-b-2 border-primary pb-0.5' : 'text-charcoal'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button onClick={openPopup} className="hidden lg:block btn-primary text-sm py-2 px-4">
          Записаться
        </button>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-charcoal">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <ul className="container-wide py-4 flex flex-col gap-3">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block text-base font-medium py-2 transition-colors hover:text-primary ${
                    pathname === link.href ? 'text-primary' : 'text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button onClick={openPopup} className="btn-primary text-sm py-2 px-4 w-full mt-2">
                Записаться на приём
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
