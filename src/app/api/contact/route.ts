import { NextResponse } from 'next/server'

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

function getContactText({ name, phone, message }: Required<ContactRequest>) {
  return [
    'Новая заявка с azacode.ru',
    '',
    `Имя: ${name}`,
    `Контакт: ${phone}`,
    '',
    'Сообщение:',
    message,
  ].join('\n')
}

async function sendTelegramMessage(text: string) {
  const token = getRequiredEnv('TELEGRAM_BOT_TOKEN')
  const chatId = getRequiredEnv('TELEGRAM_CHAT_ID')

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()

    throw new Error(`Telegram API error: ${response.status} ${errorText}`)
  }
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

    await sendTelegramMessage(getContactText({ name, phone, message }))

    return NextResponse.json({ message: 'Заявка отправлена' })
  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json({ message: 'Не удалось отправить заявку' }, { status: 500 })
  }
}
