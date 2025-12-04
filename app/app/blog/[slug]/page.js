import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export async function generateMetadata({ params }) {
  const title = `Article – ${params.slug}`
  return { title, description: 'Article du blog', alternates: { canonical: `/blog/${params.slug}` } }
}

export default function BlogArticlePage({ params }) {
  const articles = {
    'acheter-occasion-b2b': { title: "Bien acheter en B2B d'occasion", content: 'Optimisez vos achats grâce à des critères clairs et une vérification rigoureuse.' },
    'vendre-rapidement': { title: 'Vendre rapidement son matériel pro', content: 'Des annonces détaillées et des photos de qualité accélèrent la vente.' },
  }
  const article = articles[params.slug] || { title: 'Article', content: 'Contenu à venir.' }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-12 space-y-4">
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org","@type":"BlogPosting","headline":article.title,"description":article.content,"datePublished": new Date().toISOString()
        })}} />
        <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">← Retour au blog</Link>
        <h1 className="text-4xl font-bold">{article.title}</h1>
        <article className="prose max-w-none">
          <p className="text-muted-foreground">{article.content}</p>
        </article>
      </main>
      <Footer />
    </div>
  )
}
