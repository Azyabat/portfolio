import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

const VISIT_COOKIE_NAME = 'azacode_visit_logged'
const VISIT_COOKIE_MAX_AGE = 60 * 30

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const response = NextResponse.next()

  if (shouldLogVisit(request)) {
    response.cookies.set(VISIT_COOKIE_NAME, '1', {
      httpOnly: true,
      maxAge: VISIT_COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
      secure: request.nextUrl.protocol === 'https:',
    })

    event.waitUntil(sendVisitLog(request))
  }

  return response
}

function shouldLogVisit(request: NextRequest) {
  if (request.method !== 'GET') return false
  if (request.cookies.has(VISIT_COOKIE_NAME)) return false
  if (request.headers.get('next-router-prefetch')) return false
  if (request.headers.get('purpose') === 'prefetch') return false

  const accept = request.headers.get('accept') ?? ''

  return accept.includes('text/html')
}

async function sendVisitLog(request: NextRequest) {
  try {
    const response = await fetch(new URL('/api/visit', request.url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': request.headers.get('x-forwarded-for') ?? '',
        'x-real-ip': request.headers.get('x-real-ip') ?? '',
        'cf-connecting-ip': request.headers.get('cf-connecting-ip') ?? '',
      },
      body: JSON.stringify({
        path: request.nextUrl.pathname,
        origin: request.nextUrl.origin,
        referrer: request.headers.get('referer'),
        userAgent: request.headers.get('user-agent'),
        ip: request.ip,
      }),
    })

    if (!response.ok) {
      console.error('Visit API error:', response.status, await response.text())
    }
  } catch (error) {
    console.error('Visit middleware error:', error)
  }
}
