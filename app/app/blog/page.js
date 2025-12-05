'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useState } from 'react'
import { Calendar, Clock, Tag, ArrowRight, BookOpen, TrendingUp, Lightbulb, Newspaper } from 'lucide-react'

const posts = [
  {
    slug: 'guide-achat-occasion-b2b',
    title: "Guide complet : Acheter du matériel d'occasion en B2B",
    excerpt: 'Découvrez nos conseils d\'expert pour réussir vos achats d\'équipements professionnels d\'occasion. Vérifications, négociation, garanties.',
    category: 'conseils',
    tags: ['achat', 'b2b', 'guide'],
    date: '28 Nov 2024',
    readTime: '8 min',
    featured: true,
    image: '🛒'
  },
  {
    slug: 'vendre-rapidement-materiel-pro',
    title: 'Comment vendre rapidement son matériel professionnel',
    excerpt: 'Les secrets d\'une annonce efficace : photos, description, prix. Optimisez votre visibilité et vendez plus vite.',
    category: 'conseils',
    tags: ['vente', 'annonces', 'optimisation'],
    date: '22 Nov 2024',
    readTime: '6 min',
    featured: true,
    image: '💰'
  },
  {
    slug: 'tendances-marche-occasion-2024',
    title: 'Tendances du marché de l\'occasion pro en 2024',
    excerpt: 'Analyse du secteur : les équipements les plus demandés, l\'évolution des prix, et les prévisions pour 2025.',
    category: 'actualites',
    tags: ['marché', 'tendances', 'analyse'],
    date: '15 Nov 2024',
    readTime: '5 min',
    featured: false,
    image: '📊'
  },
  {
    slug: 'economie-circulaire-entreprise',
    title: 'L\'économie circulaire : un levier de croissance pour les entreprises',
    excerpt: 'Comment la revente d\'équipements d\'occasion s\'inscrit dans une démarche RSE et génère de la valeur.',
    category: 'actualites',
    tags: ['RSE', 'économie circulaire', 'durabilité'],
    date: '10 Nov 2024',
    readTime: '7 min',
    featured: false,
    image: '♻️'
  },
  {
    slug: 'photos-annonces-qui-vendent',
    title: '10 astuces pour des photos d\'annonces qui vendent',
    excerpt: 'Éclairage, angles, mise en scène : toutes les techniques pour mettre en valeur vos équipements.',
    category: 'conseils',
    tags: ['photos', 'annonces', 'astuces'],
    date: '5 Nov 2024',
    readTime: '4 min',
    featured: false,
    image: '📸'
  },
  {
    slug: 'negocier-prix-professionnel',
    title: 'L\'art de la négociation entre professionnels',
    excerpt: 'Techniques éprouvées pour négocier efficacement tout en maintenant une relation commerciale saine.',
    category: 'conseils',
    tags: ['négociation', 'prix', 'relation client'],
    date: '1 Nov 2024',
    readTime: '6 min',
    featured: false,
    image: '🤝'
  },
]

const categories = [
  { id: 'toutes', label: 'Tous les articles', icon: BookOpen },
  { id: 'conseils', label: 'Conseils & Guides', icon: Lightbulb },
  { id: 'actualites', label: 'Actualités', icon: Newspaper },
]

export default function BlogPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('toutes')

  const filteredPosts = posts.filter((p) => {
    const matchQuery = (p.title + ' ' + p.excerpt + ' ' + p.tags.join(' ')).toLowerCase().includes(query.toLowerCase())
    const matchCategory = category === 'toutes' || p.category === category
    return matchQuery && matchCategory
  })

  const featuredPosts = filteredPosts.filter(p => p.featured)
  const regularPosts = filteredPosts.filter(p => !p.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold">Blog & Conseils</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mb-8">
              Actualités du marché, guides pratiques et conseils d'experts pour optimiser vos achats et ventes d'équipements professionnels.
            </p>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un article..."
                  className="pl-4"
                />
              </div>
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${category === cat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                      }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="container py-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">À la une</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all hover:scale-[1.01] overflow-hidden group">
                    <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 text-center text-6xl">
                      {post.image}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-muted px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="container py-8">
          {featuredPosts.length > 0 && (
            <h2 className="text-xl font-bold mb-6">Tous les articles</h2>
          )}

          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Aucun article trouvé pour votre recherche.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(featuredPosts.length > 0 ? regularPosts : filteredPosts).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all hover:scale-[1.02] group">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4">{post.image}</div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center text-primary text-sm font-medium">
                        Lire l'article
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter */}
        <section className="bg-primary/5 py-12 mt-8">
          <div className="container max-w-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Restez informé</h2>
            <p className="text-muted-foreground mb-6">
              Recevez nos meilleurs conseils et les actualités du marché directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input placeholder="Votre email professionnel" type="email" className="flex-1" />
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                S'abonner
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              En vous inscrivant, vous acceptez notre politique de confidentialité.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
