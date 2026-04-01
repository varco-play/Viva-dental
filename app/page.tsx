import Link from 'next/link'
import { CheckCircle, Shield, Clock, Award, Star, ArrowRight, Phone } from 'lucide-react'
import PopupButton from '@/components/PopupButton'
import { doctors, reviews, services } from '@/lib/data'

const features = [
  { icon: <Shield size={28} className="text-primary" />, title: 'Современное оборудование', desc: 'КТ, дентальный микроскоп, цифровые слепки — диагностика и лечение на уровне мировых стандартов.' },
  { icon: <Award size={28} className="text-primary" />, title: 'Опытные специалисты', desc: 'Врачи со стажем от 9 лет, регулярно проходящие обучение в России и Европе.' },
  { icon: <CheckCircle size={28} className="text-primary" />, title: 'Гарантия на работы', desc: 'Даём письменную гарантию на все лечебные и ортопедические работы до 5 лет.' },
  { icon: <Clock size={28} className="text-primary" />, title: 'Удобное расписание', desc: 'Работаем 7 дней в неделю. Принимаем по записи и в день обращения.' },
]

export default function HomePage() {
  const previewDoctors = doctors.slice(0, 3)
  const previewReviews = reviews.slice(0, 3)
  const previewServices = services.slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-blue-50 via-white to-white">
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              Стоматологическая клиника в Москве
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-6">
              Здоровая улыбка —<br />
              <span className="text-primary">наша забота</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-8 max-w-lg">
              Профессиональное лечение зубов, имплантация, ортодонтия и эстетическая стоматология. Без боли, с заботой о каждом пациенте.
            </p>
            <div className="flex flex-wrap gap-4">
              <PopupButton label="Записаться на приём" variant="primary" className="text-base py-3.5 px-8" />
              <a href="tel:+74951234567" className="btn-outline text-base py-3.5 px-8 flex items-center gap-2">
                <Phone size={18} /> Позвонить
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-8">
              {[['18+', 'лет опыта'], ['6', 'специалистов'], ['5 000+', 'пациентов'], ['5 лет', 'гарантия']].map(([val, label]) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-charcoal">{val}</div>
                  <div className="text-sm text-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative hidden lg:block">
            <div className="w-full h-[480px] bg-gradient-to-br from-primary/10 to-blue-100 rounded-3xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-primary/20 mx-auto flex items-center justify-center mb-4">
                  <span className="text-5xl">🦷</span>
                </div>
                <p className="text-primary font-semibold text-lg">Viva Dental</p>
                <p className="text-muted text-sm">Логотип появится здесь</p>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white shadow-xl rounded-2xl px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center text-xs font-bold text-primary">{i}</div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-semibold text-charcoal">5 000+ пациентов</div>
                  <div className="flex text-gold text-xs">{'★★★★★'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">Почему выбирают нас</h2>
            <p className="section-subtitle mx-auto">Мы создаём комфортные условия для лечения и заботимся о результате</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card text-center">
                <div className="flex justify-center mb-4">{f.icon}</div>
                <h3 className="font-semibold text-charcoal mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-16 bg-surface">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="section-title mb-2">Наши услуги</h2>
              <p className="text-muted">Полный спектр стоматологической помощи</p>
            </div>
            <Link href="/services" className="flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all text-sm">
              Все услуги <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewServices.map((s) => (
              <div key={s.category} className="card hover:border-primary/30">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-semibold text-charcoal mb-2">{s.category}</h3>
                <ul className="text-sm text-muted space-y-1">
                  {s.items.slice(0, 3).map(item => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">•</span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/services" className="text-primary text-sm font-medium mt-3 inline-block hover:underline">
                  Подробнее →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors preview */}
      <section className="py-16 bg-white">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="section-title mb-2">Наши врачи</h2>
              <p className="text-muted">Опытные специалисты с международным образованием</p>
            </div>
            <Link href="/doctors" className="flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all text-sm">
              Все врачи <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewDoctors.map((doc) => (
              <div key={doc.id} className="card text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍⚕️</span>
                </div>
                <h3 className="font-semibold text-charcoal">{doc.name}</h3>
                <p className="text-primary text-sm font-medium mt-1">{doc.specialty}</p>
                <p className="text-muted text-sm mt-1">Стаж: {doc.experience}</p>
                <p className="text-sm text-muted mt-3 leading-relaxed">{doc.description.slice(0, 90)}...</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 bg-primary">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Запишитесь на бесплатную консультацию</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">Осмотр и составление плана лечения — бесплатно. Звоните или оставьте заявку онлайн.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <PopupButton label="Оставить заявку" variant="gold" className="text-base py-3.5 px-8" />
            <a href="tel:+74951234567" className="bg-white/20 hover:bg-white/30 text-white px-8 py-3.5 rounded-lg font-medium transition-colors flex items-center gap-2">
              <Phone size={18} /> +7 (495) 123-45-67
            </a>
          </div>
        </div>
      </section>

      {/* Reviews preview */}
      <section className="py-16 bg-surface">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="section-title mb-2">Отзывы пациентов</h2>
              <p className="text-muted">Более 5 000 довольных пациентов</p>
            </div>
            <Link href="/reviews" className="flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all text-sm">
              Все отзывы <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {previewReviews.map((r) => (
              <div key={r.id} className="card">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-sm text-charcoal leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm text-charcoal">{r.name}</div>
                    <div className="text-xs text-muted">{r.service}</div>
                  </div>
                  <span className="text-xs text-muted">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
