import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Politique cookies – OccaSync',
  description: "Gestion des cookies et consentement",
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-12 space-y-6">
        <h1 className="text-4xl font-bold">Politique cookies</h1>
        <h2 className="text-2xl font-semibold">1. Types et finalités</h2>
        <p className="text-muted-foreground">Fonctionnels (nécessaires), performance, analytics.</p>
        <h2 className="text-2xl font-semibold">2. Durées</h2>
        <p className="text-muted-foreground">Variables selon le type de cookie et la réglementation.</p>
        <h2 className="text-2xl font-semibold">3. Consentement</h2>
        <p className="text-muted-foreground">Vous pouvez modifier vos préférences via la bannière de consentement.</p>
      </main>
      <Footer />
    </div>
  )
}
