'use client'
import { useState, useEffect, useRef } from 'react'
import { CheckCircle, ArrowRight, Info } from 'lucide-react'
import PopupButton from '@/components/PopupButton'
import { priceList } from '@/lib/data'

export default function PricesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    el.querySelectorAll('.reveal').forEach(e => obs.observe(e))
    return () => obs.disconnect()
  }, [])

  const categories = priceList.map(p => p.category)
  const filtered = activeCategory ? priceList.filter(p => p.category === activeCategory) : priceList

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative py-14 overflow-hidden bg-gradient-to-b from-blue-pale to-white border-b border-blue/[0.07]">
        <div className="container-wide relative z-10 text-center">
          <div className="tag justify-center animate-fade-up"><span className="tag-dot" />Прайс-лист</div>
          <h1 className="text-5xl md:text-6xl font-bold text-ink mt-2 mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Прозрачные цены<br /><span className="text-gradient">без скрытых доплат</span>
          </h1>
          <p className="text-slate text-lg max-w-xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Точная стоимость определяется после осмотра и составления плана лечения.
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue/10 border border-blue/20 text-blue font-semibold text-sm animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <CheckCircle size={16} />
            10% скидка при семейном посещении
          </div>
        </div>
      </section>

      {/* Sticky filter */}
      <section className="bg-white border-b border-gray-100 sticky top-16 sm:top-24 z-40 shadow-sm">
        <div className="container-wide py-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                !activeCategory
                  ? 'bg-gradient-teal text-white shadow-teal'
                  : 'bg-surface text-muted hover:bg-gray-100'
              }`}
            >
              Все услуги
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-gradient-teal text-white shadow-teal'
                    : 'bg-surface text-muted hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Price tables */}
      <section className="section bg-surface">
        <div className="container-wide space-y-8">
          {filtered.map((section, si) => (
            <div key={section.category} className="reveal" style={{ transitionDelay: `${si * 80}ms` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-7 rounded-full bg-gradient-teal" />
                <h2 className="text-xl font-black text-charcoal">{section.category}</h2>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy">
                      <th className="text-left px-6 py-4 font-semibold text-white/80 text-xs uppercase tracking-wider">Услуга</th>
                      <th className="text-right px-6 py-4 font-semibold text-white/80 text-xs uppercase tracking-wider whitespace-nowrap">Стоимость</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item, i) => (
                      <tr
                        key={i}
                        className="border-t border-gray-50 hover:bg-surface transition-colors duration-150 group"
                      >
                        <td className="px-6 py-4 text-charcoal group-hover:text-navy transition-colors">{item.name}</td>
                        <td className="px-6 py-4 text-right font-bold text-teal whitespace-nowrap">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info note */}
      <section className="pb-8 bg-surface">
        <div className="container-wide">
          <div className="bg-white border border-teal/20 rounded-2xl p-6 flex gap-4 shadow-card reveal">
            <Info size={20} className="text-teal flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-charcoal mb-2 text-sm">Важная информация:</p>
              <ul className="space-y-1 text-sm text-muted">
                <li className="flex items-start gap-2"><CheckCircle size={13} className="text-teal mt-0.5 flex-shrink-0" />Указанные цены — минимальные. Точная стоимость определяется после осмотра.</li>
                <li className="flex items-start gap-2"><CheckCircle size={13} className="text-teal mt-0.5 flex-shrink-0" />10% скидка при семейном посещении.</li>
                <li className="flex items-start gap-2"><CheckCircle size={13} className="text-teal mt-0.5 flex-shrink-0" />Скидка при лечении 2 и более зубов.</li>
                <li className="flex items-start gap-2"><CheckCircle size={13} className="text-teal mt-0.5 flex-shrink-0" />Цены указаны в узбекских сумах (UZS).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand" />
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="container-wide relative z-10 text-center">
          <h2 className="text-4xl font-black text-white mb-4 reveal">Узнайте точную стоимость лечения</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto reveal delay-100">
            Запишитесь на приём — составим точный план и смету без скрытых доплат.
          </p>
          <PopupButton className="btn-white text-base py-4 px-8 reveal delay-200">
            Записаться на приём <ArrowRight size={18} />
          </PopupButton>
        </div>
      </section>
    </div>
  )
}
