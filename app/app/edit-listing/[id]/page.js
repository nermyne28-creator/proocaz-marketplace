'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

const categories = [
    { id: 'informatique', name: 'Informatique & IT' },
    { id: 'logistique', name: 'Logistique' },
    { id: 'btp', name: 'BTP & Construction' },
    { id: 'industrie', name: 'Industrie' },
    { id: 'mobilier', name: 'Mobilier & Bureau' },
    { id: 'autre', name: 'Autres' },
];

const conditions = [
    { id: 'excellent', name: 'Excellent état' },
    { id: 'good', name: 'Bon état' },
    { id: 'fair', name: 'État correct' },
];

export default function EditListingPage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'informatique',
        price: '',
        condition: 'good',
        location: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }
        fetchListing();
    }, [params.id]);

    const fetchListing = async () => {
        try {
            const response = await fetch(`/api/listings/${params.id}`);
            const data = await response.json();

            if (data.listing) {
                const listing = data.listing;
                setFormData({
                    title: listing.title || '',
                    description: listing.description || '',
                    category: listing.category || 'informatique',
                    price: listing.price?.toString() || '',
                    condition: listing.condition || 'good',
                    location: listing.location || '',
                });
            } else {
                toast.error('Annonce non trouvée');
                router.push('/dashboard');
            }
        } catch (error) {
            toast.error('Erreur de chargement');
            router.push('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/listings/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                }),
            });

            if (response.ok) {
                toast.success('Annonce modifiée avec succès !');
                router.push('/dashboard');
            } else {
                const data = await response.json();
                toast.error(data.error || 'Erreur lors de la modification');
            }
        } catch (error) {
            toast.error('Erreur réseau');
        } finally {
            setSaving(false);
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

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 container py-8">
                <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour au dashboard
                </Link>

                <div className="max-w-3xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Modifier l'annonce</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Title */}
                                <div className="space-y-2">
                                    <label htmlFor="title" className="text-sm font-medium">
                                        Titre de l'annonce *
                                    </label>
                                    <Input
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="Ex: Ordinateur portable Dell Latitude 5420"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label htmlFor="description" className="text-sm font-medium">
                                        Description *
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={5}
                                        placeholder="Décrivez votre matériel en détail..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    />
                                </div>

                                {/* Category and Condition */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="category" className="text-sm font-medium">
                                            Catégorie *
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="condition" className="text-sm font-medium">
                                            État *
                                        </label>
                                        <select
                                            id="condition"
                                            name="condition"
                                            value={formData.condition}
                                            onChange={handleChange}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        >
                                            {conditions.map((cond) => (
                                                <option key={cond.id} value={cond.id}>
                                                    {cond.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Price and Location */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="price" className="text-sm font-medium">
                                            Prix HT (€) *
                                        </label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            placeholder="1500.00"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="location" className="text-sm font-medium">
                                            Localisation
                                        </label>
                                        <Input
                                            id="location"
                                            name="location"
                                            type="text"
                                            placeholder="Paris, France"
                                            value={formData.location}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="flex gap-4">
                                    <Button type="submit" className="flex-1" disabled={saving}>
                                        {saving ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Enregistrement...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Enregistrer les modifications
                                            </>
                                        )}
                                    </Button>
                                    <Link href="/dashboard" className="flex-1">
                                        <Button type="button" variant="outline" className="w-full">
                                            Annuler
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}
