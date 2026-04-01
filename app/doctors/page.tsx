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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    el.querySelectorAll('.reveal, .reveal-scale').forEach(e => obs.observe(e))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-navy" />
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-green-brand/10 blur-3xl" />
        <div className="container-wide relative z-10 text-center">
          <div className="tag justify-center animate-fade-up"><span className="tag-dot" />Наша команда</div>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-2 mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Врачи, которым<br /><span className="text-gradient">доверяют пациенты</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Наши специалисты — это кандидаты наук, победители всероссийских конкурсов, практикующие эксперты с многолетним опытом.
          </p>
        </div>
      </section>

      {/* Doctors */}
      <section className="section bg-surface">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doc, i) => (
              <div
                key={doc.id}
                className="reveal reveal-scale group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Photo area */}
                <div className="relative h-52 bg-gradient-to-br from-navy to-teal-dark overflow-hidden">
                  <div className="absolute inset-0 bg-dots opacity-30" />
                  {/* Initials as placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center">
                      <span className="text-white text-4xl font-black">
                        {doc.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                  </div>
                  {/* Specialty badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
                      {doc.specialty}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-lg font-black text-charcoal mb-1 group-hover:text-teal transition-colors">{doc.name}</h3>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-1.5 text-muted text-xs">
                      <Briefcase size={12} className="text-teal flex-shrink-0" />
                      <span>Стаж {doc.experience} лет</span>
                    </div>
                    </div>

                  {doc.description && (
                    <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3">{doc.description}</p>
                  )}

                  {doc.education && (
                    <div className="mb-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted font-semibold uppercase tracking-wider mb-2">
                        <GraduationCap size={12} className="text-teal" />
                        Образование
                      </div>
                      <p className="text-xs text-muted pl-3 border-l-2 border-teal/30">{doc.education}</p>
                    </div>
                  )}

                  <PopupButton className="btn-outline text-sm py-2.5 w-full justify-center group-hover:bg-teal group-hover:text-white group-hover:border-teal mt-2">
                    <Phone size={14} />
                    Записаться
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
