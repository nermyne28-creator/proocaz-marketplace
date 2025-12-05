'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Cookie, Settings, BarChart3, Target, Shield, Clock, ToggleLeft } from 'lucide-react'
import { useState } from 'react'

const cookieTypes = [
  {
    icon: Shield,
    name: 'Cookies essentiels',
    description: 'Nécessaires au fonctionnement du site. Ils ne peuvent pas être désactivés.',
    examples: ['Session utilisateur', 'Panier d\'achat', 'Sécurité CSRF', 'Préférences cookies'],
    required: true,
    duration: 'Session ou 1 an',
  },
  {
    icon: Settings,
    name: 'Cookies fonctionnels',
    description: 'Améliorent l\'expérience utilisateur en mémorisant vos préférences.',
    examples: ['Langue préférée', 'Thème (clair/sombre)', 'Dernières recherches', 'Filtres favoris'],
    required: false,
    duration: '1 an',
  },
  {
    icon: BarChart3,
    name: 'Cookies analytiques',
    description: 'Nous aident à comprendre comment vous utilisez le site pour l\'améliorer.',
    examples: ['Google Analytics', 'Nombre de pages vues', 'Temps passé sur le site', 'Parcours de navigation'],
    required: false,
    duration: '13 mois',
  },
  {
    icon: Target,
    name: 'Cookies marketing',
    description: 'Utilisés pour afficher des publicités pertinentes.',
    examples: ['Retargeting', 'Publicités personnalisées', 'Suivi des conversions'],
    required: false,
    duration: '13 mois',
  },
]

export default function CookiesPage() {
  const [preferences, setPreferences] = useState({
    functional: true,
    analytics: false,
    marketing: false,
  })

  const handleSave = () => {
    // Sauvegarder les préférences dans localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
    alert('Vos préférences ont été enregistrées.')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold">Politique Cookies</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Nous utilisons des cookies pour améliorer votre expérience sur ProOccaz.
              Cette page vous explique quels cookies nous utilisons et vous permet de gérer vos préférences.
            </p>
          </div>
        </section>

        {/* What are cookies */}
        <section className="container py-8">
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Qu'est-ce qu'un cookie ?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile lorsque vous visitez un site web.
                Les cookies permettent au site de mémoriser vos actions et préférences (comme la connexion, la langue, la taille de police, etc.)
                pendant une certaine période, afin que vous n'ayez pas à les saisir à chaque visite.
              </p>
            </CardContent>
          </Card>

          {/* Cookie Types */}
          <h2 className="text-2xl font-bold mb-6">Types de cookies utilisés</h2>
          <div className="space-y-4 mb-8">
            {cookieTypes.map((cookie, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <cookie.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{cookie.name}</h3>
                          {cookie.required && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                              Obligatoire
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{cookie.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {cookie.examples.map((ex, j) => (
                            <span key={j} className="text-xs bg-muted px-2 py-1 rounded">
                              {ex}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Durée : {cookie.duration}
                        </p>
                      </div>
                    </div>
                    {!cookie.required && (
                      <button
                        onClick={() => {
                          const key = cookie.name.includes('fonctionnel') ? 'functional'
                            : cookie.name.includes('analytique') ? 'analytics'
                              : 'marketing'
                          setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
                        }}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none ${(cookie.name.includes('fonctionnel') ? preferences.functional
                            : cookie.name.includes('analytique') ? preferences.analytics
                              : preferences.marketing)
                            ? 'bg-primary'
                            : 'bg-muted'
                          }`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform ${(cookie.name.includes('fonctionnel') ? preferences.functional
                            : cookie.name.includes('analytique') ? preferences.analytics
                              : preferences.marketing)
                            ? 'translate-x-5'
                            : 'translate-x-0'
                          }`} />
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Save Preferences */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Enregistrer vos préférences</h3>
                  <p className="text-sm text-muted-foreground">
                    Vos choix seront sauvegardés et appliqués immédiatement.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setPreferences({ functional: false, analytics: false, marketing: false })}>
                    Refuser tout
                  </Button>
                  <Button variant="outline" onClick={() => setPreferences({ functional: true, analytics: true, marketing: true })}>
                    Accepter tout
                  </Button>
                  <Button onClick={handleSave}>
                    Sauvegarder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How to manage */}
        <section className="bg-muted/50 py-12 mt-8">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Comment gérer les cookies dans votre navigateur ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent' },
                { name: 'Safari', url: 'https://support.apple.com/fr-fr/guide/safari/sfri11471/mac' },
                { name: 'Microsoft Edge', url: 'https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge' },
              ].map((browser) => (
                <a
                  key={browser.name}
                  href={browser.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-background rounded-lg hover:shadow-md transition-shadow"
                >
                  <ToggleLeft className="w-5 h-5 text-primary" />
                  <span className="font-medium">{browser.name}</span>
                  <span className="text-muted-foreground text-sm ml-auto">→</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
