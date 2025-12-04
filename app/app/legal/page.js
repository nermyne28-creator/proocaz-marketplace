import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Légal – OccaSync',
  description: "Vue d’ensemble des documents légaux",
  alternates: { canonical: '/legal' },
}

export default function LegalPage() {
  const links = [
    { href: '/cgu', label: 'Conditions Générales d’Utilisation' },
    { href: '/confidentialite', label: 'Politique de confidentialité' },
    { href: '/mentions-legales', label: 'Mentions légales' },
    { href: '/cookies', label: 'Politique cookies' },
  ]
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-12 space-y-6">
        <h1 className="text-4xl font-bold">Informations légales</h1>
        <ul className="space-y-2">
          {links.map((l) => (
            <li key={l.href}><Link className="text-primary hover:underline" href={l.href}>{l.label}</Link></li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  )
}

