import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  Target,
  Users,
  Leaf,
  Shield,
  TrendingUp,
  Award,
  Building2,
  Handshake,
  Globe,
  CheckCircle2
} from 'lucide-react'

export const metadata = {
  title: 'À propos – ProOccaz',
  description: "Découvrez ProOccaz, la marketplace B2B n°1 pour les équipements professionnels d'occasion. Notre mission, nos valeurs et notre équipe.",
  alternates: { canonical: '/a-propos' },
}

const stats = [
  { value: '2 500+', label: 'Entreprises', icon: Building2 },
  { value: '15 000+', label: 'Annonces publiées', icon: TrendingUp },
  { value: '98%', label: 'Satisfaction client', icon: Award },
  { value: '< 48h', label: 'Temps moyen de vente', icon: Target },
]

const values = [
  {
    icon: Shield,
    title: 'Confiance & Sécurité',
    description: 'Chaque transaction est sécurisée par notre système de paiement séquestré et notre processus de vérification des vendeurs.'
  },
  {
    icon: Leaf,
    title: 'Économie Circulaire',
    description: 'Nous participons activement à la réduction de l\'empreinte carbone des entreprises en favorisant la réutilisation du matériel.'
  },
  {
    icon: Handshake,
    title: 'Transparence',
    description: 'Des prix justes, des descriptions honnêtes et une communication claire entre acheteurs et vendeurs.'
  },
  {
    icon: Globe,
    title: 'Accessibilité',
    description: 'Une plateforme simple et intuitive, accessible à toutes les entreprises quelle que soit leur taille.'
  },
]

const timeline = [
  { year: '2023', title: 'Création de ProOccaz', description: 'Lancement de la plateforme avec une vision claire : démocratiser l\'occasion pro.' },
  { year: '2024', title: 'Croissance rapide', description: 'Plus de 2 500 entreprises nous font confiance et 15 000+ annonces publiées.' },
  { year: '2025', title: 'Expansion', description: 'Ouverture vers de nouveaux secteurs et développement de services premium.' },
]

export default function AProposPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ProOccaz",
            "url": "https://prooccaz.com",
            "logo": "https://prooccaz.com/logo.png",
            "description": "Marketplace B2B d'équipements professionnels d'occasion",
            "foundingDate": "2023"
          })
        }} />

        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">À propos</Badge>
              <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
                La marketplace B2B qui donne une
                <span className="text-primary"> seconde vie</span> aux équipements pro
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                ProOccaz facilite l'achat et la vente de matériel professionnel d'occasion entre entreprises,
                avec une approche sécurisée et qualitative.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-3xl font-bold font-display text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="bg-muted/30 py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">Notre Mission</Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                  Rendre l'occasion pro aussi simple et fiable que le neuf
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Nous croyons que chaque équipement professionnel mérite une seconde vie.
                  En connectant les entreprises qui vendent à celles qui achètent, nous créons
                  une économie plus responsable tout en permettant à chacun de réaliser des économies significatives.
                </p>
                <div className="space-y-3">
                  {['Vendeurs vérifiés et professionnels', 'Paiements 100% sécurisés', 'Support dédié 7j/7', 'Garantie satisfaction'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <Target className="w-24 h-24 text-primary mx-auto mb-4" />
                    <p className="text-2xl font-bold">Économie circulaire</p>
                    <p className="text-muted-foreground">Pour les entreprises responsables</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="container py-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Nos Valeurs</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-display">Ce qui nous guide au quotidien</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <Card key={i} className="hover:shadow-xl transition-all hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-muted/30 py-16">
          <div className="container">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Notre Histoire</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-display">L'aventure ProOccaz</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {item.year.slice(-2)}
                    </div>
                    {i < timeline.length - 1 && <div className="w-0.5 h-full bg-primary/20 mt-2" />}
                  </div>
                  <div className="pb-8">
                    <p className="text-sm text-primary font-medium">{item.year}</p>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à rejoindre l'aventure ?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Rejoignez les milliers d'entreprises qui font confiance à ProOccaz pour leurs achats et ventes d'équipements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="rounded-full">Créer un compte gratuit</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full">Nous contacter</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
