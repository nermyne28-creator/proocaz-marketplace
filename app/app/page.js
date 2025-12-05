'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Laptop,
  Truck,
  Building2,
  Wrench,
  Package,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Users,
  Star,
  Clock,
  CreditCard,
  Headphones,
  Award,
  ChevronRight,
  Play,
  Quote
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabaseClient';

const categories = [
  { id: 'informatique', name: 'Informatique & IT', icon: Laptop, image: '/images/cat-it.png', count: '2.4k' },
  { id: 'logistique', name: 'Logistique', icon: Truck, image: '/images/cat-logistics.png', count: '1.8k' },
  { id: 'btp', name: 'BTP & Construction', icon: Building2, image: '/images/cat-btp.png', count: '3.2k' },
  { id: 'industrie', name: 'Industrie', icon: Wrench, image: '/images/cat-industry.png', count: '2.1k' },
  { id: 'mobilier', name: 'Mobilier & Bureau', icon: Package, image: '/images/cat-office.png', count: '1.5k' },
  { id: 'medical', name: 'Médical & Labo', icon: Sparkles, image: '/images/cat-medical.png', count: '890' },
];

const benefits = [
  {
    icon: Shield,
    title: 'Transactions 100% sécurisées',
    description: 'Paiement séquestré, libéré uniquement après confirmation de réception.',
  },
  {
    icon: TrendingUp,
    title: 'Économisez jusqu\'à 70%',
    description: 'Accédez à du matériel professionnel de qualité à des prix imbattables.',
  },
  {
    icon: Zap,
    title: 'Vente en moins de 48h',
    description: 'Publiez en 2 minutes, vendez rapidement grâce à notre audience qualifiée.',
  },
  {
    icon: Headphones,
    title: 'Support dédié',
    description: 'Une équipe experte vous accompagne à chaque étape de vos transactions.',
  },
];

const testimonials = [
  {
    name: 'Marie Dupont',
    role: 'Directrice Achats',
    company: 'LogiTrans SAS',
    content: 'Nous avons économisé plus de 40 000€ sur nos achats de chariots élévateurs cette année. La plateforme est intuitive et les vendeurs sont professionnels.',
    avatar: '👩‍💼',
    rating: 5,
  },
  {
    name: 'Thomas Bernard',
    role: 'Responsable IT',
    company: 'TechCorp France',
    content: 'ProOccaz nous permet de renouveler notre parc informatique à moindre coût tout en donnant une seconde vie à nos anciens équipements. Parfait pour notre démarche RSE.',
    avatar: '👨‍💻',
    rating: 5,
  },
  {
    name: 'Sophie Martin',
    role: 'Gérante',
    company: 'Boulangerie Artisanale du Marais',
    content: 'J\'ai trouvé un four professionnel à moitié prix du neuf. La transaction était simple et sécurisée. Je recommande sans hésitation !',
    avatar: '👩‍🍳',
    rating: 5,
  },
];

const howItWorks = [
  { step: '01', title: 'Créez votre compte', description: 'Inscription gratuite en 2 minutes avec votre SIRET' },
  { step: '02', title: 'Publiez ou recherchez', description: 'Déposez une annonce ou parcourez notre catalogue' },
  { step: '03', title: 'Négociez en direct', description: 'Contactez les vendeurs via notre messagerie sécurisée' },
  { step: '04', title: 'Finalisez en sécurité', description: 'Paiement protégé et livraison suivie' },
];

