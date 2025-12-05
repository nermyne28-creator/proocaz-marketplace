import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Database, Target, Scale, Clock, UserCheck, Cookie, Share2, Shield, Mail } from 'lucide-react'

export const metadata = {
  title: 'Politique de Confidentialité – ProOccaz',
  description: 'Découvrez comment ProOccaz protège vos données personnelles conformément au RGPD.',
  alternates: { canonical: '/confidentialite' },
}

const sections = [
  {
    icon: Database,
    title: '1. Données collectées',
    content: `Nous collectons les données suivantes dans le cadre de nos services :

**Données d'identification :**
• Nom, prénom, raison sociale
• Adresse email et numéro de téléphone
• Numéro SIRET et informations de l'entreprise

**Données de transaction :**
• Historique des annonces publiées et consultées
• Détails des transactions effectuées
• Messages échangés avec d'autres utilisateurs

**Données techniques :**
• Adresse IP et données de connexion
• Type de navigateur et système d'exploitation
• Cookies et traceurs (voir notre politique cookies)`
  },
  {
    icon: Target,
    title: '2. Finalités du traitement',
    content: `Vos données sont utilisées pour :

• **Exécution du contrat** : Gestion de votre compte, des annonces et transactions
• **Amélioration des services** : Personnalisation de l'expérience, statistiques d'usage
• **Sécurité** : Prévention de la fraude, vérification d'identité
• **Communication** : Notifications relatives à vos transactions, newsletters (avec consentement)
• **Obligations légales** : Conformité fiscale, conservation des factures`
  },
  {
    icon: Scale,
    title: '3. Bases légales',
    content: `Nos traitements reposent sur les bases légales suivantes :

• **Exécution du contrat** (Art. 6.1.b RGPD) : Nécessaire à la fourniture de nos services
• **Consentement** (Art. 6.1.a RGPD) : Marketing, newsletters, cookies non essentiels
• **Obligations légales** (Art. 6.1.c RGPD) : Conservation des données comptables
• **Intérêt légitime** (Art. 6.1.f RGPD) : Amélioration des services, sécurité`
  },
  {
    icon: Clock,
    title: '4. Durée de conservation',
    content: `Les durées de conservation varient selon les données :

| Type de données | Durée de conservation |
|-----------------|----------------------|
| Compte utilisateur | Durée de l'inscription + 3 ans |
| Transactions | 10 ans (obligations comptables) |
| Messages | 5 ans après la dernière connexion |
| Logs de connexion | 1 an |
| Cookies | 13 mois maximum |

À l'expiration de ces délais, les données sont supprimées ou anonymisées.`
  },
  {
    icon: UserCheck,
    title: '5. Vos droits RGPD',
    content: `Conformément au RGPD, vous disposez des droits suivants :

• **Droit d'accès** : Obtenir une copie de vos données
• **Droit de rectification** : Corriger des données inexactes
• **Droit à l'effacement** : Demander la suppression de vos données
• **Droit à la portabilité** : Récupérer vos données dans un format structuré
• **Droit d'opposition** : S'opposer au traitement pour motif légitime
• **Droit à la limitation** : Geler le traitement de vos données

Pour exercer ces droits : **dpo@prooccaz.com**
Délai de réponse : 1 mois maximum.`
  },
  {
    icon: Share2,
    title: '6. Partage des données',
    content: `Vos données peuvent être partagées avec :

• **Autres utilisateurs** : Informations nécessaires aux transactions (nom, contact professionnel)
• **Prestataires techniques** : Hébergement (OVH), paiement (Stripe), emailing
• **Autorités** : Sur demande légale uniquement

Aucune donnée n'est vendue à des tiers. Nos sous-traitants sont liés par des clauses de confidentialité strictes.`
  },
  {
    icon: Shield,
    title: '7. Sécurité',
    content: `Nous mettons en œuvre des mesures de sécurité adaptées :

• Chiffrement SSL/TLS des communications
• Hashage des mots de passe (bcrypt)
• Authentification à deux facteurs disponible
• Audits de sécurité réguliers
• Hébergement en Union Européenne
• Sauvegardes quotidiennes chiffrées

En cas de violation de données, nous vous informerons dans les 72h.`
  },
  {
    icon: Cookie,
    title: '8. Cookies',
    content: `Nous utilisons des cookies pour le bon fonctionnement du site. Pour plus de détails sur les types de cookies utilisés et vos options de paramétrage, consultez notre **[Politique Cookies](/cookies)**.

Vous pouvez modifier vos préférences à tout moment via la bannière de consentement.`
  },
]

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold">Politique de Confidentialité</h1>
            </div>
            <p className="text-muted-foreground">Conforme au Règlement Général sur la Protection des Données (RGPD)</p>
            <p className="text-sm text-muted-foreground mt-2">Dernière mise à jour : Décembre 2024</p>
          </div>
        </section>

        {/* Key Points */}
        <section className="container py-8">
          <Card className="bg-primary/5 border-primary/20 mb-8">
            <CardContent className="p-6">
              <h2 className="font-semibold mb-4">🔐 Points clés</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Hébergement 100% en Europe
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Aucune revente de données
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Droit à l'oubli garanti
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sections */}
          <div className="space-y-6 max-w-4xl">
            {sections.map((section, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                      <div className="text-muted-foreground whitespace-pre-line leading-relaxed prose prose-sm max-w-none">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact DPO */}
        <section className="bg-muted/50 py-12 mt-8">
          <div className="container max-w-2xl text-center">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Contacter notre DPO</h2>
            <p className="text-muted-foreground mb-6">
              Pour toute question relative à vos données personnelles, contactez notre Délégué à la Protection des Données.
            </p>
            <a
              href="mailto:dpo@prooccaz.com"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              dpo@prooccaz.com
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
