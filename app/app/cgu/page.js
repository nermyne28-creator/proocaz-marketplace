import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'CGU – OccaSync',
  description: "Conditions Générales d’Utilisation",
  alternates: { canonical: '/cgu' },
}

export default function CGUPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-12 space-y-6">
        <h1 className="text-4xl font-bold">Conditions Générales d’Utilisation</h1>
        <h2 className="text-2xl font-semibold">1. Objet</h2>
        <p className="text-muted-foreground">Les présentes CGU régissent l’utilisation de la plateforme et des services associés.</p>
        <h2 className="text-2xl font-semibold">2. Accès</h2>
        <p className="text-muted-foreground">L’accès nécessite un compte entreprise valide et le respect des règles de sécurité.</p>
        <h2 className="text-2xl font-semibold">3. Utilisateurs</h2>
        <p className="text-muted-foreground">Acheteurs, vendeurs et administrateurs s’engagent à fournir des informations exactes.</p>
        <h2 className="text-2xl font-semibold">4. Annonces</h2>
        <p className="text-muted-foreground">Les annonces doivent décrire fidèlement les produits et respecter la réglementation.</p>
        <h2 className="text-2xl font-semibold">5. Transactions</h2>
        <p className="text-muted-foreground">Les paiements simulés ou réels sont effectués selon les modalités établies.</p>
        <h2 className="text-2xl font-semibold">6. Modération</h2>
        <p className="text-muted-foreground">OccaSync peut suspendre ou supprimer des contenus non conformes.</p>
        <h2 className="text-2xl font-semibold">7. Responsabilité</h2>
        <p className="text-muted-foreground">Dans la limite permise par la loi, OccaSync décline toute responsabilité indirecte.</p>
        <h2 className="text-2xl font-semibold">8. Litiges</h2>
        <p className="text-muted-foreground">Les litiges seront traités via une médiation avant toute action judiciaire.</p>
      </main>
      <Footer />
    </div>
  )
}
