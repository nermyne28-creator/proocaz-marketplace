import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, User, Server, Mail, Scale } from 'lucide-react'

export const metadata = {
  title: 'Mentions Légales – ProOccaz',
  description: "Informations légales de ProOccaz : éditeur, hébergeur, directeur de publication et contact.",
  alternates: { canonical: '/mentions-legales' },
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12">
          <div className="container">
            <Badge variant="outline" className="mb-4">Légal</Badge>
            <h1 className="text-4xl font-bold font-display">Mentions Légales</h1>
            <p className="text-muted-foreground mt-2">Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004</p>
          </div>
        </section>

        <section className="container py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Éditeur */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Éditeur du site</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong className="text-foreground">Raison sociale :</strong> ProOccaz SAS</p>
                      <p><strong className="text-foreground">Forme juridique :</strong> Société par Actions Simplifiée (SAS)</p>
                      <p><strong className="text-foreground">Capital social :</strong> 10 000 €</p>
                      <p><strong className="text-foreground">SIRET :</strong> 123 456 789 00010</p>
                      <p><strong className="text-foreground">RCS :</strong> Paris B 123 456 789</p>
                      <p><strong className="text-foreground">N° TVA Intracommunautaire :</strong> FR 12 345678901</p>
                      <p><strong className="text-foreground">Siège social :</strong> 10 Rue de la Tech, 75008 Paris, France</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Directeur de publication */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Directeur de la publication</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong className="text-foreground">Nom :</strong> Jean-Pierre Martin</p>
                      <p><strong className="text-foreground">Qualité :</strong> Président</p>
                      <p><strong className="text-foreground">Email :</strong> direction@prooccaz.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hébergeur */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Server className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Hébergeur</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong className="text-foreground">Raison sociale :</strong> Vercel Inc.</p>
                      <p><strong className="text-foreground">Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                      <p><strong className="text-foreground">Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://vercel.com</a></p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Contact</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong className="text-foreground">Email général :</strong> <a href="mailto:contact@prooccaz.com" className="text-primary hover:underline">contact@prooccaz.com</a></p>
                      <p><strong className="text-foreground">Email juridique :</strong> <a href="mailto:legal@prooccaz.com" className="text-primary hover:underline">legal@prooccaz.com</a></p>
                      <p><strong className="text-foreground">Téléphone :</strong> +33 1 23 45 67 89</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Propriété intellectuelle */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Propriété intellectuelle</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        L'ensemble du contenu de ce site (textes, images, vidéos, graphismes, logo, icônes, sons, logiciels, etc.)
                        est la propriété exclusive de ProOccaz SAS ou de ses partenaires, et est protégé par les lois françaises
                        et internationales relatives à la propriété intellectuelle.
                      </p>
                      <p>
                        Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments
                        du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable
                        de ProOccaz SAS.
                      </p>
                      <p>
                        Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée
                        comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et
                        suivants du Code de la Propriété Intellectuelle.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dernière mise à jour */}
            <p className="text-center text-sm text-muted-foreground">
              Dernière mise à jour : Décembre 2024
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
