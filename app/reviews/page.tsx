import { Star, Play } from 'lucide-react'
import PopupButton from '@/components/PopupButton'
import { reviews } from '@/lib/data'

const blogPosts = [
  {
    id: 1,
    title: 'Как перестать бояться стоматолога',
    date: '15 марта 2025',
    category: 'Советы',
    preview: 'Дентофобия встречается у 30% взрослых. Делимся проверенными способами справиться со страхом перед визитом к врачу...',
    hasVideo: true,
  },
  {
    id: 2,
    title: 'Имплант или мост: что лучше в 2025 году?',
    date: '2 марта 2025',
    category: 'Имплантация',
    preview: 'Подробное сравнение двух методов восстановления зуба: стоимость, долговечность, противопоказания и реальные отзывы пациентов.',
    hasVideo: false,
  },
  {
    id: 3,
    title: 'Invisalign vs брекеты: личный опыт пациента',
    date: '20 февраля 2025',
    category: 'Ортодонтия',
    preview: 'Наша пациентка Елена рассказывает об опыте ношения элайнеров Invisalign в течение 14 месяцев — честно и подробно.',
    hasVideo: true,
  },
  {
    id: 4,
    title: 'Как правильно чистить зубы с брекетами',
    date: '8 февраля 2025',
    category: 'Гигиена',
    preview: 'Ортодонт Дмитрий Александрович объясняет, как ухаживать за зубами во время ортодонтического лечения — инструменты и методика.',
    hasVideo: true,
  },
]

export default function ReviewsPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container-wide">
          <h1 className="section-title text-4xl md:text-5xl">Отзывы и блог</h1>
          <p className="section-subtitle">
            Реальные отзывы наших пациентов и полезные материалы от врачей клиники.
          </p>
          {/* Rating summary */}
          <div className="flex flex-wrap gap-8 mt-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-charcoal">5.0</div>
              <div>
                <div className="flex text-gold text-lg">{'★★★★★'}</div>
                <div className="text-sm text-muted">на основе 5 000+ отзывов</div>
              </div>
            </div>
            {[5, 4, 3].map(stars => (
              <div key={stars} className="flex items-center gap-2 text-sm">
                <span className="text-muted">{stars}★</span>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold rounded-full"
                    style={{ width: stars === 5 ? '90%' : stars === 4 ? '8%' : '2%' }}
                  />
                </div>
                <span className="text-muted">{stars === 5 ? '90%' : stars === 4 ? '8%' : '2%'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-16 bg-white">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-charcoal mb-8">Отзывы пациентов</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.id} className="card flex flex-col">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" />
                  ))}
                  {Array.from({ length: 5 - r.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-gray-300" />
                  ))}
                </div>
                <p className="text-sm text-charcoal leading-relaxed flex-1">"{r.text}"</p>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-charcoal">{r.name}</div>
                    <div className="text-xs text-primary">{r.service}</div>
                  </div>
                  <span className="text-xs text-muted">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video blog */}
      <section className="py-16 bg-surface">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-charcoal mb-2">Блог и видео</h2>
          <p className="text-muted mb-8">Полезные статьи и видео от наших специалистов</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="card flex flex-col">
                <div className="w-full h-36 bg-gradient-to-br from-primary/10 to-blue-50 rounded-xl mb-4 flex items-center justify-center relative">
                  {post.hasVideo && (
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg cursor-pointer hover:bg-primary transition-colors">
                      <Play size={20} className="text-white ml-1" />
                    </div>
                  )}
                  {!post.hasVideo && <span className="text-4xl">📖</span>}
                  <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">{post.category}</span>
                </div>
                <div className="text-xs text-muted mb-2">{post.date}</div>
                <h3 className="font-semibold text-charcoal text-sm leading-snug mb-2">{post.title}</h3>
                <p className="text-xs text-muted leading-relaxed flex-1">{post.preview}</p>
                <button className="text-primary text-xs font-medium mt-3 text-left hover:underline">Читать далее →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leave review CTA */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-charcoal mb-4">Были у нас? Оставьте отзыв</h2>
          <p className="text-muted mb-8 max-w-md mx-auto">Ваше мнение помогает нам становиться лучше и помогает другим пациентам сделать выбор.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <PopupButton label="Оставить отзыв" variant="outline" className="text-base py-3 px-6" />
            <PopupButton label="Записаться на приём" variant="primary" className="text-base py-3 px-6" />
          </div>
        </div>
      </section>
    </div>
  )
}
