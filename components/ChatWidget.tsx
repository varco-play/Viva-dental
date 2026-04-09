'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    'Добрый день! 👋 Я виртуальный ассистент клиники Viva Dental. Могу рассказать об услугах, ценах, врачах или помочь записаться на приём. Чем могу помочь?',
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMessage: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.filter((m) => m.role !== 'assistant' || m !== WELCOME_MESSAGE),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Ошибка сервера')
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message },
      ])
    } catch {
      setError('Не удалось получить ответ. Попробуйте ещё раз или позвоните нам.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 z-50 flex flex-col"
          style={{
            width: 'min(380px, calc(100vw - 2rem))',
            height: 'min(560px, calc(100vh - 8rem))',
            borderRadius: '1.25rem',
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            background: '#fff',
            border: '1px solid rgba(74,144,217,0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1A1A2E 0%, #16213e 100%)',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4A90D9, #2dc653)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Bot size={20} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.2 }}>
                Viva Dental
              </div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2dc653', display: 'inline-block' }} />
                Онлайн-ассистент
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                color: 'rgba(255,255,255,0.6)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s',
              }}
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              background: '#F8F9FC',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: '0.5rem',
                  alignItems: 'flex-end',
                }}
              >
                {msg.role === 'assistant' && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4A90D9, #2dc653)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginBottom: 2,
                    }}
                  >
                    <Bot size={14} color="#fff" />
                  </div>
                )}
                <div
                  style={{
                    maxWidth: '78%',
                    padding: '0.6rem 0.9rem',
                    borderRadius:
                      msg.role === 'user'
                        ? '1rem 1rem 0.25rem 1rem'
                        : '1rem 1rem 1rem 0.25rem',
                    background:
                      msg.role === 'user'
                        ? 'linear-gradient(135deg, #4A90D9, #357ABD)'
                        : '#fff',
                    color: msg.role === 'user' ? '#fff' : '#1A1A2E',
                    fontSize: '0.82rem',
                    lineHeight: 1.55,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    border: msg.role === 'assistant' ? '1px solid rgba(74,144,217,0.12)' : 'none',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: '#E8EFF7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginBottom: 2,
                    }}
                  >
                    <User size={14} color="#4A90D9" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4A90D9, #2dc653)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Bot size={14} color="#fff" />
                </div>
                <div
                  style={{
                    padding: '0.6rem 0.9rem',
                    borderRadius: '1rem 1rem 1rem 0.25rem',
                    background: '#fff',
                    border: '1px solid rgba(74,144,217,0.12)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#6B7280',
                    fontSize: '0.8rem',
                  }}
                >
                  <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />
                  Печатает...
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                style={{
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '0.75rem',
                  padding: '0.6rem 0.9rem',
                  color: '#DC2626',
                  fontSize: '0.78rem',
                }}
              >
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions — show only on first message */}
          {messages.length === 1 && (
            <div
              style={{
                padding: '0 1rem 0.75rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
                background: '#F8F9FC',
              }}
            >
              {['Цены на услуги', 'Записаться на приём', 'Режим работы', 'Удаление зуба мудрости'].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q)
                    setTimeout(() => sendMessage(), 0)
                    setMessages((prev) => [...prev, { role: 'user', content: q }])
                    setInput('')
                    setLoading(true)
                    setError(null)
                    fetch('/api/chat', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ messages: [...messages, { role: 'user', content: q }] }),
                    })
                      .then((r) => r.json())
                      .then((data) => {
                        setMessages((prev) => [...prev, { role: 'assistant', content: data.message }])
                      })
                      .catch(() => setError('Не удалось получить ответ.'))
                      .finally(() => setLoading(false))
                  }}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(74,144,217,0.35)',
                    background: '#fff',
                    color: '#4A90D9',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div
            style={{
              padding: '0.75rem 1rem',
              borderTop: '1px solid rgba(74,144,217,0.1)',
              background: '#fff',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Напишите ваш вопрос..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '0.55rem 0.9rem',
                borderRadius: '999px',
                border: '1.5px solid rgba(74,144,217,0.25)',
                outline: 'none',
                fontSize: '0.82rem',
                color: '#1A1A2E',
                background: '#F8F9FC',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4A90D9')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(74,144,217,0.25)')}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: input.trim() && !loading
                  ? 'linear-gradient(135deg, #4A90D9, #357ABD)'
                  : '#E5E7EB',
                border: 'none',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
              aria-label="Отправить"
            >
              <Send size={16} color={input.trim() && !loading ? '#fff' : '#9CA3AF'} />
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Закрыть чат' : 'Открыть чат'}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 50,
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4A90D9 0%, #357ABD 100%)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(74,144,217,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 28px rgba(74,144,217,0.6)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(74,144,217,0.45)'
        }}
      >
        {isOpen ? (
          <X size={24} color="#fff" />
        ) : (
          <MessageCircle size={24} color="#fff" />
        )}

        {/* Pulse ring — only when closed */}
        {!isOpen && (
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid rgba(74,144,217,0.5)',
              animation: 'chat-pulse 2s ease-out infinite',
            }}
          />
        )}
      </button>

      {/* Keyframe styles */}
      <style>{`
        @keyframes chat-pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
