'use client'
import { useEffect } from 'react'

export default function CookieLoader() {
  useEffect(() => {
    try {
      const prefs = JSON.parse(localStorage.getItem('cookie_prefs') || '{}')
      if (prefs.analytics) {
        window.__analytics_enabled = true
        const s = document.createElement('script')
        s.type = 'text/javascript'
        s.text = "window.__analytics_log = (msg) => { console.debug('[analytics]', msg) }"
        document.head.appendChild(s)
      }
    } catch {}
  }, [])
  return null
}

