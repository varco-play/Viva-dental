import { CheckCircle, Award, Heart, Users } from 'lucide-react'
import PopupButton from '@/components/PopupButton'

const values = [
  { icon: <Heart size={24} className="text-primary" />, title: 'Забота о пациенте', desc: 'Мы создаём атмосферу доверия и комфорта. Каждый пациент — индивидуальный подход и честный план лечения.' },
  { icon: <Award size={24} className="text-primary" />, title: 'Высокое качество', desc: 'Используем только сертифицированные материалы ведущих мировых брендов. Гарантия на все работы.' },
  { icon: <CheckCircle size={24} className="text-primary" />, title: 'Современные технологии', desc: 'КТ 3D, дентальный микроскоп, цифровые слепки, фотополимерные пломбы нового поколения.' },
  { icon: <Users size={24} className="text-primary" />, title: 'Постоянное развитие', desc: 'Врачи ежегодно проходят обучение в России и за рубежом. Следим за новейшими методиками.' },
]

const stats = [
  { value: '2007', label: 'Год основания' },
  { value: '18+', label: 'Лет на рынке' },
  { value: '6', label: 'Специалистов' },
  { value: '5 000+', label: 'Пациентов' },
  { value: '98%', label: 'Довольных клиентов' },
  { value: '5 лет', label: 'Гарантия на работы' },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container-wide">
          <h1 className="section-title text-4xl md:text-5xl">О клинике</h1>
          <p className="section-subtitle text-lg">
            Viva Dental — это команда профессионалов, объединённых общей целью: сделать стоматологию безболезненной, доступной и результативной.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl font-bold text-charcoal mb-6">Наша история</h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Клиника Viva Dental была основана в 2007 году с простой миссией — сделать качественную стоматологическую помощь доступной для каждой семьи. За эти годы мы вырасли из небольшого кабинета в многопрофильную клинику с командой из шести опытных специалистов.
              </p>
              <p>
                Мы убеждены: поход к стоматологу не должен быть страшным. Именно поэтому мы создаём атмосферу спокойствия и доверия — от момента записи до завершения лечения. Каждому пациенту уделяется столько времени, сколько нужно.
              </p>
              <p>
                Сегодня Viva Dental оснащена современным цифровым оборудованием, сотрудничает с ведущими лабораториями и предлагает полный спектр услуг — от профилактики и лечения до имплантации и ортодонтии.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-blue-50 rounded-3xl h-72 flex items-center justify-center">
            <div className="text-center text-muted">
              <div className="text-6xl mb-3">🏥</div>
              <p className="font-medium text-charcoal">Фото клиники</p>
              <p className="text-sm">Добавьте фотографии</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-primary">
        <div className="container-wide grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-blue-200 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container-wide">
          <h2 className="section-title text-center mb-2">Наши принципы</h2>
          <p className="section-subtitle text-center mx-auto mb-10">То, чем мы руководствуемся в работе каждый день</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="card text-center">
                <div className="flex justify-center mb-3">{v.icon}</div>
                <h3 className="font-semibold text-charcoal mb-2">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-16 bg-surface">
        <div className="container-wide">
          <h2 className="section-title text-center mb-2">Лицензии и сертификаты</h2>
          <p className="section-subtitle text-center mx-auto mb-10">Клиника работает в соответствии со всеми требованиями законодательства</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl aspect-[3/4] flex flex-col items-center justify-center text-center p-4 shadow-sm">
                <div className="text-4xl mb-3">📜</div>
                <p className="text-sm font-medium text-charcoal">Сертификат {i + 1}</p>
                <p className="text-xs text-muted mt-1">Добавьте документ</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-charcoal mb-4">Приходите знакомиться</h2>
          <p className="text-muted mb-8 max-w-md mx-auto">Первичная консультация бесплатна. Приходите — расскажем о клинике, покажем оборудование.</p>
          <PopupButton label="Записаться на консультацию" variant="primary" className="text-base py-3.5 px-8" />
        </div>
      </section>
    </div>
  )
}
