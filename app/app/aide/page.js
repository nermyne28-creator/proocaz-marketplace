"use client"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'


const sections = [
  { title: 'Acheteurs', items: ['Créer un compte', 'Rechercher une annonce', 'Acheter en sécurité'] },
  { title: 'Vendeurs', items: ['Créer une annonce', 'Optimiser le titre', 'Gérer ses transactions'] },
  { title: 'Admin', items: ['Vérifier les comptes', 'Modérer les annonces'] },
]

export default function AidePage() {
  const [q, setQ] = useState('')
  const filtered = sections.map((s) => ({
    title: s.title,
    items: s.items.filter((i) => i.toLowerCase().includes(q.toLowerCase()))
  })).filter((s) => s.items.length > 0 || q === '')
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-12 space-y-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org","@type":"FAQPage","mainEntity":[
            {"@type":"Question","name":"Comment créer une annonce ?","acceptedAnswer":{"@type":"Answer","text":"Accédez à \"Déposer une annonce\" et remplissez le formulaire."}},
            {"@type":"Question","name":"Comment acheter en sécurité ?","acceptedAnswer":{"@type":"Answer","text":"Utilisez le paiement sécurisé et vérifiez le vendeur."}}
          ]
        })}} />
        <h1 className="text-4xl font-bold">Centre d'aide</h1>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher dans l'aide" className="w-full md:w-1/2 border rounded-md px-3 py-2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <Card key={s.title}><CardContent className="p-6"><h2 className="text-lg font-semibold mb-2">{s.title}</h2><ul className="space-y-1 text-muted-foreground">{s.items.map((i) => (<li key={i}>{i}</li>))}</ul></CardContent></Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
