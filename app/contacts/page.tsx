import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import PopupButton from '@/components/PopupButton'

export default function ContactsPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container-wide">
          <h1 className="section-title text-4xl md:text-5xl">Контакты</h1>
          <p className="section-subtitle">
            Мы находимся в центре Москвы. Удобная парковка и близость к метро.
          </p>
        </div>
      </section>

      {/* Contacts grid */}
      <section className="py-16 bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-charcoal mb-5">Как с нами связаться</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted mb-1">Телефон</div>
                    <a href="tel:+74951234567" className="font-semibold text-charcoal hover:text-primary transition-colors text-lg">+7 (495) 123-45-67</a>
                    <div className="text-sm text-muted mt-0.5">Звонки принимаем в часы работы</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageCircle size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted mb-1">WhatsApp / Telegram</div>
                    <a href="https://wa.me/74951234567" className="font-semibold text-charcoal hover:text-primary transition-colors">+7 (495) 123-45-67</a>
                    <div className="text-sm text-muted mt-0.5">Пишите в любое время — ответим в рабочие часы</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted mb-1">Email</div>
                    <a href="mailto:info@vivadental.ru" className="font-semibold text-charcoal hover:text-primary transition-colors">info@vivadental.ru</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted mb-1">Адрес</div>
                    <div className="font-semibold text-charcoal">г. Москва, ул. Примерная, д. 1</div>
                    <div className="text-sm text-muted mt-0.5">м. Примерная, 5 минут пешком</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted mb-2">Режим работы</div>
                    <div className="space-y-1 text-sm">
                      {[
                        ['Понедельник – Пятница', '9:00 – 21:00'],
                        ['Суббота', '9:00 – 20:00'],
                        ['Воскресенье', '10:00 – 18:00'],
                      ].map(([day, hours]) => (
                        <div key={day} className="flex justify-between gap-8">
                          <span className="text-muted">{day}</span>
                          <span className="font-medium text-charcoal">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <PopupButton label="Записаться на приём" variant="primary" className="text-base py-3.5 px-8 w-full text-center" />
          </div>

          {/* Map placeholder */}
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex-1 min-h-80 flex flex-col items-center justify-center text-center p-8">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="font-semibold text-charcoal mb-2">Карта</h3>
              <p className="text-sm text-muted max-w-xs">
                Здесь будет интерактивная карта Яндекс / Google Maps с меткой клиники. Вставьте embed-код карты.
              </p>
              <div className="mt-4 text-xs text-muted bg-white/80 rounded-lg px-4 py-2 font-mono">
                {'<iframe src="https://yandex.ru/maps/..." />'}
              </div>
            </div>

            {/* Transport */}
            <div className="card">
              <h3 className="font-semibold text-charcoal mb-3">Как добраться</h3>
              <div className="space-y-2 text-sm text-muted">
                <div className="flex items-start gap-2">
                  <span className="text-lg">🚇</span>
                  <span><strong className="text-charcoal">Метро:</strong> Примерная (5 мин пешком), выход №2</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">🚌</span>
                  <span><strong className="text-charcoal">Автобус:</strong> маршруты 15, 23, 47 — остановка «Примерная»</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">🚗</span>
                  <span><strong className="text-charcoal">Парковка:</strong> бесплатная стоянка рядом с клиникой на 10 мест</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
