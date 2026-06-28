import { NextResponse } from 'next/server'
import { sendTelegramMessage } from '@/shared/lib/telegram'

type VisitRequest = {
  path?: string
  origin?: string
  referrer?: string | null
  userAgent?: string | null
  ip?: string
}

type GeoResponse = {
  success: boolean
  city?: string
  region?: string
  country?: string
  latitude?: number
  longitude?: number
  connection?: {
    isp?: string
  }
}

type GeoInfo = {
  location: string
  coordinates?: string
  isp?: string
}

const GEO_TIMEOUT_MS = 1600

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as VisitRequest
    const ip = getClientIp(request, body.ip)
    const userAgent = body.userAgent || request.headers.get('user-agent') || 'Неизвестно'
    const geo = await getGeoInfo(ip)

    await sendTelegramMessage(getVisitMessage({ request: body, ip, userAgent, geo }))

    return NextResponse.json({ message: 'Visit logged' })
  } catch (error) {
    console.error('Visit route error:', error)

    return NextResponse.json({ message: 'Visit was not logged' }, { status: 500 })
  }
}

function getClientIp(request: Request, fallbackIp?: string) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()

  return (
    forwardedFor ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    fallbackIp ||
    'Неизвестно'
  )
}

async function getGeoInfo(ip: string): Promise<GeoInfo | null> {
  if (isPrivateIp(ip)) return null

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), GEO_TIMEOUT_MS)

  try {
    const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}?lang=ru`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })

    if (!response.ok) return null

    const data = (await response.json()) as GeoResponse

    if (!data.success) return null

    return {
      location: [data.city, data.region, data.country].filter(Boolean).join(', '),
      coordinates:
        typeof data.latitude === 'number' && typeof data.longitude === 'number'
          ? `${data.latitude}, ${data.longitude}`
          : undefined,
      isp: data.connection?.isp,
    }
  } catch {
    return null
  } finally {
    clearTimeout(timeoutId)
  }
}

function isPrivateIp(ip: string) {
  return (
    ip === 'Неизвестно' ||
    ip === '::1' ||
    ip.startsWith('127.') ||
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
  )
}

function getVisitMessage({
  request,
  ip,
  userAgent,
  geo,
}: {
  request: VisitRequest
  ip: string
  userAgent: string
  geo: GeoInfo | null
}) {
  const visitedAt = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Europe/Moscow',
  }).format(new Date())

  const pageUrl = `${request.origin ?? 'https://azacode.ru'}${request.path ?? '/'}`
  const referrer = request.referrer || 'Прямой заход'

  return [
    'Новое посещение azacode.ru',
    '',
    `Время: ${visitedAt} МСК`,
    `Страница: ${pageUrl}`,
    `Источник: ${referrer}`,
    '',
    `IP: ${ip}`,
    `Гео: ${geo?.location || 'Не определено'}`,
    geo?.coordinates ? `Координаты: ${geo.coordinates}` : null,
    geo?.isp ? `Провайдер: ${geo.isp}` : null,
    '',
    `Браузер: ${getBrowser(userAgent)}`,
    `Устройство: ${getDevice(userAgent)}`,
    `ОС: ${getOs(userAgent)}`,
    '',
    `User-Agent: ${userAgent}`,
  ]
    .filter(Boolean)
    .join('\n')
}

function getBrowser(userAgent: string) {
  if (/Edg\//.test(userAgent)) return 'Microsoft Edge'
  if (/OPR\//.test(userAgent)) return 'Opera'
  if (/YaBrowser\//.test(userAgent)) return 'Яндекс Браузер'
  if (/Firefox\//.test(userAgent)) return 'Firefox'
  if (/CriOS\//.test(userAgent)) return 'Chrome iOS'
  if (/Chrome\//.test(userAgent)) return 'Chrome'
  if (/Safari\//.test(userAgent)) return 'Safari'

  return 'Неизвестно'
}

function getDevice(userAgent: string) {
  if (/iPad|Tablet/i.test(userAgent)) return 'Планшет'
  if (/Mobi|Android|iPhone|iPod/i.test(userAgent)) return 'Телефон'

  return 'Компьютер'
}

function getOs(userAgent: string) {
  if (/Windows NT/i.test(userAgent)) return 'Windows'
  if (/Mac OS X/i.test(userAgent)) return 'macOS'
  if (/Android/i.test(userAgent)) return 'Android'
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS'
  if (/Linux/i.test(userAgent)) return 'Linux'

  return 'Неизвестно'
}
