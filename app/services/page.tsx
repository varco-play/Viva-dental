import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PopupButton from '@/components/PopupButton'
import { services } from '@/lib/data'

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container-wide">
          <h1 className="section-title text-4xl md:text-5xl">Услуги</h1>
          <p className="section-subtitle">
            Полный спектр стоматологической помощи для взрослых и детей. Современное оборудование, проверенные материалы, опытные специалисты.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container-wide space-y-6">
          {services.map((s) => (
            <div key={s.category} className="card border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="text-4xl shrink-0">{s.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <h2 className="text-xl font-bold text-charcoal">{s.category}</h2>
                    <Link href="/prices" className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all font-medium">
                      Цены <ArrowRight size={14} />
                    </Link>
                  </div>
                  <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <span className="text-primary font-bold mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Нужна консультация по услуге?</h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">Запишитесь на бесплатный осмотр — врач ответит на все вопросы и составит план лечения.</p>
          <PopupButton label="Записаться бесплатно" variant="gold" className="text-base py-3.5 px-8" />
        </div>
      </section>
    </div>
  )
}
