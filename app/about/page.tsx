'use client'
import { useEffect, useRef } from 'react'
import { CheckCircle, Award, Heart, Users, Shield, Sparkles } from 'lucide-react'
import PopupButton from '@/components/PopupButton'

const values = [
  { icon: Heart, title: 'Призвание и забота', desc: 'Атмосфера доверия и комфорта. Каждый пациент получает индивидуальный подход и честный план лечения без лишнего стресса.' },
  { icon: Award, title: 'Высокие технологии', desc: 'Используем 3D-рентген (MORITA X800), современное оборудование и передовые методы лечения для точного и безопасного результата.' },
  { icon: Shield, title: 'Чистота и безопасность', desc: 'Строгое соблюдение стандартов стерилизации и антисептики. Ваша безопасность — абсолютный приоритет клиники.' },
  { icon: Users, title: 'Опытная команда', desc: 'Наши врачи — специалисты с международными сертификатами и непрерывным обучением. Профессионализм без компромиссов.' },
]

const achievements = [
  'Лицензия Министерства здравоохранения Республики Узбекистан (СТИР: 307594539)',
  '3D КТ-рентген MORITA X800 — точная диагностика для точного лечения',
  'Международное обучение врачей: Китай, Корея, Турция, Германия, Франция, Бельгия',
  'Основатель клиники прошёл ординатуру в ANDC — Международная академия стоматологов (Корея)',
  'Оплата удобным способом: наличные и банковская карта',
  'Два современных филиала в Ташкенте для удобства пациентов',
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
            10 лет заботы<br /><span className="text-gradient">о вашей улыбке</span>
          </h1>
          <p className="text-slate text-lg max-w-xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Viva Dental Group — современная многопрофильная стоматологическая клиника с двумя филиалами в Ташкенте. Основана в 2016 году с одной целью: дать каждому пациенту здоровую и красивую улыбку.
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
                <p>Viva Dental Group основана 1 сентября 2016 года главным врачом Рашитходжаевым Саидхожой Набиходжаевичем с единой миссией — сделать профессиональную стоматологическую помощь доступной и комфортной для каждого.</p>
                <p>За 10 лет работы клиника приняла более 150 000 пациентов и выросла до сети из двух современных филиалов в Ташкенте, оснащённых передовым оборудованием, включая 3D КТ-рентген MORITA X800.</p>
                <p>Сегодня Viva Dental Group — это команда опытных специалистов с международными сертификатами, атмосфера заботы и высокие стандарты лечения, благодаря которым даже самые тревожные пациенты чувствуют себя спокойно.</p>
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
                { num: '10+', label: 'лет на рынке', color: 'bg-gradient-teal' },
                { num: '150 000+', label: 'пациентов', color: 'bg-navy' },
                { num: '2', label: 'филиала в Ташкенте', color: 'bg-navy' },
                { num: '98%', label: 'довольны результатом', color: 'bg-gradient-teal' },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`${s.color} rounded-3xl p-6 text-white reveal`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-3xl font-black mb-1">{s.num}</div>
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
                    <h3 className="font-bold text-charcoal text-lg mb-2">{v.title}</h3>
                    <p className="text-muted text-base leading-relaxed">{v.desc}</p>
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
              <h2 className="section-title reveal delay-100">Сертификаты<br />и стандарты</h2>
              <ul className="space-y-3 mt-6">
                {achievements.map((a, i) => (
                  <li key={a} className="reveal flex items-start gap-3" style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={14} className="text-teal" />
                    </div>
                    <span className="text-charcoal text-base">{a}</span>
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
                <div className="text-3xl font-black text-teal">3D</div>
                <div className="text-xs text-muted mt-1">КТ MORITA X800<br />ежедневно 9–22</div>
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
