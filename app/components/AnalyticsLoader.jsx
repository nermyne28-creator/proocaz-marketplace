'use client'
import { useEffect } from 'react'

export default function AnalyticsLoader() {
  useEffect(() => {
    try {
      const prefs = JSON.parse(localStorage.getItem('cookie_prefs') || '{}')
      const id = process.env.NEXT_PUBLIC_GA_ID
      if (prefs.analytics && id) {
        const s = document.createElement('script')
        s.async = true
        s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
        document.head.appendChild(s)
        const cfg = document.createElement('script')
        cfg.innerHTML = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${id}', { anonymize_ip: true });`
        document.head.appendChild(cfg)
      }
    } catch {}
  }, [])
  return null
}

