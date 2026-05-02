'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronRight, Clock } from 'lucide-react'

const navLinks = [
  { href: '/',         label: 'Главная' },
  { href: '/about',    label: 'О клинике' },
  { href: '/doctors',  label: 'Врачи' },
  { href: '/services', label: 'Услуги' },
  { href: '/prices',   label: 'Цены' },
  { href: '/reviews',  label: 'Отзывы' },
  { href: '/contacts', label: 'Контакты' },
]

export default function Navbar() {
  const [open, setOpen]     = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight
      if (total > 0) setScrollProgress((window.scrollY / total) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const openPopup = () => {
    window.dispatchEvent(new CustomEvent('open-inquiry-popup'))
    setOpen(false)
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-gradient-teal z-[60] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-blue-dark shadow-[0_2px_20px_rgba(10,30,80,0.30)]">
        {/* Top info bar */}
        <div className="bg-navy text-white/55 text-xs py-1.5 hidden sm:block border-b border-white/[0.06]">
          <div className="container-wide flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Clock size={11} className="opacity-50" />
              Пн–Сб: 9:00–21:00 &nbsp;|&nbsp; Вс: 10:00–18:00
            </span>
            <a href="tel:+998955030001" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={11} />
              +998 (95) 503-00-01
            </a>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="container-wide flex items-center justify-between h-14 sm:h-16">
          {/* Logo — fixed size, not filling the bar */}
          <Link href="/" className="flex items-center flex-shrink-0 group">
            <Image
              src="/logo.png"
              alt="Viva Dental Group"
              width={160}
              height={44}
              className="h-9 sm:h-11 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Desktop navigation links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200
                    ${pathname === link.href
                      ? 'text-white bg-white/15'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-white/50" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+998955030001"
              className="flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white transition-colors duration-200"
            >
              <Phone size={15} className="text-white/40" />
              <span className="hidden xl:block">+998 (95) 503-00-01</span>
            </a>
            <button onClick={openPopup} className="btn-white text-sm py-2.5 px-5">
              Записаться
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
            aria-label="Меню"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
            open ? 'max-h-[640px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-blue/10 shadow-card-hover">
            <div className="container-wide py-4">
              {/* Phone block */}
              <a
                href="tel:+998955030001"
                className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-blue-pale mb-4 text-ink"
              >
                <div className="w-9 h-9 rounded-full bg-blue flex items-center justify-center flex-shrink-0">
                  <Phone size={15} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate">Позвонить нам</div>
                  <div className="font-bold text-sm">+998 (95) 503-00-01</div>
                </div>
              </a>

              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <li
                    key={link.href}
                    style={{ animationDelay: `${i * 40}ms` }}
                    className={open ? 'animate-fade-up' : ''}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between py-3 px-2 text-base font-semibold
                        border-b border-gray-50 transition-colors hover:text-blue
                        ${pathname === link.href ? 'text-blue' : 'text-ink'}`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight
                        size={16}
                        className={pathname === link.href ? 'text-blue' : 'text-gray-300'}
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <button
                onClick={openPopup}
                className="btn-primary w-full justify-center mt-4 py-3"
              >
                Записаться на приём
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-14 sm:h-[calc(1.75rem+4rem)]" id="navbar-spacer" />
    </>
  )
}
