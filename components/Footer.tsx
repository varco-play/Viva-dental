import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, ArrowRight, Instagram, Send } from 'lucide-react'

const navLinks = [
  { href: '/about',    label: 'О клинике' },
  { href: '/doctors',  label: 'Наши врачи' },
  { href: '/services', label: 'Услуги' },
  { href: '/prices',   label: 'Прайс-лист' },
  { href: '/reviews',  label: 'Отзывы' },
  { href: '/contacts', label: 'Контакты' },
]

const serviceLinks = [
  'Лечение кариеса',
  'Пульпа девитализация',
  'Удаление зубов',
  'Профессиональная чистка',
  'Реэндо',
  'Консультации',
]

export default function Footer() {
  return (
    <footer className="bg-surface text-ink relative overflow-hidden border-t border-blue-pale">
      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-teal" />

      <div className="container-wide py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo.jpg"
                alt="Viva Dental Group"
                width={180}
                height={52}
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate mb-5">
              Профессиональная стоматологическая помощь с заботой о каждом пациенте. Современные технологии, опытные врачи.
            </p>
            {/* Social icons */}
            <div className="flex gap-2.5">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white border border-blue-pale flex items-center justify-center text-slate hover:text-blue hover:border-blue transition-all duration-200 shadow-sm"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="Telegram"
                className="w-9 h-9 rounded-xl bg-white border border-blue-pale flex items-center justify-center text-slate hover:text-blue hover:border-blue transition-all duration-200 shadow-sm"
              >
                <Send size={15} />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-xl bg-white border border-blue-pale flex items-center justify-center text-slate hover:text-blue hover:border-blue transition-all duration-200 shadow-sm"
              >
                <span className="text-xs font-bold">WA</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-ink font-bold mb-5 text-sm uppercase tracking-wider">Навигация</h4>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-1.5 text-sm text-slate hover:text-blue transition-colors duration-200"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-blue"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-ink font-bold mb-5 text-sm uppercase tracking-wider">Услуги</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="group flex items-center gap-1.5 text-sm text-slate hover:text-blue transition-colors duration-200"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-blue"
                    />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-ink font-bold mb-5 text-sm uppercase tracking-wider">Контакты</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-pale flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-blue" />
                </div>
                <span className="text-sm text-slate leading-relaxed">г. Ташкент, ул. Амира Темура, д. 1</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-pale flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-blue" />
                </div>
                <a href="tel:+998955030001" className="text-sm text-slate hover:text-blue transition-colors">
                  +998 (95) 503-00-01
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-pale flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-blue" />
                </div>
                <a href="mailto:info@vivadental.uz" className="text-sm text-slate hover:text-blue transition-colors">
                  info@vivadental.uz
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-pale flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={14} className="text-blue" />
                </div>
                <div className="text-sm text-slate">
                  <div>Пн–Сб: 9:00–21:00</div>
                  <div>Вс: 10:00–18:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blue-pale">
        <div className="container-wide py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate">
          <span>© 2025 Viva Dental Group. Все права защищены.</span>
          <span>Лицензия МЗ РУз № XXXXXXXX</span>
        </div>
      </div>
    </footer>
  )
}
