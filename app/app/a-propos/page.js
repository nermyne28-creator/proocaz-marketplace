import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'À propos – OccaSync',
  description: "Histoire et différence sur le marché B2B d'occasion",
  alternates: { canonical: '/a-propos' },
}

export default function AProposPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-12 space-y-8">
        <h1 className="text-4xl font-bold">À propos d'OccaSync</h1>
        <p className="text-muted-foreground max-w-2xl">Nous facilitons l'achat et la vente de matériel professionnel d'occasion avec une approche qualitative et sécurisée.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card><CardContent className="p-6"><h2 className="text-xl font-semibold mb-2">Notre histoire</h2><p className="text-muted-foreground">Née de la volonté de réduire les coûts et l'empreinte carbone des entreprises.</p></CardContent></Card>
          <Card><CardContent className="p-6"><h2 className="text-xl font-semibold mb-2">Pourquoi nous</h2><p className="text-muted-foreground">Sélection de vendeurs pro, modération des annonces et outils de transaction.</p></CardContent></Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

