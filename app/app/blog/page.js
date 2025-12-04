"use client"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { useState } from 'react'


const posts = [
  { slug: 'acheter-occasion-b2b', title: "Bien acheter en B2B d'occasion", excerpt: 'Nos conseils pour optimiser vos achats.', category: 'conseils', tags: ['achat','b2b'] },
  { slug: 'vendre-rapidement', title: 'Vendre rapidement son matériel pro', excerpt: 'Comment publier des annonces efficaces.', category: 'conseils', tags: ['vente','annonces'] },
  { slug: 'actualites-marche', title: 'Actualités du marché de l’occasion', excerpt: 'Tendances et chiffres du secteur.', category: 'actualites', tags: ['marché','tendances'] },
]

export default function BlogPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('toutes')
  const filtered = posts.filter((p) => {
    const matchQ = (p.title + ' ' + p.excerpt + ' ' + p.tags.join(' ')).toLowerCase().includes(q.toLowerCase())
    const matchC = cat === 'toutes' || p.category === cat
    return matchQ && matchC
  })
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-12 space-y-6">
        <h1 className="text-4xl font-bold">Blog</h1>
        <div className="flex flex-col md:flex-row gap-3">
          <Input className="md:flex-1" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher des articles" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="flex h-10 rounded-md border px-3 py-2 text-sm">
            <option value="toutes">Toutes catégories</option>
            <option value="conseils">Conseils</option>
            <option value="actualites">Actualités</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`}>
              <Card className="hover:shadow-xl transition-transform hover:scale-[1.01]"><CardContent className="p-6"><h2 className="text-xl font-semibold">{p.title}</h2><p className="text-muted-foreground">{p.excerpt}</p></CardContent></Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
