'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useState } from 'react'
import {
  Headphones,
  CreditCard,
  Truck,
  Shield,
  MessageSquare,
  Search,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Clock,
  ArrowRight
} from 'lucide-react'

const supportCategories = [
  {
    icon: CreditCard,
    title: 'Paiements & Facturation',
    description: 'Questions sur les paiements, remboursements, factures et commissions.',
    articles: ['Moyens de paiement acceptés', 'Délais de libération des fonds', 'Télécharger une facture']
  },
  {
    icon: Truck,
    title: 'Livraison & Expédition',
    description: 'Tout sur l\'expédition, le suivi et la réception de vos équipements.',
    articles: ['Options de livraison', 'Préparer un colis', 'Signaler un problème de livraison']
  },
  {
    icon: Shield,
    title: 'Litiges & Protection',
    description: 'Résolution de conflits, médiation et protection acheteur/vendeur.',
    articles: ['Ouvrir un litige', 'Processus de médiation', 'Garantie ProOccaz']
  },
  {
    icon: MessageSquare,
    title: 'Compte & Profil',
    description: 'Gestion de votre compte, vérification d\'entreprise et paramètres.',
    articles: ['Modifier mon profil', 'Vérifier mon SIRET', 'Supprimer mon compte']
  },
]

const faqs = [
  {
    question: 'Comment contacter un vendeur ?',
    answer: 'Depuis la page d\'une annonce, cliquez sur "Contacter le vendeur" pour envoyer un message via notre messagerie sécurisée. Le vendeur recevra une notification et pourra vous répondre directement.'
  },
  {
    question: 'Comment sont sécurisés les paiements ?',
    answer: 'Tous les paiements sont sécurisés via notre partenaire Stripe. Les fonds sont séquestrés et ne sont libérés au vendeur qu\'après confirmation de réception par l\'acheteur.'
  },
  {
    question: 'Que faire si je reçois un article endommagé ?',
    answer: 'Signalez le problème dans les 48h suivant la réception via votre espace "Transactions". Notre équipe de médiation interviendra pour trouver une solution (remboursement, retour, etc.).'
  },
  {
    question: 'Comment publier une annonce ?',
    answer: 'Connectez-vous à votre compte, cliquez sur "Déposer une annonce" et remplissez le formulaire avec photos et description. Votre annonce sera en ligne après une validation rapide.'
  },
  {
    question: 'Quels sont les frais de la plateforme ?',
    answer: 'L\'inscription et la publication d\'annonces sont gratuites. Une commission de 5% à 8% (selon le plan) est prélevée uniquement en cas de vente réussie.'
  },
]

export default function SupportPage() {
  const [query, setQuery] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(query.toLowerCase()) ||
    faq.answer.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Headphones className="w-8 h-8 text-primary" />
            </div>
            <Badge variant="outline" className="mb-4">Support</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Comment pouvons-nous vous aider ?</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
              Notre équipe support répond à vos questions du lundi au vendredi, de 9h à 18h.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher dans la FAQ..."
                className="pl-12 h-12"
              />
            </div>
          </div>
        </section>

        {/* Support Categories */}
        <section className="container py-12">
          <h2 className="text-2xl font-bold mb-8">Catégories de support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((cat, i) => (
              <Card key={i} className="hover:shadow-xl transition-all hover:border-primary/50 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <cat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{cat.description}</p>
                  <ul className="space-y-2">
                    {cat.articles.map((article, j) => (
                      <li key={j}>
                        <Link href="/aide" className="text-sm text-primary hover:underline flex items-center">
                          <ArrowRight className="w-3 h-3 mr-1" />
                          {article}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/30 py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">Questions fréquentes</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {filteredFaqs.map((faq, i) => (
                <Card key={i} className="overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold pr-4">{faq.question}</span>
                    {openFaq === i ? <ChevronUp className="w-5 h-5 shrink-0" /> : <ChevronDown className="w-5 h-5 shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <CardContent className="pt-0 pb-6 px-6">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
              {filteredFaqs.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Aucune question trouvée pour "{query}"</p>
              )}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="container py-16">
          <Card className="bg-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Besoin d'aide personnalisée ?</h2>
                  <p className="opacity-90 mb-6">
                    Notre équipe support est disponible pour vous accompagner dans toutes vos démarches sur ProOccaz.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5" />
                      <span>support@prooccaz.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      <span>+33 1 23 45 67 89</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5" />
                      <span>Lun-Ven 9h-18h</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                  <Link href="/contact">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                      Nous contacter
                    </Button>
                  </Link>
                  <Link href="/aide">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 hover:bg-white/10">
                      Centre d'aide
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  )
}
