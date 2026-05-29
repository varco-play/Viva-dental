'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronRight, Clock } from 'lucide-react'

const navLinksLeft = [
  { href: '/',         label: 'Главная' },
  { href: '/about',    label: 'О клинике' },
  { href: '/doctors',  label: 'Врачи' },
  { href: '/services', label: 'Услуги' },
]

const navLinksRight = [
  { href: '/prices',   label: 'Цены' },
  { href: '/contacts', label: 'Контакты' },
]

const allNavLinks = [...navLinksLeft, ...navLinksRight]

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

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200
        ${pathname === href
          ? 'text-blue bg-blue/8'
          : 'text-slate hover:text-blue hover:bg-blue/5'
        }`}
    >
      {label}
      {pathname === href && (
        <span className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-blue/40" />
      )}
    </Link>
  )

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-gradient-teal z-[60] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] border-b border-gray-100">
        {/* Top info bar */}
        <div className="bg-gray-50 text-slate text-xs py-1.5 hidden sm:block border-b border-gray-100">
          <div className="container-wide flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Clock size={11} className="text-blue/50" />
              Пн–Вс: 10:00–19:00 &nbsp;|&nbsp; Последняя запись в 18:00
            </span>
            <a href="tel:+998955030001" className="flex items-center gap-1.5 hover:text-blue transition-colors font-medium">
              <Phone size={11} className="text-blue/60" />
              +998 (95) 503-00-01
            </a>
          </div>
        </div>

        {/* ── Desktop navigation — 3-column centered logo ── */}
        <nav className="container-wide h-14 sm:h-16 hidden lg:grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Left links */}
          <ul className="flex items-center gap-0.5">
            {navLinksLeft.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>

          {/* Center — Logo */}
          <Link href="/" className="flex items-center justify-center mx-6 group">
            <Image
              src="/logo.png"
              alt="Viva Dental Group"
              width={200}
              height={94}
              className="h-10 sm:h-12 w-auto object-contain transition-opacity duration-200 group-hover:opacity-75"
              priority
            />
          </Link>

          {/* Right — links + CTA */}
          <div className="flex items-center justify-end gap-0.5">
            <ul className="flex items-center gap-0.5">
              {navLinksRight.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 ml-4">
              <a
                href="tel:+998955030001"
                className="flex items-center gap-1.5 text-sm font-semibold text-slate hover:text-blue transition-colors duration-200"
              >
                <Phone size={15} className="text-blue/50" />
                <span className="hidden xl:block">+998 (95) 503-00-01</span>
              </a>
              <button onClick={openPopup} className="btn-primary text-sm py-2.5 px-5">
                Записаться
              </button>
            </div>
          </div>
        </nav>

        {/* ── Mobile navigation ── */}
        <div className="lg:hidden flex items-center h-14 sm:h-16 px-4 relative">
          {/* Hamburger — left */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg text-slate hover:bg-gray-100 transition-all duration-200 z-10"
            aria-label="Меню"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo — absolutely centered */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center group">
            <Image
              src="/logo.png"
              alt="Viva Dental Group"
              width={200}
              height={94}
              className="h-9 sm:h-11 w-auto object-contain transition-opacity duration-200 group-hover:opacity-75"
              priority
            />
          </Link>

          {/* Phone — right */}
          <a
            href="tel:+998955030001"
            className="ml-auto z-10 p-2 rounded-lg text-blue hover:bg-blue/5 transition-all duration-200"
            aria-label="Позвонить"
          >
            <Phone size={20} />
          </a>
        </div>

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
                {allNavLinks.map((link, i) => (
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
