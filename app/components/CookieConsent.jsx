'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [prefs, setPrefs] = useState({ functional: true, analytics: false })
  useEffect(() => {
    const saved = localStorage.getItem('cookie_prefs')
    if (!saved) setOpen(true)
    else setPrefs(JSON.parse(saved))
  }, [])
  const save = () => {
    localStorage.setItem('cookie_prefs', JSON.stringify(prefs))
    setOpen(false)
  }
  if (!open) return null
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 max-w-lg bg-background border rounded-lg shadow-lg p-4">
      <p className="text-sm text-muted-foreground mb-3">Nous utilisons des cookies pour améliorer votre expérience. Choisissez vos préférences.</p>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm">Fonctionnels</span>
        <input type="checkbox" checked={prefs.functional} onChange={(e) => setPrefs({ ...prefs, functional: e.target.checked })} />
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm">Analytics</span>
        <input type="checkbox" checked={prefs.analytics} onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })} />
      </div>
      <div className="flex gap-2">
        <Button onClick={save}>Enregistrer</Button>
        <Button variant="outline" onClick={() => { setPrefs({ functional: true, analytics: false }); save() }}>Tout refuser</Button>
        <Button variant="outline" onClick={() => { setPrefs({ functional: true, analytics: true }); save() }}>Tout accepter</Button>
      </div>
    </div>
  )
}

