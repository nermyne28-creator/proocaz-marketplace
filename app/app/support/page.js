import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Support – OccaSync',
  description: "Obtenez de l'aide pour vos transactions",
  alternates: { canonical: '/support' },
}

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-12 space-y-6">
        <h1 className="text-4xl font-bold">Support</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-xl transition-transform hover:scale-[1.01]"><CardContent className="p-6"><h2 className="text-lg font-semibold mb-2">Paiements</h2><p className="text-muted-foreground">Questions sur la facturation et le paiement.</p></CardContent></Card>
          <Card className="hover:shadow-xl transition-transform hover:scale-[1.01]"><CardContent className="p-6"><h2 className="text-lg font-semibold mb-2">Livraison</h2><p className="text-muted-foreground">Expédition et réception des équipements.</p></CardContent></Card>
          <Card className="hover:shadow-xl transition-transform hover:scale-[1.01]"><CardContent className="p-6"><h2 className="text-lg font-semibold mb-2">Litiges</h2><p className="text-muted-foreground">Résolution et médiation.</p></CardContent></Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
