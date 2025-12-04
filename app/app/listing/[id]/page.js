'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { ArrowLeft, MapPin, Package, ShieldCheck, MessageSquare, CreditCard } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    }
    fetchListing();
  }, [params.id]);

  const fetchUser = async (token) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.id) {
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchListing = async () => {
    try {
      const response = await fetch(`/api/listings/${params.id}`);
      const data = await response.json();
      if (data.listing) {
        setListing(data.listing);
      } else {
        toast.error('Annonce non trouvée');
        router.push('/search');
      }
    } catch (error) {
      toast.error('Erreur de chargement');
      router.push('/search');
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Veuillez vous connecter pour acheter');
      router.push('/auth/login');
      return;
    }

    if (user && listing && user.id === listing.sellerId) {
      toast.error('Vous ne pouvez pas acheter votre propre annonce');
      return;
    }

    setShowPaymentModal(true);
  };

  const handleConfirmPayment = async () => {
    setProcessing(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId: listing.id }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Paiement simulé avec succès ! 🎉');
        setShowPaymentModal(false);
        
        // Simulate payment processing
        setTimeout(() => {
          toast.success('Transaction confirmée ! Vous recevrez un email de confirmation.');
          router.push('/dashboard');
        }, 1500);
      } else {
        toast.error(data.error || 'Erreur lors du paiement');
      }
    } catch (error) {
      toast.error('Erreur réseau');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return null;
  }

  const images = listing.images?.length > 0 ? listing.images : [null];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container py-8">
        <Link href="/search" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la recherche
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images Section */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="overflow-hidden">
              <div className="relative h-96 bg-muted">
                {images[currentImageIndex] ? (
                  <Image
                    src={images[currentImageIndex]}
                    alt={listing.title}
                    fill
                    sizes="(max-width:768px) 100vw, 70vw"
                    className="object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="h-32 w-32 text-muted-foreground" />
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      {img ? (
                        <Image src={img} alt={`Thumbnail ${index + 1}`} fill sizes="100px" className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">{listing.description}</p>
              </CardContent>
            </Card>

            {/* Seller Info */}
            {listing.seller && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Vendeur</h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg">{listing.seller.company}</p>
                      {listing.seller.verified && (
                        <div className="flex items-center text-secondary mt-1">
                          <ShieldCheck className="h-4 w-4 mr-1" />
                          <span className="text-sm">Vendeur vérifié</span>
                        </div>
                      )}
                    </div>
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contacter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Purchase Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.location || 'France'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">{listing.condition}</Badge>
                  <Badge variant="secondary">{listing.category}</Badge>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-3xl font-bold text-primary">{formatPrice(listing.price)}</p>
                  <p className="text-sm text-muted-foreground mt-1">Prix HT</p>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="lg" onClick={handleBuyNow}>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Acheter maintenant
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Contacter le vendeur
                  </Button>
                </div>

                <div className="pt-4 border-t space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Paiement sécurisé</p>
                      <p className="text-muted-foreground">Protection acheteur garantie</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Package className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Livraison disponible</p>
                      <p className="text-muted-foreground">Sur toute la France</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t text-xs text-muted-foreground">
                  <p>Publiée le {formatDate(listing.createdAt)}</p>
                  <p>{listing.views || 0} vues</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Paiement simulé</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Produit</p>
              <p className="font-semibold">{listing.title}</p>
              <p className="text-2xl font-bold text-primary mt-2">{formatPrice(listing.price)}</p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-sm font-medium mb-3">Informations de paiement (simulé)</p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Numéro de carte"
                  className="w-full px-3 py-2 border rounded-md"
                  value="4242 4242 4242 4242"
                  disabled
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="px-3 py-2 border rounded-md"
                    value="12/25"
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="px-3 py-2 border rounded-md"
                    value="123"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                ℹ️ Ceci est une simulation. Aucun paiement réel ne sera effectué.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={handleConfirmPayment}
                disabled={processing}
              >
                {processing ? 'Traitement...' : 'Confirmer le paiement'}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowPaymentModal(false)}
                disabled={processing}
              >
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