export default function Home() {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from('listings')
          .select(`*, images (url, alt_text, "order")`)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(6);
        if (error) throw error;
        setListings(data || []);
        return;
      }
      const response = await fetch('/api/listings');
      if (response.ok) {
        const data = await response.json();
        setListings(data.listings || []);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    router.push(searchQuery.trim() ? `/search?q=${encodeURIComponent(searchQuery)}` : '/search');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />

      {/* Hero Section - Premium Design */}
      <section className="relative pt-32 pb-40 md:pt-48 md:pb-64 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Entrepôt moderne ProOccaz"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-fade-in">
              <Award className="w-4 h-4" />
              Marketplace B2B n°1 en France • +2 500 entreprises
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight font-display leading-[1.05] animate-fade-in">
              La marketplace des
              <br />
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary animate-gradient-x">
                  pros de l'occasion
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C100 2 200 2 298 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/30" />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-200">
              Achetez et vendez des équipements professionnels d'occasion entre entreprises.
              <span className="text-foreground font-medium"> Sécurisé. Vérifié. Garanti.</span>
            </p>

            {/* Search Bar - Premium Style */}
            <div className="max-w-3xl mx-auto mt-12 animate-fade-in animation-delay-400">
              <div className="flex flex-col md:flex-row gap-3 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border-2 border-primary/10 shadow-2xl shadow-primary/10">
                <div className="relative flex-1">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Rechercher un équipement (ex: chariot élévateur, serveur, imprimante 3D...)"
                    className="w-full h-14 pl-14 bg-transparent border-none focus-visible:ring-0 text-lg placeholder:text-muted-foreground/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button
                  size="lg"
                  className="h-14 px-10 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] font-semibold text-lg"
                  onClick={handleSearch}
                >
                  Rechercher
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Popular Searches */}
              <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm">
                <span className="text-muted-foreground">Populaires :</span>
                {['Chariot élévateur', 'MacBook Pro', 'Imprimante 3D', 'Four professionnel'].map((term) => (
                  <button
                    key={term}
                    onClick={() => { setSearchQuery(term); router.push(`/search?q=${encodeURIComponent(term)}`); }}
                    className="px-3 py-1 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="pt-16 flex flex-wrap justify-center gap-x-12 gap-y-4 text-muted-foreground animate-fade-in animation-delay-600">
              {[
                { icon: Shield, text: 'Paiement sécurisé' },
                { icon: CheckCircle2, text: 'Vendeurs vérifiés' },
                { icon: Clock, text: 'Support 7j/7' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-muted/30 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="container relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <Badge variant="outline" className="mb-4">Catégories</Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-display">Tous les secteurs d'activité</h2>
              <p className="text-muted-foreground text-lg mt-2">Du BTP à l'informatique, trouvez l'équipement adapté à votre métier</p>
            </div>
            <Link href="/search" className="flex items-center text-primary font-medium hover:underline group">
              Voir tout
              <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} href={`/search?category=${category.id}`}>
                  <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative h-48">
                    <div className="absolute inset-0">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                    </div>

                    <CardContent className="relative h-full flex flex-col justify-end p-4 text-white z-10">
                      <div className="mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-bold text-sm leading-tight mb-1 group-hover:text-primary-foreground transition-colors">{category.name}</h3>
                      <p className="text-xs text-white/70 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">{category.count} annonces</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Simple & Rapide</Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-display">Comment ça marche ?</h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              De l'inscription à la transaction, tout est pensé pour vous faire gagner du temps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, i) => (
              <div key={i} className="relative group">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <div className="relative bg-card rounded-2xl p-8 border-2 hover:border-primary/50 transition-all group-hover:shadow-xl">
                  <div className="text-6xl font-bold font-display text-primary/10 group-hover:text-primary/20 transition-colors absolute top-4 right-4">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/auth/register">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge variant="outline" className="mb-4">Opportunités</Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-display">Dernières annonces</h2>
              <p className="text-muted-foreground mt-2">Les meilleures affaires du moment</p>
            </div>
            <Link href="/search">
              <Button variant="outline" className="rounded-full">Voir tout le catalogue</Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4 animate-pulse">
                  <div className="h-64 bg-muted rounded-2xl" />
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing) => (
                <Link key={listing.id} href={`/listing/${listing.id}`}>
                  <Card className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {listing.images?.[0]?.url ? (
                        <Image
                          src={listing.images[0].url}
                          alt={listing.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-muted">
                          <Package className="h-16 w-16 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Badge className="absolute top-4 right-4 bg-white/90 text-black">
                        {listing.condition || 'Bon état'}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">{listing.title}</h3>
                      </div>
                      <p className="text-2xl font-bold text-primary mb-3">{formatPrice(listing.price)}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {listing.location || 'France'}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-background rounded-3xl border-2 border-dashed">
              <Package className="h-20 w-20 mx-auto mb-6 text-muted-foreground/30" />
              <h3 className="text-2xl font-bold mb-2">Aucune annonce pour le moment</h3>
              <p className="text-muted-foreground mb-8">Soyez le premier à publier une annonce !</p>
              <Link href="/create-listing">
                <Button size="lg" className="rounded-full">
                  Déposer une annonce
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="border-white/30 text-white mb-6">Nos avantages</Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight mb-6">
                Pourquoi les pros nous font confiance ?
              </h2>
              <p className="text-xl text-white/80 mb-10">
                ProOccaz, c'est la garantie d'une transaction sécurisée entre professionnels,
                avec un accompagnement de A à Z.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{benefit.title}</h3>
                      <p className="text-sm text-white/70">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-white/5 rounded-3xl blur-2xl" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <div>
                      <p className="text-sm text-white/60">Volume de transactions</p>
                      <p className="text-4xl font-bold font-display">2.4M €</p>
                      <p className="text-sm text-green-300 flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 mr-1" /> +28% ce mois
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-green-300" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-3xl font-bold">847</p>
                      <p className="text-sm text-white/60">Ventes ce mois</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-3xl font-bold">98%</p>
                      <p className="text-sm text-white/60">Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Témoignages</Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-display">Ils nous font confiance</h2>
            <p className="text-muted-foreground text-lg mt-4">Découvrez les retours de nos utilisateurs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="border-2 hover:border-primary/50 transition-all hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />
                  <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role} • {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="container relative text-center">
          <Badge variant="outline" className="mb-6">Rejoignez-nous</Badge>
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Prêt à faire des affaires ?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Rejoignez les +2 500 entreprises qui utilisent ProOccaz pour optimiser leurs achats et ventes d'équipements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-xl shadow-primary/25">
                Créer un compte gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="h-16 px-10 text-lg rounded-full border-2">
                Explorer le catalogue
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
