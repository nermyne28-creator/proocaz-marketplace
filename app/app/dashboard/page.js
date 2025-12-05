'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Package, ShoppingCart, MessageSquare, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetchUserData(token);
    fetchUserTransactions(token);
    fetchMessageCount(token);
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.id) {
        setUser(data);
        fetchUserListings(token, data.id);
      } else {
        router.push('/auth/login');
      }
    } catch (error) {
      toast.error('Erreur de chargement');
      router.push('/auth/login');
    }
  };

  const fetchUserListings = async (token, userId) => {
    try {
      const response = await fetch('/api/listings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const userListings = data.listings?.filter(
        (listing) => listing.sellerId === userId
      ) || [];
      setListings(userListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTransactions = async (token) => {
    try {
      const response = await fetch('/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchMessageCount = async (token) => {
    try {
      const response = await fetch('/api/messages/unread-count', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setMessageCount(data.count || 0);
    } catch (error) {
      console.error('Error fetching message count:', error);
    }
  };

  const handleDeleteListing = async (listingId) => {
    if (!confirm('Voulez-vous vraiment supprimer cette annonce ?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/listings/${listingId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success('Annonce supprimée');
        setListings(listings.filter((l) => l.id !== listingId));
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast.error('Erreur réseau');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bonjour, {user.company} !</h1>
          <p className="text-muted-foreground">Gérez vos annonces et transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mes annonces</p>
                  <p className="text-2xl font-bold">{listings.length}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                  <p className="text-2xl font-bold">{transactions.length}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Messages</p>
                  <p className="text-2xl font-bold">{messageCount}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vues totales</p>
                  <p className="text-2xl font-bold">
                    {listings.reduce((acc, l) => acc + (l.views || 0), 0)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Listings */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Mes annonces</CardTitle>
            <Link href="/create-listing">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle annonce
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
              </div>
            ) : listings.length > 0 ? (
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="relative w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        {listing.images?.[0] ? (
                          <Image
                            src={listing.images[0]}
                            alt={listing.title}
                            fill
                            sizes="120px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Package className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {listing.views || 0} vues
                        </p>
                        <p className="text-lg font-bold text-primary mt-1">
                          {formatPrice(listing.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>{listing.status}</Badge>
                      <Link href={`/edit-listing/${listing.id}`}>
                        <Button variant="outline" size="sm" title="Modifier">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteListing(listing.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Vous n'avez pas encore d'annonces</p>
                <Link href="/create-listing">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Créer votre première annonce
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions récentes</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">Transaction {transaction.invoiceNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className="font-bold">{formatPrice(transaction.amount)}</p>
                        <Badge variant={transaction.status === 'paid' ? 'success' : 'warning'}>
                          {transaction.status}
                        </Badge>
                      </div>
                      {transaction.status === 'paid' && (
                        <a
                          href={`/api/invoices/${transaction.id}`}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm">
                            📄 Facture
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <ShoppingCart className="h-16 w-16 mx-auto mb-4" />
                <p>Aucune transaction pour le moment</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
