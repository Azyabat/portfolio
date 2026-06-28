'use client'
import { useEffect } from 'react'

const VISIT_STORAGE_KEY = 'azacode_visit_logged'

export const VisitTracker = () => {
  useEffect(() => {
    if (window.sessionStorage.getItem(VISIT_STORAGE_KEY)) return

    window.sessionStorage.setItem(VISIT_STORAGE_KEY, '1')

    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        path: window.location.pathname,
        origin: window.location.origin,
        referrer: document.referrer || null,
        userAgent: window.navigator.userAgent,
      }),
    }).catch(error => {
      window.sessionStorage.removeItem(VISIT_STORAGE_KEY)
      console.error('Visit tracker error:', error)
    })
  }, [])

  return null
}
