import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Entreprise – OccaSync',
  description: "Notre vision, nos valeurs et notre équipe",
  alternates: { canonical: '/entreprise' },
}

export default function EntreprisePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-12 space-y-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org","@type":"Organization","name":"OccaSync","url": (process.env.NEXT_PUBLIC_BASE_URL||'http://localhost:3000'),"logo": (process.env.NEXT_PUBLIC_BASE_URL||'http://localhost:3000')+"/logo.png"
        })}} />
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">OccaSync pour les entreprises</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Marketplace B2B d'occasion qui accélère l'économie circulaire et la performance des organisations.</p>
          <div className="flex justify-center gap-4">
            <Card className="w-48"><CardContent className="p-6 text-center"><p className="text-3xl font-bold">2.5k+</p><p className="text-sm text-muted-foreground">Annonces</p></CardContent></Card>
            <Card className="w-48"><CardContent className="p-6 text-center"><p className="text-3xl font-bold">1.2k+</p><p className="text-sm text-muted-foreground">Entreprises</p></CardContent></Card>
            <Card className="w-48"><CardContent className="p-6 text-center"><p className="text-3xl font-bold">87%</p><p className="text-sm text-muted-foreground">Satisfaction</p></CardContent></Card>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-transform hover:scale-[1.01]"><CardContent className="p-6"><h2 className="text-xl font-semibold mb-2">Vision</h2><p className="text-muted-foreground">Rendre l'occasion pro aussi simple et fiable que le neuf.</p></CardContent></Card>
          <Card className="hover:shadow-xl transition-transform hover:scale-[1.01]"><CardContent className="p-6"><h2 className="text-xl font-semibold mb-2">Valeurs</h2><p className="text-muted-foreground">Transparence, durabilité, efficacité et confiance.</p></CardContent></Card>
          <Card className="hover:shadow-xl transition-transform hover:scale-[1.01]"><CardContent className="p-6"><h2 className="text-xl font-semibold mb-2">Engagements</h2><p className="text-muted-foreground">Qualité vérifiée, vendeurs professionnels, transactions sécurisées.</p></CardContent></Card>
        </section>
        <section className="text-center">
          <Button size="lg">Nous contacter</Button>
        </section>
      </main>
      <Footer />
    </div>
  )
}
