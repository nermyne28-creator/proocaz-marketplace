'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Mail, MapPin, Phone, Clock, Send, MessageSquare, Building2 } from 'lucide-react'

export default function ContactPage() {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      subject: form.get('subject'),
      message: form.get('message'),
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok) toast.success('Message envoyé avec succès !'); else toast.error(data.error || 'Erreur')
      e.currentTarget.reset()
    } catch {
      toast.error('Erreur réseau')
    }
  }

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
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+33 1 23 45 67 89",
              "contactType": "customer service",
              "email": "contact@prooccaz.com",
              "availableLanguage": ["French"]
            }
          })
        }} />

        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container text-center">
            <Badge variant="outline" className="mb-4">Contact</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Contactez-nous</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Notre équipe est à votre disposition pour répondre à toutes vos questions sur la plateforme ProOccaz.
            </p>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:contact@prooccaz.com" className="text-primary hover:underline">contact@prooccaz.com</a>
                    <p className="text-sm text-muted-foreground mt-1">Réponse sous 24h</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Téléphone</h3>
                    <a href="tel:+33123456789" className="text-primary hover:underline">+33 1 23 45 67 89</a>
                    <p className="text-sm text-muted-foreground mt-1">Lun-Ven 9h-18h</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <p className="text-foreground">10 Rue de la Tech</p>
                    <p className="text-muted-foreground">75008 Paris, France</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Horaires</h3>
                    <p className="text-muted-foreground">Lundi - Vendredi</p>
                    <p className="text-foreground font-medium">9h00 - 18h00</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MessageSquare className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Envoyez-nous un message</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Nom complet *</label>
                        <Input id="name" name="name" placeholder="Jean Dupont" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email professionnel *</label>
                        <Input id="email" name="email" type="email" placeholder="jean@entreprise.com" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">Entreprise</label>
                      <Input id="company" name="company" placeholder="Votre Entreprise SAS" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Sujet *</label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="question">Question générale</option>
                        <option value="support">Support technique</option>
                        <option value="commercial">Demande commerciale</option>
                        <option value="partenariat">Partenariat</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                        placeholder="Décrivez votre demande en détail..."
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="bg-muted/50 py-12">
          <div className="container text-center">
            <h2 className="text-2xl font-bold mb-4">Vous avez une question ?</h2>
            <p className="text-muted-foreground mb-6">Consultez notre centre d'aide pour des réponses rapides.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/aide">
                <Button variant="outline">Centre d'aide</Button>
              </a>
              <a href="/support">
                <Button variant="outline">Support technique</Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
