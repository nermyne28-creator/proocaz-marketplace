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
  MapPin
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabaseClient';

const categories = [
  { id: 'informatique', name: 'Informatique & IT', icon: Laptop, color: 'bg-blue-500/10 text-blue-600' },
  { id: 'logistique', name: 'Logistique', icon: Truck, color: 'bg-green-500/10 text-green-600' },
  { id: 'btp', name: 'BTP & Construction', icon: Building2, color: 'bg-orange-500/10 text-orange-600' },
  { id: 'industrie', name: 'Industrie', icon: Wrench, color: 'bg-purple-500/10 text-purple-600' },
  { id: 'mobilier', name: 'Mobilier & Bureau', icon: Package, color: 'bg-pink-500/10 text-pink-600' },
  { id: 'autre', name: 'Autres', icon: Sparkles, color: 'bg-gray-500/10 text-gray-600' },
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
          .select(`
            *,
            images (url, alt_text, "order")
          `)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        setListings(data || []);
        return;
      }

      // Fallback to internal API if Supabase is not configured
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
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-10 dark:opacity-5" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

        {/* Animated blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary mb-4 animate-slide-up">
              <Sparkles className="w-3 h-3 mr-2" />
              La marketplace B2B n°1 en France
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-display leading-[1.1]">
              Achetez et vendez <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x">
                l'occasion pro
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Une plateforme sécurisée pour les professionnels. Donnez une seconde vie à vos équipements et optimisez votre trésorerie.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto p-2 bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-2xl border shadow-2xl shadow-primary/5 mt-12">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Que recherchez-vous ? (ex: Chariot élévateur, MacBook...)"
                  className="w-full h-14 pl-12 bg-transparent border-none focus-visible:ring-0 text-lg placeholder:text-muted-foreground/60"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button size="lg" className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]" onClick={handleSearch}>
                Rechercher
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="pt-12 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {['Airbus', 'SNCF', 'Vinci', 'TotalEnergies'].map((brand) => (
                <span key={brand} className="text-xl font-bold font-display">{brand}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Parcourir par catégorie</h2>
              <p className="text-muted-foreground text-lg">
                Trouvez le matériel adapté à votre secteur d'activité
              </p>
            </div>
            <Link href="/search" className="hidden md:flex items-center text-primary font-medium hover:underline">
              Voir toutes les catégories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} href={`/search?category=${category.id}`}>
                  <div className="group cursor-pointer">
                    <div className={`aspect-square rounded-3xl ${category.color} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}>
                      <Icon className="h-10 w-10 transition-transform duration-500 group-hover:rotate-12" />
                    </div>
                    <h3 className="font-semibold text-center group-hover:text-primary transition-colors">{category.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 font-display">Dernières annonces</h2>
              <p className="text-muted-foreground">Les meilleures opportunités du moment</p>
            </div>
            <Link href="/search">
              <Button variant="outline" className="rounded-full">Voir tout</Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="skeleton h-64 w-full rounded-2xl" />
                  <div className="space-y-2">
                    <div className="skeleton h-6 w-3/4 rounded" />
                    <div className="skeleton h-4 w-1/2 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing) => (
                <Link key={listing.id} href={`/listing/${listing.id}`}>
                  <Card className="group overflow-hidden border-none shadow-none bg-transparent hover:bg-muted/30 transition-colors rounded-3xl">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4">
                      {listing.images?.[0]?.url ? (
                        <Image
                          src={listing.images[0].url}
                          alt={listing.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
                          <Package className="h-12 w-12 opacity-20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <Button className="w-full bg-white text-black hover:bg-white/90 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          Voir l'annonce
                        </Button>
                      </div>
                      <Badge className="absolute top-4 right-4 bg-white/90 text-black backdrop-blur-sm hover:bg-white">
                        {listing.condition || 'Bon état'}
                      </Badge>
                    </div>
                    <CardContent className="p-2 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">{listing.title}</h3>
                        <p className="font-bold text-primary text-lg">{formatPrice(listing.price)}</p>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {listing.location || 'France'}
                        <span className="mx-2">•</span>
                        {new Date(listing.created_at).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-muted/20 rounded-3xl border-2 border-dashed">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-xl font-semibold mb-2">Aucune annonce pour le moment</h3>
              <p className="text-muted-foreground mb-6">Soyez le premier à publier une annonce !</p>
              <Link href="/create-listing">
                <Button>Déposer une annonce</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why OccaSync Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="border-white/20 text-white mb-6">Pourquoi nous choisir ?</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display leading-tight">
                La solution complète pour <br />votre matériel professionnel
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                OccaSync simplifie l'achat et la vente de matériel B2B. Nous sécurisons chaque étape pour vous permettre de vous concentrer sur votre activité.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Shield, title: "Transactions sécurisées", desc: "Paiements séquestrés jusqu'à la livraison" },
                  { icon: TrendingUp, title: "Meilleurs prix", desc: "Jusqu'à -70% sur le prix du neuf" },
                  { icon: Zap, title: "Rapidité", desc: "Mise en ligne en 2 minutes, vente en 48h" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-primary-foreground/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-primary rounded-3xl blur-2xl opacity-50" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <div>
                      <p className="text-sm text-white/60">Ventes ce mois-ci</p>
                      <p className="text-3xl font-bold">142,500 €</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-lg bg-white/10" />
                        <div className="flex-1">
                          <div className="h-2 w-24 bg-white/20 rounded mb-2" />
                          <div className="h-2 w-16 bg-white/10 rounded" />
                        </div>
                        <div className="h-4 w-12 bg-white/20 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-display">
            Prêt à faire des affaires ?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Rejoignez plus de 2 500 entreprises qui utilisent OccaSync au quotidien.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                Créer un compte gratuit
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-muted">
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
