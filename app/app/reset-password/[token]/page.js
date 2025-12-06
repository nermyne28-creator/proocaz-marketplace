'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Lock, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function ResetPasswordPage() {
    const params = useParams();
    const router = useRouter();
    const [status, setStatus] = useState('form'); // form, loading, success, error
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            toast.error('Le mot de passe doit faire au moins 6 caractères');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas');
            return;
        }

        setStatus('loading');
        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: params.token, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                toast.success('Mot de passe modifié !');
                setTimeout(() => router.push('/auth/login'), 3000);
            } else {
                setStatus('error');
                toast.error(data.error || 'Lien invalide ou expiré');
            }
        } catch (error) {
            setStatus('error');
            toast.error('Erreur réseau');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="pt-8 pb-8">
                        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-green-600 mb-2">Mot de passe modifié !</h1>
                        <p className="text-muted-foreground mb-6">
                            Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
                        </p>
                        <Link href="/auth/login">
                            <Button className="w-full">Se connecter</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100 p-4">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="pt-8 pb-8">
                        <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
                            <XCircle className="h-12 w-12 text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-red-600 mb-2">Lien invalide</h1>
                        <p className="text-muted-foreground mb-6">
                            Ce lien de réinitialisation est invalide ou a expiré.
                        </p>
                        <Link href="/forgot-password">
                            <Button className="w-full">Demander un nouveau lien</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Nouveau mot de passe</CardTitle>
                    <CardDescription>
                        Choisissez un nouveau mot de passe sécurisé
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Nouveau mot de passe
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium">
                                Confirmer le mot de passe
                            </label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={status === 'loading'}>
                            {status === 'loading' ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Modification...
                                </>
                            ) : (
                                'Modifier le mot de passe'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
