'use client'
import { useEffect, useRef } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import PopupButton from '@/components/PopupButton'
import { services } from '@/lib/data'

export default function ServicesPage() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    el.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(e => obs.observe(e))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-navy" />
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal/10 blur-3xl" />
        <div className="container-wide relative z-10 text-center">
          <div className="tag justify-center animate-fade-up"><span className="tag-dot" />Наши услуги</div>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-2 mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Полный спектр<br /><span className="text-gradient">стоматологических услуг</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Все виды лечения в одном месте. Работаем на профессиональном оборудовании последнего поколения.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-surface">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <div
                key={service.category}
                className="reveal reveal-scale group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Card header */}
                <div className="relative p-8 pb-6">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-surface -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-teal flex items-center justify-center flex-shrink-0 shadow-teal group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{service.icon || '🦷'}</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-black text-charcoal mb-1 group-hover:text-teal transition-colors">{service.category}</h2>
                    </div>
                  </div>
                </div>

                {/* Items */}
                {service.items && service.items.length > 0 && (
                  <div className="px-8 pb-8">
                    <div className="h-px bg-gray-50 mb-5" />
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.items.slice(0, 6).map((feat: string) => (
                        <li key={feat} className="flex items-start gap-2 text-sm text-muted">
                          <CheckCircle size={14} className="text-teal mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="px-8 pb-8 pt-0">
                  <PopupButton className="btn-outline text-sm py-2.5 px-5 w-full sm:w-auto justify-center group-hover:bg-teal group-hover:text-white group-hover:border-teal">
                    Записаться <ArrowRight size={14} />
                  </PopupButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-navy" />
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="container-wide relative z-10 text-center">
          <h2 className="text-4xl font-black text-white mb-4 reveal">Не нашли нужную услугу?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto reveal delay-100">
            Свяжитесь с нами — наши специалисты проконсультируют и подберут оптимальное лечение.
          </p>
          <PopupButton className="btn-primary text-base py-4 px-8 reveal delay-200">
            Получить консультацию <ArrowRight size={18} />
          </PopupButton>
        </div>
      </section>
    </div>
  )
}
