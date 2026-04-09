'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send, Bot, User, Phone } from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant'
  content: string
}

// ─── Constants ─────────────────────────────────────────────────────────────
const WELCOME: Message = {
  role: 'assistant',
  content:
    'Добрый день! Я виртуальный ассистент клиники Viva Dental. Могу рассказать об услугах, ценах, врачах или помочь записаться на приём. Чем могу помочь?',
}

const QUICK_SUGGESTIONS = [
  'Цены на услуги',
  'Записаться на приём',
  'Режим работы',
  'Удаление зуба мудрости',
]

// ─── Typing Dots Component ─────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
      {/* Bot avatar */}
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
      {/* Animated dots bubble */}
      <div
        style={{
          padding: '0.65rem 1rem',
          borderRadius: '1rem 1rem 1rem 0.25rem',
          background: '#fff',
          border: '1px solid rgba(74,144,217,0.12)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#4A90D9',
              display: 'inline-block',
              animation: `chatDotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Message Bubble ────────────────────────────────────────────────────────
function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        gap: '0.5rem',
        alignItems: 'flex-end',
      }}
    >
      {!isUser && (
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
          borderRadius: isUser
            ? '1rem 1rem 0.25rem 1rem'
            : '1rem 1rem 1rem 0.25rem',
          background: isUser
            ? 'linear-gradient(135deg, #4A90D9, #357ABD)'
            : '#fff',
          color: isUser ? '#fff' : '#1A1A2E',
          fontSize: '0.82rem',
          lineHeight: 1.55,
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          border: !isUser ? '1px solid rgba(74,144,217,0.12)' : 'none',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {msg.content}
      </div>
      {isUser && (
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
  )
}

// ─── Main Widget ───────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150)
  }, [isOpen])

  // ─── Core send function ─────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || loading) return

      const userMsg: Message = { role: 'user', content: trimmed }

      // Optimistically add user message
      setMessages((prev) => [...prev, userMsg])
      setInput('')
      setLoading(true)
      setErrorMsg(null)

      try {
        // Build the history to send — include everything so far + new user msg
        const history = [...messages, userMsg]

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        })

        const data = await res.json()

        // API returned an error field (our own structured errors)
        if (data.error) {
          setErrorMsg(data.error)
          return
        }

        if (!res.ok || !data.message) {
          setErrorMsg('Не удалось получить ответ. Позвоните нам: +998 (71) 123-45-67')
          return
        }

        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.message },
        ])
      } catch {
        setErrorMsg(
          'Нет соединения. Проверьте интернет или позвоните: +998 (71) 123-45-67'
        )
      } finally {
        setLoading(false)
      }
    },
    [loading, messages]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const showSuggestions = messages.length === 1 && !loading

  return (
    <>
      {/* ── Chat window ───────────────────────────────────────────────── */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '1.5rem',
            zIndex: 50,
            width: 'min(380px, calc(100vw - 2rem))',
            height: 'min(560px, calc(100vh - 8rem))',
            borderRadius: '1.25rem',
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            background: '#fff',
            border: '1px solid rgba(74,144,217,0.15)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
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
              <div
                style={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  lineHeight: 1.2,
                }}
              >
                Viva Dental
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '0.72rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#2dc653',
                    display: 'inline-block',
                  }}
                />
                Онлайн-ассистент
              </div>
            </div>
            {/* Phone shortcut */}
            <a
              href="tel:+998711234567"
              title="Позвонить"
              style={{
                color: 'rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                marginRight: 4,
              }}
            >
              <Phone size={16} />
            </a>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                color: 'rgba(255,255,255,0.6)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages area */}
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
              <MessageBubble key={i} msg={msg} />
            ))}

            {/* Animated typing dots while waiting */}
            {loading && <TypingDots />}

            {/* Error message */}
            {errorMsg && !loading && (
              <div
                style={{
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '0.75rem',
                  padding: '0.6rem 0.9rem',
                  color: '#DC2626',
                  fontSize: '0.78rem',
                  lineHeight: 1.5,
                }}
              >
                {errorMsg}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestion chips — only before first user message */}
          {showSuggestions && (
            <div
              style={{
                padding: '0 1rem 0.75rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
                background: '#F8F9FC',
              }}
            >
              {QUICK_SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(74,144,217,0.35)',
                    background: '#fff',
                    color: '#4A90D9',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
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
                background: loading ? '#F3F4F6' : '#F8F9FC',
                transition: 'border-color 0.2s',
                cursor: loading ? 'not-allowed' : 'text',
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = '#4A90D9')
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(74,144,217,0.25)')
              }
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              aria-label="Отправить"
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background:
                  input.trim() && !loading
                    ? 'linear-gradient(135deg, #4A90D9, #357ABD)'
                    : '#E5E7EB',
                border: 'none',
                cursor:
                  input.trim() && !loading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              <Send
                size={16}
                color={input.trim() && !loading ? '#fff' : '#9CA3AF'}
              />
            </button>
          </div>
        </div>
      )}

      {/* ── Floating trigger button ───────────────────────────────────── */}
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
          const b = e.currentTarget
          b.style.transform = 'scale(1.08)'
          b.style.boxShadow = '0 6px 28px rgba(74,144,217,0.6)'
        }}
        onMouseLeave={(e) => {
          const b = e.currentTarget
          b.style.transform = 'scale(1)'
          b.style.boxShadow = '0 4px 20px rgba(74,144,217,0.45)'
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
              animation: 'chatPulse 2s ease-out infinite',
              pointerEvents: 'none',
            }}
          />
        )}
      </button>

      {/* ── Global keyframes ──────────────────────────────────────────── */}
      <style>{`
        @keyframes chatPulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        @keyframes chatDotBounce {
          0%, 60%, 100% { transform: translateY(0);    opacity: 0.5; }
          30%            { transform: translateY(-6px); opacity: 1;   }
        }
      `}</style>
    </>
  )
}
