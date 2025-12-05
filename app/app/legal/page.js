import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Shield, Cookie, Scale, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Informations Légales – ProOccaz',
  description: "Accédez à toutes les informations légales de ProOccaz : CGU, politique de confidentialité, cookies et mentions légales.",
  alternates: { canonical: '/legal' },
}

const legalPages = [
  {
    href: '/cgu',
    icon: FileText,
    label: 'Conditions Générales d\'Utilisation',
    description: 'Règles d\'utilisation de la plateforme ProOccaz'
  },
  {
    href: '/confidentialite',
    icon: Shield,
    label: 'Politique de confidentialité',
    description: 'Comment nous protégeons vos données personnelles'
  },
  {
    href: '/cookies',
    icon: Cookie,
    label: 'Politique cookies',
    description: 'Utilisation des cookies sur notre site'
  },
  {
    href: '/mentions-legales',
    icon: Scale,
    label: 'Mentions légales',
    description: 'Informations sur l\'éditeur et l\'hébergeur'
  },
]

export default function LegalPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12">
          <div className="container">
            <Badge variant="outline" className="mb-4">Légal</Badge>
            <h1 className="text-4xl font-bold font-display">Informations légales</h1>
            <p className="text-muted-foreground mt-2">Accédez à tous nos documents juridiques et réglementaires.</p>
          </div>
        </section>

        <section className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {legalPages.map((page) => (
              <Link key={page.href} href={page.href}>
                <Card className="h-full hover:shadow-xl transition-all hover:border-primary/50 group cursor-pointer">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <page.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors flex items-center">
                        {page.label}
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h2>
                      <p className="text-sm text-muted-foreground">{page.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              Pour toute question juridique, contactez-nous à{' '}
              <a href="mailto:legal@prooccaz.com" className="text-primary hover:underline">
                legal@prooccaz.com
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
