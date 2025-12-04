'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'


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
      if (res.ok) toast.success('Message envoyé'); else toast.error(data.error || 'Erreur')
      e.currentTarget.reset()
    } catch {
      toast.error('Erreur réseau')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-12 space-y-8">
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org","@type":"Organization","contactPoint":{"@type":"ContactPoint","telephone":"+33 1 23 45 67 89","contactType":"customer service","email":"contact@occasync.com"}
        })}} />
        <h1 className="text-4xl font-bold">Contact</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card><CardContent className="p-6 space-y-4">
            <p className="text-muted-foreground">Adresse: 10 Rue Exemple, 75000 Paris</p>
            <p className="text-muted-foreground">Email: contact@occasync.com</p>
            <p className="text-muted-foreground">Téléphone: +33 1 23 45 67 89</p>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" placeholder="Nom" required />
              <Input name="email" type="email" placeholder="Email" required />
              <Input name="subject" placeholder="Sujet" required />
              <textarea name="message" rows={5} className="w-full rounded-md border px-3 py-2" placeholder="Message" required />
              <Button type="submit" className="w-full">Envoyer</Button>
            </form>
          </CardContent></Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
