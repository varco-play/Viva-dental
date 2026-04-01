'use client'
import { useState, useEffect, useRef } from 'react'
import { X, CheckCircle, Loader2, Phone, Mail, User, MessageSquare, Sparkles } from 'lucide-react'

export default function InquiryPopup() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const firstInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = () => {
      setOpen(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    }
    window.addEventListener('open-inquiry-popup', handler)
    return () => window.removeEventListener('open-inquiry-popup', handler)
  }, [])

  useEffect(() => {
    if (visible && firstInput.current) {
      setTimeout(() => firstInput.current?.focus(), 300)
    }
  }, [visible])

  // Trap body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => {
    setVisible(false)
    setTimeout(() => {
      setOpen(false)
      setStatus('idle')
    }, 300)
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

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

  const inputClass = `w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm
    focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal
    transition-all duration-200 bg-white placeholder:text-gray-300`

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-navy/70 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={close}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transition-all duration-300 ${
          visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Gradient header band */}
        <div className="h-1.5 w-full bg-gradient-teal" />

        <div className="p-8">
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-charcoal transition-all duration-200"
          >
            <X size={16} />
          </button>

          {status === 'success' ? (
            <div className="text-center py-8 animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-gradient-teal flex items-center justify-center mx-auto mb-5 shadow-teal">
                <CheckCircle size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-charcoal mb-2">Заявка отправлена!</h3>
              <p className="text-muted mb-6">Мы свяжемся с вами в течение 30 минут в рабочее время.</p>
              <button onClick={close} className="btn-primary">Отлично, закрыть</button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-teal text-sm font-semibold mb-2">
                  <Sparkles size={14} />
                  Запись онлайн
                </div>
                <h2 className="text-2xl font-black text-charcoal">Записаться на приём</h2>
                <p className="text-muted text-sm mt-1">Оставьте заявку — перезвоним и подберём удобное время</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name */}
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                  <input
                    ref={firstInput}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Ваше имя *"
                    className={inputClass}
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+7 (___) ___-__-__ *"
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email (необязательно)"
                    className={inputClass}
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-3 top-3.5 text-gray-300 pointer-events-none" />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Опишите вашу ситуацию или выберите услугу..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <div className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">
                    Ошибка отправки. Попробуйте ещё раз или позвоните нам.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center py-3.5 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <><Loader2 size={18} className="animate-spin" /> Отправка...</>
                  ) : 'Отправить заявку'}
                </button>

                <p className="text-xs text-muted text-center">
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <a href="#" className="text-teal hover:underline">обработкой персональных данных</a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
