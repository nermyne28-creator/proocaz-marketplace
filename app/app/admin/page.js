'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Users, Package, CreditCard, ShieldCheck, Ban, Trash2 } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetchUser(token);
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      
      if (data.id) {
        if (data.role !== 'admin') {
          toast.error('Accès réservé aux administrateurs');
          router.push('/dashboard');
          return;
        }
        setUser(data);
        fetchAllData(token);
      } else {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      router.push('/auth/login');
    }
  };

  const fetchAllData = async (token) => {
    try {
      const [usersRes, listingsRes, transactionsRes] = await Promise.all([
        fetch('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/listings', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/transactions', { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const usersData = await usersRes.json();
      const listingsData = await listingsRes.json();
      const transactionsData = await transactionsRes.json();

      setUsers(usersData.users || []);
      setListings(listingsData.listings || []);
      setTransactions(transactionsData.transactions || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUser = async (userId, verified) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/verify-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, verified }),
      });

      if (response.ok) {
        toast.success(verified ? 'Utilisateur vérifié' : 'Vérification annulée');
        setUsers(users.map((u) => (u.id === userId ? { ...u, verified } : u)));
      } else {
        toast.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      toast.error('Erreur réseau');
    }
  };

  const handleModerateListing = async (listingId, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/moderate-listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId, status }),
      });

      if (response.ok) {
        toast.success('Annonce modérée');
        setListings(listings.map((l) => (l.id === listingId ? { ...l, status } : l)));
      } else {
        toast.error('Erreur lors de la modération');
      }
    } catch (error) {
      toast.error('Erreur réseau');
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

  if (loading || !user) {
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Panel d'Administration</h1>
          <p className="text-muted-foreground">Gestion de la plateforme OccaSync</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Utilisateurs</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Annonces</p>
                  <p className="text-2xl font-bold">{listings.length}</p>
                </div>
                <Package className="h-8 w-8 text-secondary" />
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
                <CreditCard className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Chiffre d'affaires</p>
                  <p className="text-2xl font-bold">
                    {formatPrice(transactions.reduce((acc, t) => acc + t.amount, 0))}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="listings">Annonces</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{u.company}</p>
                          {u.verified && (
                            <Badge variant="success">
                              <ShieldCheck className="h-3 w-3 mr-1" />
                              Vérifié
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{u.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Rôle: {u.role} | Inscrit le {formatDate(u.createdAt)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {u.verified ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerifyUser(u.id, false)}
                          >
                            <Ban className="h-4 w-4 mr-1" />
                            Retirer vérification
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleVerifyUser(u.id, true)}
                          >
                            <ShieldCheck className="h-4 w-4 mr-1" />
                            Vérifier
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Listings Tab */}
          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des annonces</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <div
                      key={listing.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          {listing.images?.[0] ? (
                            <img
                              src={listing.images[0]}
                              alt={listing.title}
                              className="w-full h-full object-cover"
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
                            {formatPrice(listing.price)} | {listing.category}
                          </p>
                          <div className="flex gap-2 mt-1">
                            <Badge>{listing.status}</Badge>
                            <Badge variant="outline">{listing.condition}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {listing.status === 'active' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleModerateListing(listing.id, 'suspended')}
                          >
                            <Ban className="h-4 w-4 mr-1" />
                            Suspendre
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleModerateListing(listing.id, 'active')}
                          >
                            <ShieldCheck className="h-4 w-4 mr-1" />
                            Activer
                          </Button>
                        )}
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Toutes les transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-semibold">{transaction.invoiceNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          Acheteur: {transaction.buyerId.substring(0, 8)}... | Vendeur:{' '}
                          {transaction.sellerId.substring(0, 8)}...
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(transaction.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{formatPrice(transaction.amount)}</p>
                        <Badge
                          variant={transaction.status === 'paid' ? 'success' : 'warning'}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
