import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

type ContactRequest = {
  name?: string
  phone?: string
  message?: string
}

const MAX_FIELD_LENGTH = 1000

function getRequiredEnv(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing env ${name}`)
  }

  return value
}

function sanitizeField(value: unknown) {
  if (typeof value !== 'string') return ''

  return value.trim().slice(0, MAX_FIELD_LENGTH)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function getContactHtml({ name, phone, message }: Required<ContactRequest>) {
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

  return `
    <h2>Новая заявка с сайта azacode.ru</h2>
    <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
    <p><strong>Контакт:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Сообщение:</strong></p>
    <p>${safeMessage}</p>
  `
}

function getContactText({ name, phone, message }: Required<ContactRequest>) {
  return [
    'Новая заявка с сайта azacode.ru',
    '',
    `Имя: ${name}`,
    `Контакт: ${phone}`,
    '',
    'Сообщение:',
    message,
  ].join('\n')
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequest
    const name = sanitizeField(body.name)
    const phone = sanitizeField(body.phone)
    const message = sanitizeField(body.message) || 'Сообщение не указано'

    if (!name || !phone) {
      return NextResponse.json({ message: 'Укажите имя и контакт для связи' }, { status: 400 })
    }

    const smtpPort = Number(process.env.SMTP_PORT ?? 465)
    const smtpFrom = process.env.SMTP_FROM ?? getRequiredEnv('SMTP_USER')
    const contactEmailTo = process.env.CONTACT_EMAIL_TO ?? 'azamatsalkaev@gmail.com'

    const transporter = nodemailer.createTransport({
      host: getRequiredEnv('SMTP_HOST'),
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: getRequiredEnv('SMTP_USER'),
        pass: getRequiredEnv('SMTP_PASSWORD'),
      },
    })

    await transporter.sendMail({
      from: smtpFrom,
      to: contactEmailTo,
      replyTo: smtpFrom,
      subject: `Новая заявка от ${name}`,
      text: getContactText({ name, phone, message }),
      html: getContactHtml({ name, phone, message }),
    })

    return NextResponse.json({ message: 'Заявка отправлена' })
  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json({ message: 'Не удалось отправить заявку' }, { status: 500 })
  }
}
