'use client'
import { useEffect, useRef } from 'react'
import { Phone, MapPin, Clock, MessageCircle, ArrowRight, Send, Instagram } from 'lucide-react'
import PopupButton from '@/components/PopupButton'

const contactCards = [
  {
    icon: Phone,
    title: 'Телефон',
    value: '+998 (95) 503-00-01',
    sub: '+998 (99) 394-00-08',
    href: 'tel:+998955030001',
    color: 'bg-blue',
    external: false,
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp / Telegram',
    value: '+998 (95) 503-00-01',
    sub: 'Пишите в любое время',
    href: 'https://wa.me/998955030001',
    color: 'bg-green-brand',
    external: true,
  },
  {
    icon: Instagram,
    title: 'Instagram / Telegram',
    value: '@VIVA_DENTAL_GROUP',
    sub: '@Viva3D — 3D КТ-диагностика',
    href: 'https://instagram.com/VIVA_DENTAL_GROUP_Huvaydo',
    color: 'bg-navy',
    external: true,
  },
]

const hours = [
  { day: 'Понедельник – Воскресенье', time: '10:00 – 19:00' },
  { day: 'Последняя запись', time: '18:00' },
  { day: '3D КТ (MORITA X800)', time: '09:00 – 22:00' },
]

export default function ContactsPage() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    el.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(e => obs.observe(e))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative py-14 overflow-hidden bg-gradient-to-b from-blue-pale to-white border-b border-blue/[0.07]">
        <div className="container-wide relative z-10 text-center">
          <div className="tag justify-center animate-fade-up"><span className="tag-dot" />Контакты</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink mt-2 mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Свяжитесь<br /><span className="text-gradient">с нами</span>
          </h1>
          <p className="text-slate text-lg max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Мы всегда на связи. Запишитесь онлайн, позвоните или напишите — ответим быстро.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="section-sm bg-surface">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6">
            {contactCards.map((card, i) => {
              const Icon = card.icon
              return (
                <a
                  key={card.title}
                  href={card.href}
                  target={card.external ? '_blank' : undefined}
                  rel={card.external ? 'noopener noreferrer' : undefined}
                  className="reveal group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex items-start gap-4"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-1">{card.title}</div>
                    <div className="font-bold text-charcoal group-hover:text-blue transition-colors">{card.value}</div>
                    <div className="text-xs text-muted mt-0.5">{card.sub}</div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Map + info */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map placeholder */}
            <div className="reveal-left">
              <div className="rounded-3xl overflow-hidden h-80 lg:h-full min-h-[320px] bg-surface border border-gray-100 shadow-card flex items-center justify-center relative">
                <div className="absolute inset-0 bg-dots" />
                <div className="relative text-center text-muted">
                  <MapPin size={48} className="mx-auto mb-3 text-blue/40" />
                  <div className="font-semibold text-charcoal">Шайхантахурский р-н, Зафаробод 50</div>
                  <div className="text-sm mt-1">м. Беруний · ост. Орзу</div>
                  <a
                    href="https://maps.google.com/?q=Zafarobod+50+Tashkent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue text-sm font-semibold mt-3 hover:underline"
                  >
                    Открыть на Google Maps <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="reveal-right flex flex-col gap-8">
              {/* Address */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center">
                    <MapPin size={15} className="text-blue" />
                  </div>
                  <h3 className="font-bold text-charcoal">Адрес</h3>
                </div>
                <p className="text-muted text-sm pl-10">г. Ташкент, Шайхантахурский район, Зафаробод 50</p>
                <p className="text-muted text-sm pl-10 mt-1">
                  <span className="font-medium text-charcoal">Метро:</span> ст. Беруний (5 мин пешком)
                </p>
                <p className="text-muted text-sm pl-10 mt-1">
                  <span className="font-medium text-charcoal">Остановка:</span> Орзу
                </p>
                <p className="text-muted text-sm pl-10 mt-1">
                  <span className="font-medium text-charcoal">Парковка:</span> Бесплатная
                </p>
              </div>

              {/* Hours */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center">
                    <Clock size={15} className="text-blue" />
                  </div>
                  <h3 className="font-bold text-charcoal">Время работы</h3>
                </div>
                <div className="space-y-2 pl-10">
                  {hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between text-sm">
                      <span className="text-muted">{h.day}</span>
                      <span className="font-semibold text-charcoal">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center">
                    <Instagram size={15} className="text-blue" />
                  </div>
                  <h3 className="font-bold text-charcoal">Социальные сети</h3>
                </div>
                <div className="pl-10 space-y-1.5">
                  <a href="https://instagram.com/VIVA_DENTAL_GROUP_Huvaydo" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue hover:underline font-medium">
                    Instagram / Telegram: @VIVA_DENTAL_GROUP_Huvaydo
                  </a>
                  <a href="https://t.me/Viva3D" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue hover:underline font-medium">
                    Telegram 3D КТ: @Viva3D
                  </a>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-surface rounded-2xl p-5">
                <div className="font-bold text-charcoal mb-1">Запишитесь прямо сейчас</div>
                <p className="text-muted text-sm mb-4">Оставьте заявку или напишите в Telegram — подберём удобное время.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <PopupButton className="btn-primary text-sm py-2.5 flex-1 justify-center">
                    <Send size={15} />
                    Записаться онлайн
                  </PopupButton>
                  <a href="tel:+998955030001" className="btn-outline text-sm py-2.5 flex-1 justify-center">
                    <Phone size={15} />
                    Позвонить
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
