import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Politique de confidentialité – OccaSync',
  description: "Données, droits et RGPD",
  alternates: { canonical: '/confidentialite' },
}

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-12 space-y-6">
        <h1 className="text-4xl font-bold">Politique de confidentialité</h1>
        <h2 className="text-2xl font-semibold">1. Données collectées</h2>
        <p className="text-muted-foreground">Compte, annonces, transactions, messages, logs.</p>
        <h2 className="text-2xl font-semibold">2. Finalités</h2>
        <p className="text-muted-foreground">Fourniture du service, amélioration, sécurité et conformité.</p>
        <h2 className="text-2xl font-semibold">3. Bases légales</h2>
        <p className="text-muted-foreground">Exécution du contrat, consentement, obligations légales, intérêt légitime.</p>
        <h2 className="text-2xl font-semibold">4. Durées de conservation</h2>
        <p className="text-muted-foreground">Selon la nature des données et la réglementation.</p>
        <h2 className="text-2xl font-semibold">5. Droits</h2>
        <p className="text-muted-foreground">Accès, rectification, effacement, portabilité, opposition: dpo@occasync.com</p>
        <h2 className="text-2xl font-semibold">6. Cookies</h2>
        <p className="text-muted-foreground">Voir la Politique cookies pour les préférences et le consentement.</p>
      </main>
      <Footer />
    </div>
  )
}
