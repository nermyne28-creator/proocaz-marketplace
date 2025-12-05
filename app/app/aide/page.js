'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Search, ShoppingBag, Package, CreditCard, MessageSquare, Shield, Settings, HelpCircle, ChevronRight, Users, Truck } from 'lucide-react'
import Link from 'next/link'

const categories = [
  {
    icon: Users,
    title: 'Premiers pas',
    description: 'Créer un compte et bien démarrer',
    articles: [
      { title: 'Créer un compte professionnel', slug: 'creer-compte' },
      { title: 'Vérifier son entreprise (SIRET)', slug: 'verifier-entreprise' },
      { title: 'Compléter son profil vendeur', slug: 'profil-vendeur' },
      { title: 'Comprendre le tableau de bord', slug: 'tableau-bord' },
    ]
  },
  {
    icon: ShoppingBag,
    title: 'Acheter',
    description: 'Trouver et acheter des équipements',
    articles: [
      { title: 'Rechercher un équipement', slug: 'rechercher-equipement' },
      { title: 'Utiliser les filtres avancés', slug: 'filtres-recherche' },
      { title: 'Contacter un vendeur', slug: 'contacter-vendeur' },
      { title: 'Faire une offre de prix', slug: 'faire-offre' },
      { title: 'Vérifier l\'état d\'un produit', slug: 'verifier-etat' },
    ]
  },
  {
    icon: Package,
    title: 'Vendre',
    description: 'Publier et gérer vos annonces',
    articles: [
      { title: 'Créer une annonce efficace', slug: 'creer-annonce' },
      { title: 'Prendre de bonnes photos', slug: 'photos-annonce' },
      { title: 'Fixer le bon prix', slug: 'fixer-prix' },
      { title: 'Répondre aux acheteurs', slug: 'repondre-acheteurs' },
      { title: 'Modifier ou supprimer une annonce', slug: 'modifier-annonce' },
    ]
  },
  {
    icon: CreditCard,
    title: 'Paiements',
    description: 'Tout sur les transactions',
    articles: [
      { title: 'Moyens de paiement acceptés', slug: 'moyens-paiement' },
      { title: 'Sécurité des paiements', slug: 'securite-paiements' },
      { title: 'Délais de libération des fonds', slug: 'liberation-fonds' },
      { title: 'Facturation et TVA', slug: 'facturation-tva' },
      { title: 'Demander un remboursement', slug: 'remboursement' },
    ]
  },
  {
    icon: Truck,
    title: 'Livraison',
    description: 'Expédition et transport',
    articles: [
      { title: 'Options de livraison', slug: 'options-livraison' },
      { title: 'Préparer un colis', slug: 'preparer-colis' },
      { title: 'Suivi de livraison', slug: 'suivi-livraison' },
      { title: 'Transport d\'équipements lourds', slug: 'transport-lourd' },
      { title: 'Problème de livraison', slug: 'probleme-livraison' },
    ]
  },
  {
    icon: Shield,
    title: 'Sécurité & Litiges',
    description: 'Protection et résolution',
    articles: [
      { title: 'Protection acheteur', slug: 'protection-acheteur' },
      { title: 'Signaler une annonce', slug: 'signaler-annonce' },
      { title: 'Ouvrir un litige', slug: 'ouvrir-litige' },
      { title: 'Processus de médiation', slug: 'mediation' },
      { title: 'Éviter les arnaques', slug: 'eviter-arnaques' },
    ]
  },
]

const popularArticles = [
  { title: 'Comment créer une annonce qui vend ?', views: '12.4k vues' },
  { title: 'Délais de paiement : tout comprendre', views: '8.2k vues' },
  { title: 'Vérifier la fiabilité d\'un vendeur', views: '7.8k vues' },
  { title: 'Que faire si mon colis est endommagé ?', views: '5.3k vues' },
]

export default function AidePage() {
  const [query, setQuery] = useState('')

  const filteredCategories = categories.map(cat => ({
    ...cat,
    articles: cat.articles.filter(a =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      cat.title.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(cat => cat.articles.length > 0 || query === '')

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero with Search */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container text-center">
            <HelpCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Comment pouvons-nous vous aider ?
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Trouvez rapidement des réponses à vos questions sur l'utilisation de ProOccaz.
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher dans l'aide (ex: créer annonce, paiement, livraison...)"
                className="pl-12 py-6 text-lg"
              />
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="container py-8">
          <h2 className="text-lg font-semibold mb-4">📈 Articles populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularArticles.map((article, i) => (
              <Card key={i} className="hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer">
                <CardContent className="p-4">
                  <p className="font-medium text-sm mb-1">{article.title}</p>
                  <p className="text-xs text-muted-foreground">{article.views}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <section className="container py-8">
          <h2 className="text-2xl font-bold mb-6">Parcourir par catégorie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category, i) => (
              <Card key={i} className="hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {category.articles.slice(0, 4).map((article, j) => (
                      <li key={j}>
                        <Link
                          href={`/aide/${article.slug}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                        >
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {category.articles.length > 4 && (
                    <p className="text-sm text-primary mt-3 font-medium">
                      +{category.articles.length - 4} autres articles
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-muted/50 py-12 mt-8">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <MessageSquare className="w-12 h-12" />
                    <div>
                      <h3 className="text-xl font-bold">Vous n'avez pas trouvé de réponse ?</h3>
                      <p className="opacity-90">Notre équipe support répond sous 24h.</p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors shrink-0"
                  >
                    Contacter le support
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
