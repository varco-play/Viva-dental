'use client'
import { useEffect, useRef } from 'react'
import { CheckCircle, Award, Heart, Users, Shield, Sparkles } from 'lucide-react'
import PopupButton from '@/components/PopupButton'

const values = [
  { icon: Heart, title: 'Забота о пациенте', desc: 'Атмосфера доверия и комфорта. Каждый пациент — индивидуальный подход и честный план лечения.' },
  { icon: Award, title: 'Высокое качество', desc: 'Используем только сертифицированные материалы и оборудование ведущих мировых производителей.' },
  { icon: Users, title: 'Команда профессионалов', desc: 'Наши врачи — специалисты высшей категории с многолетним опытом и непрерывным обучением.' },
  { icon: Shield, title: 'Безопасность', desc: 'Строгое соблюдение стандартов стерилизации и антисептики. Ваша безопасность — наш приоритет.' },
]

const achievements = [
  'Лицензия Министерства здравоохранения Республики Узбекистан',
  'Сертификаты ISO 9001:2015',
  'Партнёр ведущих стоматологических академий Узбекистана',
  'Победитель премии «Лучшая клиника года» 2022, 2023',
  'Более 50 дипломов и сертификатов врачей',
  'Современное оборудование Planmeca и Sirona',
]

export default function AboutPage() {
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
        <div className="container-wide relative z-10">
          <div className="tag animate-fade-up"><span className="tag-dot" />О клинике</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink mt-2 mb-4 max-w-2xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
            12 лет заботы<br /><span className="text-gradient">о вашей улыбке</span>
          </h1>
          <p className="text-slate text-lg max-w-xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Viva Dental Group — это современная многопрофильная стоматологическая клиника, созданная с одной целью: дать каждому пациенту красивую и здоровую улыбку.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="tag reveal"><span className="tag-dot" />Наша история</div>
              <h2 className="section-title reveal delay-100">Клиника, которой<br />доверяют семьи</h2>
              <div className="space-y-4 text-muted leading-relaxed reveal delay-200">
                <p>Viva Dental была основана в 2012 году группой врачей-стоматологов с единой миссией — сделать качественную стоматологическую помощь доступной и комфортной для каждого пациента.</p>
                <p>За 12 лет работы мы приняли более 8500 пациентов, провели тысячи успешных операций по имплантации и создали сотни голливудских улыбок с помощью виниров и ортодонтии.</p>
                <p>Сегодня Viva Dental — это команда из 15 специалистов, современное оборудование и атмосфера, в которой даже самые тревожные пациенты чувствуют себя спокойно.</p>
              </div>
              <div className="mt-6 reveal delay-300">
                <PopupButton className="btn-primary">
                  Записаться на приём
                </PopupButton>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { num: '12+', label: 'лет на рынке', color: 'bg-gradient-teal' },
                { num: '8500+', label: 'пациентов', color: 'bg-navy' },
                { num: '15', label: 'специалистов', color: 'bg-navy' },
                { num: '98%', label: 'довольны результатом', color: 'bg-gradient-teal' },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`${s.color} rounded-3xl p-6 text-white reveal`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-4xl font-black mb-1">{s.num}</div>
                  <div className="text-white/70 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-surface">
        <div className="container-wide">
          <div className="text-center mb-14">
            <div className="tag justify-center reveal"><span className="tag-dot" />Наши ценности</div>
            <h2 className="section-title reveal delay-100">На чём основана<br />наша работа</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="reveal group" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="card h-full group-hover:border-teal/30">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-teal flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="font-bold text-charcoal mb-2">{v.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="tag reveal"><span className="tag-dot" />Достижения</div>
              <h2 className="section-title reveal delay-100">Сертификаты<br />и лицензии</h2>
              <ul className="space-y-3 mt-6">
                {achievements.map((a, i) => (
                  <li key={a} className="reveal flex items-start gap-3" style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={14} className="text-teal" />
                    </div>
                    <span className="text-charcoal text-sm">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative reveal-right">
              <div className="rounded-3xl overflow-hidden bg-gradient-navy h-80 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-dots opacity-30" />
                <div className="relative text-center text-white/30 text-sm">
                  <Sparkles size={48} className="mx-auto mb-3 text-teal/50" />
                  Фото клиники
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-card-hover p-5">
                <div className="text-3xl font-black text-teal">100%</div>
                <div className="text-xs text-muted mt-1">Лицензированная<br />деятельность</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand" />
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="container-wide relative z-10 text-center">
          <h2 className="text-4xl font-black text-white mb-4 reveal">Убедитесь сами</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto reveal delay-100">
            Запишитесь на консультацию и познакомьтесь с нашей командой лично.
          </p>
          <PopupButton className="btn-white text-base py-4 px-8 reveal delay-200">
            Записаться на приём
          </PopupButton>
        </div>
      </section>
    </div>
  )
}
