'use client'
import { useEffect, useRef } from 'react'
import { GraduationCap, Briefcase, Award, Phone } from 'lucide-react'
import PopupButton from '@/components/PopupButton'
import { doctors } from '@/lib/data'

export default function DoctorsPage() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )
    el.querySelectorAll('.reveal').forEach(e => obs.observe(e))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative py-14 overflow-hidden bg-gradient-to-b from-blue-pale to-white border-b border-blue/[0.07]">
        <div className="container-wide relative z-10 text-center">
          <div className="tag justify-center animate-fade-up"><span className="tag-dot" />Наша команда</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink mt-2 mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Врачи, которым<br /><span className="text-gradient">доверяют пациенты</span>
          </h1>
          <p className="text-slate text-lg max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Наши специалисты — практикующие эксперты с многолетним опытом и международными сертификатами.
          </p>
        </div>
      </section>

      {/* Doctors */}
      <section className="section bg-surface">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-6">
            {doctors.map((doc, i) => (
              <div
                key={doc.id}
                className="reveal bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Top strip — initials + name + specialty + experience */}
                <div className="relative bg-gradient-to-r from-blue-dark to-blue-mid px-6 py-5 flex items-center gap-5">
                  <div className="absolute inset-0 bg-dots opacity-20" />
                  {/* Initials circle */}
                  <div className="relative w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl font-black">
                      {doc.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  {/* Name + meta */}
                  <div className="relative flex-1 min-w-0">
                    <h3 className="text-white font-black text-base leading-snug">{doc.name}</h3>
                    <p className="text-white/70 text-xs mt-0.5">{doc.specialty}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Briefcase size={11} className="text-white/50" />
                      <span className="text-white/60 text-xs">Стаж {doc.experience} лет</span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                  {/* Description */}
                  <p className="text-slate text-sm leading-relaxed">{doc.description}</p>

                  {/* Specializations — chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {doc.specializations.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-full bg-blue/8 text-blue text-xs font-semibold border border-blue/15">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Education */}
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                      <GraduationCap size={13} className="text-blue" />
                      Образование
                    </div>
                    <ul className="space-y-1 pl-3 border-l-2 border-blue/20">
                      {doc.education.map((e) => (
                        <li key={e} className="text-xs text-muted leading-relaxed">{e}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Certifications */}
                  {doc.certifications.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                        <Award size={13} className="text-blue" />
                        Квалификация и сертификаты
                      </div>
                      <ul className="space-y-1 pl-3 border-l-2 border-blue/20">
                        {doc.certifications.map((c) => (
                          <li key={c} className="text-xs text-muted leading-relaxed">{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <PopupButton className="btn-outline text-sm py-2.5 w-full justify-center hover:bg-blue hover:text-white hover:border-blue mt-1">
                    <Phone size={14} />
                    Записаться к врачу
                  </PopupButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand" />
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="container-wide relative z-10 text-center">
          <h2 className="text-4xl font-black text-white mb-4 reveal">Хотите попасть к конкретному врачу?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto reveal delay-100">
            Укажите при записи имя специалиста, и мы подберём для вас удобное время.
          </p>
          <PopupButton className="btn-white text-base py-4 px-8 reveal delay-200">
            Записаться на приём
          </PopupButton>
        </div>
      </section>
    </div>
  )
}
