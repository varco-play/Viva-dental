'use client'
import { useState, useEffect } from 'react'
import { X, CheckCircle, Loader2 } from 'lucide-react'

export default function InquiryPopup() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-inquiry-popup', handler)
    return () => window.removeEventListener('open-inquiry-popup', handler)
  }, [])

  const close = () => {
    setOpen(false)
    setTimeout(() => setStatus('idle'), 300)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', phone: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in-95 duration-200">
        <button onClick={close} className="absolute top-4 right-4 text-gray-400 hover:text-charcoal transition-colors">
          <X size={22} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-charcoal mb-2">Заявка отправлена!</h3>
            <p className="text-muted">Мы свяжемся с вами в ближайшее время.</p>
            <button onClick={close} className="btn-primary mt-6">Закрыть</button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-charcoal">Записаться на приём</h2>
              <p className="text-muted text-sm mt-1">Оставьте заявку — мы перезвоним и подберём удобное время</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Ваше имя *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Иван Иванов"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Телефон *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@mail.ru"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Сообщение</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Опишите кратко вашу ситуацию или выберите услугу..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm">Ошибка отправки. Попробуйте ещё раз или позвоните нам.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3"
              >
                {status === 'loading' ? (
                  <><Loader2 size={18} className="animate-spin" /> Отправка...</>
                ) : 'Отправить заявку'}
              </button>

              <p className="text-xs text-muted text-center">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
