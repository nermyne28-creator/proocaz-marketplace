'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { User, Building2, Mail, Lock, Save, Loader2, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    const [formData, setFormData] = useState({
        company: '',
        siret: '',
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

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
                setUser(data);
                setFormData({
                    company: data.company || '',
                    siret: data.siret || '',
                });
            } else {
                router.push('/auth/login');
            }
        } catch (error) {
            toast.error('Erreur de chargement');
            router.push('/auth/login');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Profil mis à jour !');
                fetchUser(token);
            } else {
                const data = await response.json();
                toast.error(data.error || 'Erreur lors de la mise à jour');
            }
        } catch (error) {
            toast.error('Erreur réseau');
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword.length < 6) {
            toast.error('Le nouveau mot de passe doit faire au moins 6 caractères');
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas');
            return;
        }

        setChangingPassword(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                }),
            });

            if (response.ok) {
                toast.success('Mot de passe modifié !');
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                const data = await response.json();
                toast.error(data.error || 'Erreur lors du changement');
            }
        } catch (error) {
            toast.error('Erreur réseau');
        } finally {
            setChangingPassword(false);
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
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Mon profil</h1>
                        <p className="text-muted-foreground">Gérez vos informations personnelles</p>
                    </div>

                    {/* Profile Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Informations du compte
                            </CardTitle>
                            <CardDescription>
                                Votre email ne peut pas être modifié
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSaveProfile} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        Email
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="email"
                                            value={user.email}
                                            disabled
                                            className="bg-muted"
                                        />
                                        {user.emailVerified && (
                                            <span className="flex items-center text-green-600 text-sm">
                                                <ShieldCheck className="h-4 w-4 mr-1" />
                                                Vérifié
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="company" className="text-sm font-medium flex items-center gap-2">
                                        <Building2 className="h-4 w-4" />
                                        Nom de l'entreprise
                                    </label>
                                    <Input
                                        id="company"
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        placeholder="Ma Société SAS"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="siret" className="text-sm font-medium">
                                        Numéro SIRET
                                    </label>
                                    <Input
                                        id="siret"
                                        type="text"
                                        value={formData.siret}
                                        onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                                        placeholder="12345678901234"
                                        maxLength={14}
                                    />
                                </div>

                                <Button type="submit" disabled={saving}>
                                    {saving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Enregistrement...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Enregistrer
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Change Password */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-5 w-5" />
                                Modifier le mot de passe
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleChangePassword} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="currentPassword" className="text-sm font-medium">
                                        Mot de passe actuel
                                    </label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="newPassword" className="text-sm font-medium">
                                        Nouveau mot de passe
                                    </label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                                        Confirmer le nouveau mot de passe
                                    </label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        required
                                    />
                                </div>

                                <Button type="submit" variant="outline" disabled={changingPassword}>
                                    {changingPassword ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Modification...
                                        </>
                                    ) : (
                                        'Changer le mot de passe'
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Account Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Statistiques du compte</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="text-2xl font-bold">{user.role === 'admin' ? 'Admin' : 'Utilisateur'}</p>
                                    <p className="text-sm text-muted-foreground">Rôle</p>
                                </div>
                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="text-2xl font-bold">
                                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Membre depuis</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}
