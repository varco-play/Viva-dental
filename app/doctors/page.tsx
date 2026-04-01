import { GraduationCap, Briefcase } from 'lucide-react'
import PopupButton from '@/components/PopupButton'
import { doctors } from '@/lib/data'

export default function DoctorsPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container-wide">
          <h1 className="section-title text-4xl md:text-5xl">Наши врачи</h1>
          <p className="section-subtitle">
            Опытные специалисты, которые регулярно совершенствуют свои навыки. Мы гордимся командой профессионалов с многолетним стажем.
          </p>
        </div>
      </section>

      {/* Doctors grid */}
      <section className="py-16 bg-white">
        <div className="container-wide grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doc) => (
            <div key={doc.id} className="card flex flex-col">
              {/* Photo */}
              <div className="w-full h-52 bg-gradient-to-br from-primary/10 to-blue-50 rounded-xl mb-5 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl">👨‍⚕️</span>
                  <p className="text-xs text-muted mt-2">Фото врача</p>
                </div>
              </div>

              {/* Info */}
              <h2 className="text-lg font-bold text-charcoal">{doc.name}</h2>
              <p className="text-primary font-medium text-sm mt-1">{doc.specialty}</p>

              <div className="mt-4 space-y-2 text-sm text-muted">
                <div className="flex items-start gap-2">
                  <Briefcase size={15} className="text-primary mt-0.5 shrink-0" />
                  <span>Стаж: <span className="text-charcoal font-medium">{doc.experience}</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <GraduationCap size={15} className="text-primary mt-0.5 shrink-0" />
                  <span>{doc.education}</span>
                </div>
              </div>

              <p className="text-sm text-muted leading-relaxed mt-4 flex-1">{doc.description}</p>

              <PopupButton
                label="Записаться к врачу"
                variant="outline"
                className="mt-5 text-sm py-2 w-full text-center"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-surface">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-charcoal mb-4">Не знаете к какому врачу записаться?</h2>
          <p className="text-muted mb-8 max-w-md mx-auto">Позвоните нам или оставьте заявку — администратор поможет подобрать нужного специалиста.</p>
          <PopupButton label="Оставить заявку" variant="primary" className="text-base py-3.5 px-8" />
        </div>
      </section>
    </div>
  )
}
