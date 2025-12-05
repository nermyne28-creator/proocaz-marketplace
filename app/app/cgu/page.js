import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Users, ShoppingBag, Shield, AlertTriangle, Scale, Gavel, Clock } from 'lucide-react'

export const metadata = {
  title: 'CGU / CGV – ProOccaz',
  description: "Conditions Générales d'Utilisation et de Vente de la plateforme ProOccaz.",
  alternates: { canonical: '/cgu' },
}

const sections = [
  {
    icon: FileText,
    title: '1. Objet et champ d\'application',
    content: `Les présentes Conditions Générales d'Utilisation (CGU) et Conditions Générales de Vente (CGV) régissent l'accès et l'utilisation de la plateforme ProOccaz, accessible à l'adresse prooccaz.com.

ProOccaz est une marketplace B2B permettant aux professionnels d'acheter et vendre des équipements d'occasion. Toute inscription implique l'acceptation pleine et entière des présentes conditions.`
  },
  {
    icon: Users,
    title: '2. Inscription et compte utilisateur',
    content: `L'accès aux services nécessite la création d'un compte professionnel. L'utilisateur s'engage à :
• Fournir des informations exactes et à jour (SIRET, coordonnées, etc.)
• Maintenir la confidentialité de ses identifiants de connexion
• Notifier immédiatement toute utilisation non autorisée de son compte

ProOccaz se réserve le droit de suspendre ou supprimer tout compte ne respectant pas ces conditions.`
  },
  {
    icon: ShoppingBag,
    title: '3. Publication d\'annonces',
    content: `Les vendeurs s'engagent à :
• Décrire fidèlement les produits mis en vente (état, caractéristiques, défauts)
• Fournir des photos représentatives de l'état réel du produit
• Proposer des prix conformes au marché
• Respecter la réglementation en vigueur (normes CE, traçabilité, etc.)

Toute annonce trompeuse pourra être supprimée sans préavis.`
  },
  {
    icon: Shield,
    title: '4. Transactions et paiements',
    content: `Les paiements sont sécurisés via notre partenaire de paiement agréé. Les modalités incluent :
• Commission de 5% (standard) ou 3% (abonnés Pro/Entreprise) sur chaque transaction
• Délai de libération des fonds : 48h après confirmation de réception
• Protection acheteur en cas de non-conformité du produit

Les transactions sont soumises à la TVA applicable selon la législation française.`
  },
  {
    icon: Clock,
    title: '5. Livraison et retrait',
    content: `Le vendeur est responsable de l'emballage et de l'expédition du produit. Les options de livraison comprennent :
• Expédition par transporteur (frais à la charge de l'acheteur)
• Retrait sur site du vendeur
• Service de transport dédié pour les équipements lourds

Le délai de livraison indicatif doit être respecté. En cas de retard significatif, l'acheteur peut annuler sa commande.`
  },
  {
    icon: AlertTriangle,
    title: '6. Droit de rétractation',
    content: `Conformément à l'article L221-3 du Code de la consommation, le droit de rétractation ne s'applique pas aux transactions entre professionnels (B2B).

Toutefois, ProOccaz propose une garantie satisfaction de 48h permettant de signaler tout problème majeur de non-conformité.`
  },
  {
    icon: Scale,
    title: '7. Responsabilité',
    content: `ProOccaz agit en tant qu'intermédiaire technique et n'est pas partie aux transactions entre utilisateurs. À ce titre :
• ProOccaz ne garantit pas la disponibilité des produits
• ProOccaz n'est pas responsable des litiges entre utilisateurs
• La responsabilité de ProOccaz est limitée au montant des commissions perçues

Les utilisateurs s'engagent à indemniser ProOccaz de tout préjudice résultant d'une utilisation non conforme.`
  },
  {
    icon: Gavel,
    title: '8. Litiges et droit applicable',
    content: `En cas de litige, les parties s'engagent à rechercher une solution amiable via le service de médiation de ProOccaz.

À défaut d'accord, les tribunaux de Paris seront seuls compétents. Les présentes conditions sont régies par le droit français.

Pour toute question : legal@prooccaz.com`
  },
]

export default function CGUPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">Conditions Générales d'Utilisation et de Vente</h1>
            <p className="text-muted-foreground">Dernière mise à jour : Décembre 2024</p>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="container py-8">
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="font-semibold mb-4">Sommaire</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {sections.map((section, i) => (
                  <a
                    key={i}
                    href={`#section-${i + 1}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sections */}
          <div className="space-y-8 max-w-4xl">
            {sections.map((section, i) => (
              <Card key={i} id={`section-${i + 1}`} className="scroll-mt-24">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                      <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-muted/50 py-12 mt-8">
          <div className="container text-center">
            <h2 className="text-2xl font-bold mb-4">Des questions sur nos conditions ?</h2>
            <p className="text-muted-foreground mb-6">Notre équipe juridique est à votre disposition.</p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
