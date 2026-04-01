'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Shield, Clock, Award, Star, ChevronRight, Phone, Calendar, Users, Stethoscope, Sparkles, CheckCircle } from 'lucide-react'
import PopupButton from '@/components/PopupButton'

function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = Date.now()
        const tick = () => {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * end))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { end: 12, suffix: '+', label: 'Лет опыта', icon: Award },
  { end: 8500, suffix: '+', label: 'Пациентов', icon: Users },
  { end: 15, suffix: '', label: 'Специалистов', icon: Stethoscope },
  { end: 98, suffix: '%', label: 'Довольны результатом', icon: Star },
]

const features = [
  { icon: Shield, title: 'Гарантия качества', desc: 'Письменная гарантия на все виды лечения и протезирования до 5 лет.' },
  { icon: Clock, title: 'Удобное расписание', desc: 'Работаем 7 дней в неделю. Приём без очередей по предварительной записи.' },
  { icon: Award, title: 'Передовые технологии', desc: 'Цифровая рентгенография, 3D-томография, CAD/CAM протезирование.' },
  { icon: Sparkles, title: 'Безболезненно', desc: 'Современные анестетики делают лечение комфортным даже для детей.' },
]

const serviceCards = [
  { title: 'Терапия', desc: 'Лечение кариеса, реставрация зубов', emoji: '🦷' },
  { title: 'Ортодонтия', desc: 'Брекеты, элайнеры, ретейнеры', emoji: '😁' },
  { title: 'Имплантация', desc: 'Металлокерамика и цирконий', emoji: '🔬' },
  { title: 'Косметическая', desc: 'Отбеливание и виниры', emoji: '✨' },
  { title: 'Хирургия', desc: 'Удаление, сложные операции', emoji: '🏥' },
  { title: 'Детская', desc: 'Бережное лечение от 3 лет', emoji: '👶' },
]

const testimonials = [
  { name: 'Анна Смирнова', rating: 5, text: 'Впервые посетила Viva Dental по рекомендации подруги. Врач всё объяснил, было абсолютно не больно.', procedure: 'Лечение кариеса' },
  { name: 'Дмитрий Козлов', rating: 5, text: 'Делали имплантацию двух зубов. Результат превзошёл все ожидания — выглядит как родные зубы.', procedure: 'Имплантация' },
  { name: 'Мария Волкова', rating: 5, text: 'Поставила виниры на 6 зубов. Теперь улыбаюсь не стесняясь! Качество работы на высочайшем уровне.', procedure: 'Виниры' },
]

export default function HomePage() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    section.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef}>
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden -mt-[calc(2.5rem+4rem)] pt-[calc(2.5rem+4rem)]">
        <div className="absolute inset-0 bg-gradient-navy" />
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-teal/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full" style={{ background: 'rgba(45,198,83,0.08)', filter: 'blur(80px)', animation: 'pulse 4s ease-in-out infinite 1s' }} />

        <div className="container-wide relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-green-brand animate-pulse" />
              Принимаем пациентов без очереди
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Красивая улыбка —<br />
              <span className="text-gradient">это искусство</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Профессиональная стоматология с заботой о каждом пациенте. Современные технологии, опытные врачи, комфортная атмосфера.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <PopupButton className="btn-primary text-base py-4 px-8">
                <Calendar size={18} />
                Записаться на приём
              </PopupButton>
              <Link href="/services" className="btn-white text-base py-4 px-8">
                Наши услуги <ArrowRight size={18} />
              </Link>
            </div>
            <div className="flex flex-wrap gap-5 mt-10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {['Лицензия МЗ РФ', 'Гарантия до 5 лет', 'Рассрочка 0%'].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-white/60 text-sm">
                  <CheckCircle size={14} className="text-green-brand flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <span className="text-xs tracking-wider">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="container-wide relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="reveal text-center group" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-teal/10 transition-all duration-300">
                    <Icon size={24} className="text-teal" />
                  </div>
                  <div className="text-4xl font-black text-navy mb-1">
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section bg-surface">
        <div className="container-wide">
          <div className="text-center mb-14">
            <div className="tag justify-center reveal"><span className="tag-dot" />Почему мы</div>
            <h2 className="section-title reveal delay-100">Ваш комфорт — наш<br />главный приоритет</h2>
            <p className="section-subtitle mx-auto text-center reveal delay-200">
              Мы создали клинику, где каждая деталь продумана для вашего удобства и здоровья.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="reveal group" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="card h-full group-hover:border-teal/30">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-teal flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="font-bold text-charcoal mb-2 text-lg">{f.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <div className="tag reveal"><span className="tag-dot" />Услуги</div>
              <h2 className="section-title reveal delay-100 mb-0">Все направления<br />стоматологии</h2>
            </div>
            <Link href="/services" className="btn-outline text-sm self-start md:self-auto reveal delay-200">
              Все услуги <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceCards.map((s, i) => (
              <Link
                key={s.title}
                href="/services"
                className="reveal group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 hover:border-teal/40 hover:shadow-teal transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-surface rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <span className="text-4xl mb-4 block">{s.emoji}</span>
                  <h3 className="font-bold text-charcoal text-lg mb-1 group-hover:text-teal transition-colors">{s.title}</h3>
                  <p className="text-muted text-sm mb-3">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-teal text-sm font-semibold">
                    Подробнее <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand" />
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="container-wide relative z-10 text-center">
          <div className="reveal">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              🎉 Первичная консультация бесплатно
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 reveal delay-100">
            Начните путь к идеальной<br />улыбке сегодня
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto reveal delay-200">
            Запишитесь прямо сейчас и получите бесплатную консультацию.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal delay-300">
            <PopupButton className="btn-white text-base py-4 px-8">
              <Calendar size={18} />
              Записаться онлайн
            </PopupButton>
            <a href="tel:+74951234567" className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-navy transition-all duration-300 text-base">
              <Phone size={18} />
              +7 (495) 123-45-67
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section bg-surface">
        <div className="container-wide">
          <div className="text-center mb-14">
            <div className="tag justify-center reveal"><span className="tag-dot" />Отзывы</div>
            <h2 className="section-title reveal delay-100">Нам доверяют тысячи<br />пациентов</h2>
            <div className="flex items-center justify-center gap-2 mt-3 reveal delay-200">
              <div className="flex">
                {[1,2,3,4,5].map(n => <Star key={n} size={18} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <span className="text-muted text-sm">4.9 из 5 · 2000+ отзывов</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.name} className="reveal card flex flex-col gap-4" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(n => (
                    <Star key={n} size={14} className={n <= t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                  ))}
                </div>
                <p className="text-charcoal text-sm leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                  <div className="w-9 h-9 rounded-full bg-gradient-teal flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal text-sm">{t.name}</div>
                    <div className="text-xs text-muted">{t.procedure}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 reveal delay-200">
            <Link href="/reviews" className="btn-outline">
              Все отзывы <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
