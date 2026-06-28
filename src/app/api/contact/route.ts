import { NextResponse } from 'next/server'
import { sendTelegramMessage } from '@/shared/lib/telegram'

type ContactRequest = {
  name?: string
  phone?: string
  message?: string
}

const MAX_FIELD_LENGTH = 1000

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
