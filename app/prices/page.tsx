'use client'
import { useState } from 'react'
import PopupButton from '@/components/PopupButton'
import { priceList } from '@/lib/data'

export default function PricesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = priceList.map(p => p.category)
  const filtered = activeCategory
    ? priceList.filter(p => p.category === activeCategory)
    : priceList

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container-wide">
          <h1 className="section-title text-4xl md:text-5xl">Прайс-лист</h1>
          <p className="section-subtitle">
            Прозрачные цены без скрытых доплат. Точная стоимость определяется после осмотра и составления плана лечения.
          </p>
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-dark border border-gold/30 rounded-xl px-4 py-2 text-sm font-medium">
            ⭐ Первичная консультация — Бесплатно
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                !activeCategory ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200'
              }`}
            >
              Все услуги
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Price tables */}
      <section className="py-10 bg-white">
        <div className="container-wide space-y-8">
          {filtered.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-bold text-charcoal mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full inline-block" />
                {section.category}
              </h2>
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface">
                      <th className="text-left px-6 py-3 font-semibold text-charcoal">Услуга</th>
                      <th className="text-right px-6 py-3 font-semibold text-charcoal whitespace-nowrap">Стоимость</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item, i) => (
                      <tr key={i} className={`border-t border-gray-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                        <td className="px-6 py-3.5 text-charcoal">{item.name}</td>
                        <td className="px-6 py-3.5 text-right font-semibold text-primary whitespace-nowrap">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Note */}
      <section className="py-8 bg-surface">
        <div className="container-wide">
          <div className="bg-blue-50 border border-primary/20 rounded-xl p-6 text-sm text-muted leading-relaxed">
            <p className="font-semibold text-charcoal mb-2">Важная информация:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Указанные цены — минимальные. Точная стоимость определяется после осмотра.</li>
              <li>Первичная консультация — бесплатно.</li>
              <li>Действуют скидки для пенсионеров и постоянных пациентов.</li>
              <li>Клиника принимает наличные и банковские карты. Возможна рассрочка.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-charcoal mb-4">Узнайте точную стоимость лечения</h2>
          <p className="text-muted mb-8 max-w-md mx-auto">Запишитесь на бесплатный осмотр — составим точный план и смету без скрытых доплат.</p>
          <PopupButton label="Записаться бесплатно" variant="primary" className="text-base py-3.5 px-8" />
        </div>
      </section>
    </div>
  )
}
