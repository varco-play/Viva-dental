'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronRight } from 'lucide-react'

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
  const [scrollProgress, setScrollProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      const total = document.body.scrollHeight - window.innerHeight
      if (total > 0) setScrollProgress((window.scrollY / total) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  const openPopup = () => {
    window.dispatchEvent(new CustomEvent('open-inquiry-popup'))
    setOpen(false)
  }

  return (
    <>
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-gradient-teal z-[60] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_30px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        }`}
      >
        {/* Top info bar */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
          }`}
        >
          <div className="bg-navy text-white/80 text-xs py-2">
            <div className="container-wide flex justify-between items-center">
              <span className="hidden sm:block">Пн–Сб: 9:00–21:00 &nbsp;|&nbsp; Вс: 10:00–18:00</span>
              <a
                href="tel:+74951234567"
                className="flex items-center gap-1.5 hover:text-teal transition-colors ml-auto"
              >
                <Phone size={12} />
                <span>+7 (495) 123-45-67</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <nav className="container-wide flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-xl bg-gradient-teal rotate-6 group-hover:rotate-12 transition-transform duration-300" />
              <div className="relative w-full h-full rounded-xl bg-navy flex items-center justify-center">
                <span className="text-white font-black text-sm tracking-tight">VD</span>
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-black text-lg transition-colors duration-300 ${scrolled ? 'text-navy' : 'text-white'}`}>
                Viva <span className="text-gradient">Dental</span>
              </span>
              <span className={`text-[10px] font-medium tracking-widest uppercase transition-colors duration-300 ${scrolled ? 'text-muted' : 'text-white/60'}`}>
                Group
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group
                    ${pathname === link.href
                      ? 'text-teal'
                      : scrolled
                        ? 'text-charcoal hover:text-teal hover:bg-surface'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-teal" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+74951234567"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-charcoal hover:text-teal' : 'text-white/80 hover:text-white'
              }`}
            >
              <Phone size={14} />
              <span className="hidden xl:block">+7 (495) 123-45-67</span>
            </a>
            <button
              onClick={openPopup}
              className="btn-primary text-sm py-2.5 px-5"
            >
              Записаться
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
              scrolled ? 'text-charcoal hover:bg-surface' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Меню"
          >
            <span className={`block transition-all duration-300 ${open ? 'rotate-90 opacity-0 absolute' : 'rotate-0 opacity-100'}`}>
              <Menu size={24} />
            </span>
            <span className={`block transition-all duration-300 ${open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0 absolute'}`}>
              <X size={24} />
            </span>
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-out overflow-hidden ${
            open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-gray-100 shadow-xl">
            <div className="container-wide py-4">
              {/* Phone */}
              <a
                href="tel:+74951234567"
                className="flex items-center gap-3 py-3 px-4 rounded-xl bg-surface mb-3 text-charcoal"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-teal flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted">Позвонить нам</div>
                  <div className="font-semibold text-sm">+7 (495) 123-45-67</div>
                </div>
              </a>

              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <li
                    key={link.href}
                    style={{ animationDelay: `${i * 50}ms` }}
                    className={open ? 'animate-fade-up' : ''}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between py-3 px-2 text-base font-medium border-b border-gray-50 transition-colors hover:text-teal ${
                        pathname === link.href ? 'text-teal' : 'text-charcoal'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={16} className={`transition-colors ${pathname === link.href ? 'text-teal' : 'text-gray-300'}`} />
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

      {/* Spacer for non-hero pages */}
      <div className="h-[calc(2.5rem+4rem)] lg:h-[calc(2.5rem+4rem)]" id="navbar-spacer" />
    </>
  )
}
