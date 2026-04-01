import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, phone, email, message } = await req.json()

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }

    // If email credentials not set, just log and return success (dev mode)
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
      console.log('📬 New inquiry (email not configured):', { name, phone, email, message })
      return NextResponse.json({ ok: true })
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Новая заявка с сайта Viva Dental — ${name}`,
      html: `
        <h2>Новая заявка с сайта</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
          <tr><td style="padding:8px;font-weight:bold;width:140px;">Имя:</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Телефон:</td><td style="padding:8px;"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${email || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Сообщение:</td><td style="padding:8px;">${message || '—'}</td></tr>
        </table>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
