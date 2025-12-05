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
  TrendingUp,
  Building2,
  Shield,
  Zap,
  Award,
  Globe,
  ArrowRight
} from 'lucide-react'

export const metadata = {
  title: 'ProOccaz pour les Entreprises – Solutions B2B',
  description: "Découvrez comment ProOccaz aide les entreprises à optimiser leurs achats et ventes d'équipements professionnels d'occasion.",
  alternates: { canonical: '/entreprise' },
}

const stats = [
  { value: '2 500+', label: 'Entreprises partenaires', icon: Building2 },
  { value: '15k+', label: 'Annonces actives', icon: TrendingUp },
  { value: '98%', label: 'Taux de satisfaction', icon: Award },
  { value: '70%', label: 'Économies moyennes', icon: Zap },
]

const benefits = [
  {
    icon: Shield,
    title: 'Transactions sécurisées',
    description: 'Paiement séquestré, vérification des vendeurs et protection acheteur incluse.',
  },
  {
    icon: Leaf,
    title: 'Démarche RSE',
    description: 'Participez à l\'économie circulaire et réduisez l\'empreinte carbone de votre entreprise.',
  },
  {
    icon: Zap,
    title: 'Gain de temps',
    description: 'Publiez en 2 minutes, trouvez du matériel qualifié sans perdre de temps.',
  },
  {
    icon: Users,
    title: 'Réseau B2B qualifié',
    description: 'Achetez et vendez uniquement entre professionnels vérifiés.',
  },
]

const useCases = [
  {
    title: 'Renouvellement de parc',
    description: 'Vendez votre ancien matériel et financez vos nouveaux équipements.',
    cta: 'Vendre mon matériel',
    href: '/create-listing',
  },
  {
    title: 'Achats économiques',
    description: 'Économisez jusqu\'à 70% sur vos achats de matériel professionnel.',
    cta: 'Voir le catalogue',
    href: '/search',
  },
  {
    title: 'Liquidation d\'actifs',
    description: 'Liquidez rapidement du matériel lors de fermetures ou restructurations.',
    cta: 'Nous contacter',
    href: '/contact',
  },
]

export default function EntreprisePage() {
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
            "description": "Marketplace B2B d'équipements professionnels d'occasion"
          })
        }} />

        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">Solutions Entreprises</Badge>
              <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
                ProOccaz pour les <span className="text-primary">entreprises</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                La marketplace B2B qui accélère l'économie circulaire et optimise la gestion
                des équipements professionnels de votre organisation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register">
                  <Button size="lg" className="rounded-full">
                    Créer un compte entreprise
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full">
                    Demander une démo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-3xl font-bold font-display text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-muted/30 py-16">
          <div className="container">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Avantages</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-display">Pourquoi choisir ProOccaz ?</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <Card key={i} className="hover:shadow-xl transition-all hover:border-primary/50 h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="container py-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Cas d'usage</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-display">Comment utiliser ProOccaz ?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, i) => (
              <Card key={i} className="hover:shadow-xl transition-all group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl font-bold text-primary">{i + 1}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3">{useCase.title}</h3>
                  <p className="text-muted-foreground mb-6">{useCase.description}</p>
                  <Link href={useCase.href}>
                    <Button variant="outline" className="w-full">
                      {useCase.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Global CTA */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container text-center">
            <Globe className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Rejoignez le réseau ProOccaz</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Plus de 2 500 entreprises nous font déjà confiance pour leurs transactions d'équipements d'occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="rounded-full">
                  Commencer gratuitement
                </Button>
              </Link>
              <Link href="/tarifs">
                <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/10">
                  Voir les tarifs
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
