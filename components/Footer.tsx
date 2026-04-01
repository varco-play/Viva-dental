import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'

const navLinks = [
  { href: '/about', label: 'О клинике' },
  { href: '/doctors', label: 'Наши врачи' },
  { href: '/services', label: 'Услуги' },
  { href: '/prices', label: 'Прайс-лист' },
  { href: '/reviews', label: 'Отзывы' },
  { href: '/contacts', label: 'Контакты' },
]

const serviceLinks = [
  'Терапия', 'Ортодонтия', 'Имплантация',
  'Протезирование', 'Хирургия', 'Детская стоматология',
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="h-0.5 w-full bg-gradient-teal" />

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{ background: 'rgba(45,198,83,0.04)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div className="container-wide py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-xl bg-gradient-teal rotate-6" />
                <div className="relative w-full h-full rounded-xl bg-navy-dark flex items-center justify-center border border-white/10">
                  <span className="text-white font-black text-sm">VD</span>
                </div>
              </div>
              <div>
                <span className="font-black text-lg text-white">Viva <span className="text-gradient">Dental</span></span>
                <div className="text-[10px] text-white/40 font-medium tracking-widest uppercase">Group</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50 mb-5">
              Профессиональная стоматологическая помощь с заботой о каждом пациенте. Современные технологии, опытные врачи.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {['ВК', 'TG', 'WA'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-teal/20 hover:text-teal flex items-center justify-center text-xs font-bold transition-all duration-200 border border-white/10 hover:border-teal/40"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Навигация</h4>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-1.5 text-sm hover:text-teal transition-colors duration-200"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-teal" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Услуги</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="group flex items-center gap-1.5 text-sm hover:text-teal transition-colors duration-200"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-teal" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-teal" />
                </div>
                <span className="text-sm">г. Москва, ул. Примерная, д. 1</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-teal" />
                </div>
                <a href="tel:+74951234567" className="text-sm hover:text-teal transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-teal" />
                </div>
                <a href="mailto:info@vivadental.ru" className="text-sm hover:text-teal transition-colors">
                  info@vivadental.ru
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={14} className="text-teal" />
                </div>
                <div className="text-sm">
                  <div>Пн–Сб: 9:00–21:00</div>
                  <div>Вс: 10:00–18:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 relative z-10">
        <div className="container-wide py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <span>© 2025 Viva Dental Group. Все права защищены.</span>
          <span>Лицензия ЛО-77-01-XXXXXXX</span>
        </div>
      </div>
    </footer>
  )
}
