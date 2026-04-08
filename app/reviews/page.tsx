'use client'
import { useEffect, useRef } from 'react'
import { Star, ThumbsUp, ArrowRight, BookOpen } from 'lucide-react'
import PopupButton from '@/components/PopupButton'
import { reviews } from '@/lib/data'

const blogPosts = [
  { title: 'Лечение кариеса: как не довести до удаления', date: '15 марта 2025', category: 'Терапия', readTime: '5 мин' },
  { title: 'Зубы мудрости: удалять или оставить?', date: '2 марта 2025', category: 'Хирургия', readTime: '4 мин' },
  { title: 'Профессиональная чистка: зачем и как часто', date: '18 февраля 2025', category: 'Гигиена', readTime: '3 мин' },
]

export default function ReviewsPage() {
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
        <div className="container-wide relative z-10 text-center">
          <div className="tag justify-center animate-fade-up"><span className="tag-dot" />Отзывы</div>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-2 mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Что говорят<br /><span className="text-gradient">наши пациенты</span>
          </h1>

          {/* Rating summary */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 mt-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <div className="text-6xl font-black text-white">4.9</div>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[1,2,3,4,5].map(n => <Star key={n} size={18} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <div className="text-white/40 text-sm mt-1">из 5</div>
            </div>
            <div className="w-px h-14 bg-white/10 hidden sm:block" />
            <div className="text-left">
              <div className="text-white/70 text-sm">На основе</div>
              <div className="text-2xl font-black text-white">2000+ отзывов</div>
              <div className="text-white/40 text-sm">Google · Yandex · 2GIS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="section bg-surface">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div
                key={review.id}
                className="reveal reveal-scale bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(n => (
                    <Star key={n} size={14} className={n <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                  ))}
                </div>

                {/* Text */}
                <p className="text-charcoal text-sm leading-relaxed flex-1">"{review.text}"</p>

                {/* Service tag */}
                {review.service && (
                  <span className="inline-block px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-semibold self-start">
                    {review.service}
                  </span>
                )}

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-gradient-teal flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-charcoal text-sm">{review.name}</div>
                    {review.date && <div className="text-xs text-muted">{review.date}</div>}
                  </div>
                  <ThumbsUp size={14} className="ml-auto text-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="tag reveal"><span className="tag-dot" />Блог</div>
              <h2 className="section-title reveal delay-100 mb-0">Полезные статьи</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <div
                key={post.title}
                className="reveal group cursor-pointer"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="card h-full flex flex-col gap-4 group-hover:border-teal/30">
                  {/* Placeholder image */}
                  <div className="h-40 rounded-xl bg-gradient-to-br from-navy to-teal-dark flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-dots opacity-30" />
                    <BookOpen size={36} className="relative z-10 text-teal/60" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-teal/10 text-teal text-xs font-semibold">{post.category}</span>
                    <span className="text-xs text-muted">{post.readTime} чтения</span>
                  </div>
                  <h3 className="font-bold text-charcoal group-hover:text-teal transition-colors leading-snug flex-1">{post.title}</h3>
                  <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-gray-50">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1 text-teal font-semibold">
                      Читать <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
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
          <h2 className="text-4xl font-black text-white mb-4 reveal">Станьте нашим<br />довольным пациентом</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto reveal delay-100">
            Запишитесь на приём и убедитесь лично в качестве нашей работы.
          </p>
          <PopupButton className="btn-white text-base py-4 px-8 reveal delay-200">
            Записаться на приём <ArrowRight size={18} />
          </PopupButton>
        </div>
      </section>
    </div>
  )
}
