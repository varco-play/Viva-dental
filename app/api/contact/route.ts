import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, phone, email, message } = await req.json()

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fbff; border-radius: 12px;">
        <div style="background: linear-gradient(135deg, #0C1C3A, #1A4FA0); border-radius: 10px; padding: 20px 24px; margin-bottom: 24px;">
          <h2 style="color: white; margin: 0; font-size: 20px;">🦷 Новая заявка — Viva Dental</h2>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 120px;">Имя:</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: bold; font-size: 15px;">${escapeHtml(name)}</td>
          </tr>
          <tr style="border-top: 1px solid #e2e8f0;">
            <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Телефон:</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: bold; font-size: 15px;">${escapeHtml(phone)}</td>
          </tr>
          ${email ? `
          <tr style="border-top: 1px solid #e2e8f0;">
            <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Email:</td>
            <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">${escapeHtml(email)}</td>
          </tr>` : ''}
          ${message ? `
          <tr style="border-top: 1px solid #e2e8f0;">
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; vertical-align: top;">Сообщение:</td>
            <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">${escapeHtml(message)}</td>
          </tr>` : ''}
        </table>
        <div style="margin-top: 20px; padding: 12px 16px; background: #eff6ff; border-radius: 8px; color: #1e40af; font-size: 13px;">
          📅 ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })} (Ташкент)
        </div>
      </div>
    `

    const { error } = await resend.emails.send({
      from:    'Viva Dental <onboarding@resend.dev>',
      to:      ['saidkarimovsarvar27@gmail.com'],
      subject: `🦷 Новая заявка: ${name} — ${phone}`,
      html,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
    }

    // Also try Telegram if configured
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId   = process.env.TELEGRAM_CHAT_ID
    if (botToken && chatId) {
      const tgText = `🎯 <b>Новая заявка с сайта Viva Dental</b>\n\n<b>Имя:</b> ${escapeHtml(name)}\n<b>Телефон:</b> <code>${escapeHtml(phone)}</code>\n<b>Email:</b> ${email ? escapeHtml(email) : '—'}\n<b>Сообщение:</b> ${message ? escapeHtml(message) : '—'}\n\n📅 ${new Date().toLocaleString('ru-RU')}`
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: tgText, parse_mode: 'HTML' }),
      }).catch(() => {}) // fire-and-forget, don't fail the response
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
