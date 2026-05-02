'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Shield, Clock, Award, Star, ChevronRight, Phone, Calendar,
  Users, Stethoscope, Sparkles, CheckCircle, Smile, Scissors, MinusCircle,
  Wind, Syringe, MessageSquare, type LucideIcon,
} from 'lucide-react'
import PopupButton from '@/components/PopupButton'

function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref     = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = Date.now()
        const tick = () => {
          const elapsed  = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const eased    = 1 - Math.pow(1 - progress, 3)
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
  { end: 12,   suffix: '+', label: 'Лет опыта',           icon: Award },
  { end: 8500, suffix: '+', label: 'Пациентов',            icon: Users },
  { end: 15,   suffix: '',  label: 'Специалистов',         icon: Stethoscope },
  { end: 98,   suffix: '%', label: 'Довольны результатом', icon: Star },
]

const features = [
  { icon: Shield,   title: 'Гарантия качества',     desc: 'Письменная гарантия на все виды лечения. Работаем на сертифицированных материалах.' },
  { icon: Clock,    title: 'Удобное расписание',    desc: 'Работаем 7 дней в неделю. Приём без очередей по предварительной записи.' },
  { icon: Award,    title: 'Передовые технологии',  desc: 'Цифровая рентгенография, современное оборудование Planmeca и Sirona.' },
  { icon: Sparkles, title: 'Безболезненно',          desc: 'Современные анестетики делают лечение комфортным даже для тревожных пациентов.' },
]

const serviceCards: { title: string; desc: string; Icon: LucideIcon }[] = [
  { title: 'Лечение кариеса',            desc: 'Пломба под цвет зуба без боли',    Icon: Smile },
  { title: 'Удаление зубов',             desc: 'Простые и сложные удаления',        Icon: Scissors },
  { title: 'Удаление зубов мудрости',    desc: 'Безопасное удаление восьмёрок',     Icon: MinusCircle },
  { title: 'Профессиональная чистка',    desc: 'AirFlow и ультразвуковая чистка',   Icon: Wind },
  { title: 'Пульпа девитализация',       desc: 'Лечение нерва зуба',               Icon: Syringe },
  { title: 'Консультации',               desc: 'Ортодонт и ортопед',               Icon: MessageSquare },
]

const testimonials = [
  { name: 'Нилуфар Юсупова',  rating: 5, text: 'Впервые посетила Viva Dental по рекомендации подруги. Врач всё объяснил, было абсолютно не больно. Очень довольна результатом!', procedure: 'Лечение кариеса' },
  { name: 'Бобур Каримов',    rating: 5, text: 'Удаляли зуб мудрости. Всё прошло быстро и профессионально, без боли. Клиника чистая, персонал внимательный.', procedure: 'Удаление зуба мудрости' },
  { name: 'Малика Рашидова',  rating: 5, text: 'Сделала профессиональную чистку AirFlow. Результат отличный — зубы белее, дыхание свежее. Буду приходить регулярно!', procedure: 'Профессиональная чистка' },
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
      <section className="relative min-h-[82vh] flex items-center overflow-hidden bg-gradient-navy">
        <div className="absolute inset-0 bg-dots opacity-25" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-green/10 blur-3xl pointer-events-none animate-pulse-slow" />

        <div className="container-wide relative z-10 py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-semibold mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
              Принимаем пациентов без очереди
            </div>

            <h1 className="hidden sm:block text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.05] animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Красивая улыбка —<br />
              <span className="text-gradient">это искусство</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Профессиональная стоматология с заботой о каждом пациенте. Современные технологии, опытные врачи, комфортная атмосфера.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <PopupButton className="btn-white text-base py-4 px-8">
                <Calendar size={18} />
                Записаться на приём
              </PopupButton>
              <Link href="/services" className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 hover:border-white/70 transition-all duration-300 text-base">
                Наши услуги <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex flex-wrap gap-5 mt-10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {['Лицензия МЗ РУз', 'Гарантия на лечение', 'Скидка 10% семьям'].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-white/60 text-sm">
                  <CheckCircle size={14} className="text-green flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <span className="text-xs tracking-widest font-semibold">SCROLL</span>
          <div className="w-px h-7 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-14 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="container-wide relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="reveal text-center group" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="w-14 h-14 rounded-2xl bg-blue-pale flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-blue group-hover:text-white transition-all duration-300">
                    <Icon size={24} className="text-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-4xl font-black text-blue mb-1">
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-slate font-medium">{stat.label}</div>
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
                  <div className="card h-full hover:border-blue/20">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-teal flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="font-bold text-ink mb-2 text-lg">{f.title}</h3>
                    <p className="text-slate text-sm leading-relaxed">{f.desc}</p>
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
                className="reveal group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6
                  hover:border-blue/30 hover:shadow-blue transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-blue-pale rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500 opacity-60" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-teal flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <s.Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-ink text-lg mb-1 group-hover:text-blue transition-colors">{s.title}</h3>
                  <p className="text-slate text-sm mb-3">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-blue text-sm font-bold">
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
        <div className="absolute inset-0 bg-dots opacity-15" />
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="container-wide relative z-10 text-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold mb-6">
              <Star size={14} className="text-yellow-300 fill-yellow-300" />
              10% скидка при семейном посещении
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 reveal delay-100">
            Начните путь к идеальной<br />улыбке сегодня
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto reveal delay-200">
            Запишитесь прямо сейчас и получите профессиональную помощь от наших специалистов.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal delay-300">
            <PopupButton className="btn-white text-base py-4 px-8">
              <Calendar size={18} />
              Записаться онлайн
            </PopupButton>
            <a href="tel:+998955030001" className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue transition-all duration-300 text-base">
              <Phone size={18} />
              +998 (95) 503-00-01
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section bg-surface">
        <div className="container-wide">
          <div className="text-center mb-14">
            <div className="tag justify-center reveal"><span className="tag-dot" />Отзывы</div>
            <h2 className="section-title reveal delay-100">Нам доверяют<br />тысячи пациентов</h2>
            <div className="flex items-center justify-center gap-2 mt-3 reveal delay-200">
              <div className="flex">
                {[1,2,3,4,5].map(n => <Star key={n} size={18} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <span className="text-slate text-sm font-medium">4.9 из 5 · 2000+ отзывов</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.name} className="reveal card flex flex-col gap-4 hover:border-blue/20" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(n => (
                    <Star key={n} size={14} className={n <= t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                  ))}
                </div>
                <p className="text-ink text-sm leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                  <div className="w-9 h-9 rounded-full bg-gradient-teal flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-ink text-sm">{t.name}</div>
                    <div className="text-xs text-slate">{t.procedure}</div>
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
