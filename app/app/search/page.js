'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal, Package } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'Toutes' },
  { id: 'informatique', name: 'Informatique & IT' },
  { id: 'logistique', name: 'Logistique' },
  { id: 'btp', name: 'BTP & Construction' },
  { id: 'industrie', name: 'Industrie' },
  { id: 'mobilier', name: 'Mobilier & Bureau' },
  { id: 'autre', name: 'Autres' },
];

const conditions = [
  { id: 'all', name: 'Tous états' },
  { id: 'excellent', name: 'Excellent' },
  { id: 'good', name: 'Bon' },
  { id: 'fair', name: 'Correct' },
];

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || 'all',
    condition: 'all',
    minPrice: '',
    maxPrice: '',
    location: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category && filters.category !== 'all') params.append('category', filters.category);
      if (filters.condition && filters.condition !== 'all') params.append('condition', filters.condition);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.location) params.append('location', filters.location);

      const response = await fetch(`/api/listings?${params.toString()}`);
      const data = await response.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1">
        {/* Search Header */}
        <div className="bg-muted/30 border-b py-8">
          <div className="container">
            <h1 className="text-3xl font-bold mb-6">Rechercher du matériel</h1>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtres
              </Button>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className={`lg:block ${showFilters ? 'block' : 'hidden'} space-y-6`}>
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-3">Catégorie</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleFilterChange('category', cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${filters.category === cat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                        }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition Filter */}
              <div>
                <h3 className="font-semibold mb-3">État</h3>
                <div className="space-y-2">
                  {conditions.map((cond) => (
                    <button
                      key={cond.id}
                      onClick={() => handleFilterChange('condition', cond.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${filters.condition === cond.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                        }`}
                    >
                      {cond.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold mb-3">Prix</h3>
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  />
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="font-semibold mb-3">Localisation</h3>
                <Input
                  type="text"
                  placeholder="Ville ou région"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>
            </aside>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {listings.length} résultat{listings.length !== 1 ? 's' : ''}
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="skeleton h-48 w-full" />
                      <CardContent className="p-4 space-y-2">
                        <div className="skeleton h-6 w-3/4" />
                        <div className="skeleton h-4 w-1/2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : listings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {listings.map((listing) => (
                    <Link key={listing.id} href={`/listing/${listing.id}`}>
                      <Card className="overflow-hidden hover:shadow-xl transition-transform hover:scale-[1.01] cursor-pointer group">
                        <div className="relative h-48 bg-muted overflow-hidden">
                          {listing.images?.[0] ? (
                            <Image
                              src={listing.images[0]}
                              alt={listing.title}
                              fill
                              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                              <Package className="h-16 w-16" />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold line-clamp-2 mb-2">{listing.title}</h3>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-2xl font-bold text-primary">{formatPrice(listing.price)}</p>
                            <Badge variant="outline">{listing.condition}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{listing.location || 'France'}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Package className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Aucun résultat</h3>
                  <p className="text-muted-foreground mb-6">
                    Essayez de modifier vos critères de recherche
                  </p>
                  <Button onClick={() => setFilters({ search: '', category: 'all', condition: 'all', minPrice: '', maxPrice: '', location: '' })}>
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function SearchPageFallback() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="skeleton h-48 w-full" />
              <CardContent className="p-4 space-y-2">
                <div className="skeleton h-6 w-3/4" />
                <div className="skeleton h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
