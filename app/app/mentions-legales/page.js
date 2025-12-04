import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Mentions légales – OccaSync',
  description: "Informations éditeur et hébergeur",
  alternates: { canonical: '/mentions-legales' },
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-12 space-y-6">
        <h1 className="text-4xl font-bold">Mentions légales</h1>
        <h2 className="text-2xl font-semibold">Éditeur</h2>
        <p className="text-muted-foreground">OccaSync SAS – SIRET: 123 456 789 00010 – Siège: 10 Rue Exemple, 75000 Paris</p>
        <h2 className="text-2xl font-semibold">Hébergeur</h2>
        <p className="text-muted-foreground">Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
        <h2 className="text-2xl font-semibold">Publication</h2>
        <p className="text-muted-foreground">Directeur: John Doe — Contact: legal@occasync.com</p>
      </main>
      <Footer />
    </div>
  )
}
