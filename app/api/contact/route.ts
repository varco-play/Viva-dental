import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, phone, email, message } = await req.json()

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    // Get Telegram credentials
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    // If Telegram not configured, log and return success (dev mode)
    if (!botToken || !chatId) {
      console.log('📬 New inquiry (Telegram not configured):', {
        name,
        phone,
        email,
        message,
      })
      return NextResponse.json({ ok: true })
    }

    // Format message for Telegram
    const telegramMessage = `
🎯 <b>Новая заявка с сайта Viva Dental</b>

<b>Имя:</b> ${escapeHtml(name)}
<b>Телефон:</b> <code>${escapeHtml(phone)}</code>
<b>Email:</b> ${email ? escapeHtml(email) : '—'}
<b>Сообщение:</b> ${message ? escapeHtml(message) : '—'}

📅 Время: ${new Date().toLocaleString('ru-RU')}
    `.trim()

    // Send to Telegram
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      }
    )

    // Handle Telegram errors
    if (!telegramRes.ok) {
      const errBody = await telegramRes.json().catch(() => ({}))
      console.error('[contact] Telegram API error:', errBody)

      return NextResponse.json(
        { error: 'Failed to send message to Telegram' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Escape HTML special characters for Telegram's HTML parse mode
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
