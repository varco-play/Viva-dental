import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-gray-300">
      <div className="container-wide py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">VD</span>
            </div>
            <span className="font-bold text-xl text-white">Viva <span className="text-primary">Dental</span></span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Профессиональная стоматологическая помощь с заботой о каждом пациенте. Современные технологии и опытные врачи.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-semibold mb-4">Разделы</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/about', label: 'О клинике' },
              { href: '/doctors', label: 'Наши врачи' },
              { href: '/services', label: 'Услуги' },
              { href: '/prices', label: 'Прайс-лист' },
              { href: '/reviews', label: 'Отзывы' },
              { href: '/contacts', label: 'Контакты' },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-primary transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Услуги</h4>
          <ul className="space-y-2 text-sm">
            {['Терапия', 'Ортодонтия', 'Имплантация', 'Протезирование', 'Хирургия', 'Детская стоматология', 'Эстетическая стоматология'].map(s => (
              <li key={s}><Link href="/services" className="hover:text-primary transition-colors">{s}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h4 className="text-white font-semibold mb-4">Контакты</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
              <span>г. Москва, ул. Примерная, д. 1</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-primary shrink-0" />
              <a href="tel:+74951234567" className="hover:text-primary transition-colors">+7 (495) 123-45-67</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-primary shrink-0" />
              <a href="mailto:info@vivadental.ru" className="hover:text-primary transition-colors">info@vivadental.ru</a>
            </li>
            <li className="flex items-start gap-2">
              <Clock size={16} className="text-primary mt-0.5 shrink-0" />
              <span>Пн–Сб: 9:00–21:00<br/>Вс: 10:00–18:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="container-wide py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <span>© 2025 Viva Dental. Все права защищены.</span>
          <span>Лицензия ЛО-77-01-XXXXXXX</span>
        </div>
      </div>
    </footer>
  )
}
