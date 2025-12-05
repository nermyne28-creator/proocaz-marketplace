import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Zap, Crown, Building2 } from 'lucide-react'

export const metadata = {
    title: 'Tarifs – ProOccaz',
    description: 'Découvrez nos offres et tarifs pour vendre et acheter des équipements professionnels d\'occasion.',
    alternates: { canonical: '/tarifs' },
}

const plans = [
    {
        name: 'Gratuit',
        icon: Zap,
        price: '0€',
        period: '/mois',
        description: 'Pour démarrer et tester la plateforme',
        features: [
            '3 annonces actives',
            'Photos standard (5 max)',
            'Messagerie intégrée',
            'Support par email',
        ],
        cta: 'Commencer gratuitement',
        highlighted: false,
    },
    {
        name: 'Pro',
        icon: Crown,
        price: '29€',
        period: '/mois',
        description: 'Pour les professionnels actifs',
        features: [
            '25 annonces actives',
            'Photos HD illimitées',
            'Mise en avant des annonces',
            'Statistiques détaillées',
            'Badge vendeur vérifié',
            'Support prioritaire',
        ],
        cta: 'Essai gratuit 14 jours',
        highlighted: true,
    },
    {
        name: 'Entreprise',
        icon: Building2,
        price: 'Sur devis',
        period: '',
        description: 'Pour les grandes entreprises',
        features: [
            'Annonces illimitées',
            'API personnalisée',
            'Gestionnaire de compte dédié',
            'Formation personnalisée',
            'Intégration ERP/CRM',
            'SLA garanti',
        ],
        cta: 'Nous contacter',
        highlighted: false,
    },
]

export default function TarifsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gradient-to-b from-primary/5 to-background py-16">
                    <div className="container text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Des tarifs <span className="text-primary">simples et transparents</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Choisissez l'offre adaptée à vos besoins. Sans engagement, évoluez à tout moment.
                        </p>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="container py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan) => (
                            <Card
                                key={plan.name}
                                className={`relative overflow-hidden transition-all hover:shadow-xl ${plan.highlighted
                                        ? 'border-primary shadow-lg scale-105 md:scale-110'
                                        : 'hover:scale-[1.02]'
                                    }`}
                            >
                                {plan.highlighted && (
                                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg">
                                        Populaire
                                    </div>
                                )}
                                <CardHeader className="text-center pb-2">
                                    <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${plan.highlighted ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                        }`}>
                                        <plan.icon className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="text-center">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-muted-foreground">{plan.period}</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <Check className="w-5 h-5 text-green-500 shrink-0" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        className="w-full"
                                        variant={plan.highlighted ? 'default' : 'outline'}
                                    >
                                        {plan.cta}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Commission Info */}
                <section className="bg-muted/50 py-16">
                    <div className="container max-w-4xl">
                        <Card>
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-bold mb-4 text-center">Commission sur les ventes</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="text-center p-6 rounded-lg bg-background">
                                        <p className="text-4xl font-bold text-primary">5%</p>
                                        <p className="text-muted-foreground mt-2">Commission standard</p>
                                        <p className="text-sm text-muted-foreground">Sur chaque transaction réussie</p>
                                    </div>
                                    <div className="text-center p-6 rounded-lg bg-background">
                                        <p className="text-4xl font-bold text-primary">3%</p>
                                        <p className="text-muted-foreground mt-2">Commission Pro & Entreprise</p>
                                        <p className="text-sm text-muted-foreground">Tarif préférentiel abonnés</p>
                                    </div>
                                </div>
                                <p className="text-center text-muted-foreground text-sm mt-6">
                                    La commission est prélevée uniquement en cas de vente réussie. Aucun frais caché.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* FAQ */}
                <section className="container py-16 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-8">Questions fréquentes</h2>
                    <div className="space-y-4">
                        {[
                            { q: 'Puis-je changer de plan à tout moment ?', a: 'Oui, vous pouvez upgrader ou downgrader votre abonnement à tout moment. Le changement prend effet immédiatement.' },
                            { q: 'Y a-t-il un engagement ?', a: 'Non, tous nos plans sont sans engagement. Vous pouvez annuler à tout moment.' },
                            { q: 'Comment fonctionne l\'essai gratuit ?', a: 'L\'essai Pro de 14 jours est sans engagement et ne nécessite pas de carte bancaire.' },
                            { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal et les virements SEPA pour les entreprises.' },
                        ].map((faq, i) => (
                            <Card key={i} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
