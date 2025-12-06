'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Veuillez entrer votre email');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSent(true);
                toast.success('Email envoyé !');
            } else {
                toast.error(data.error || 'Erreur lors de l\'envoi');
            }
        } catch (error) {
            toast.error('Erreur réseau');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <Mail className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle>Mot de passe oublié</CardTitle>
                        <CardDescription>
                            Entrez votre adresse email pour recevoir un lien de réinitialisation
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {sent ? (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                </div>
                                <p className="text-muted-foreground">
                                    Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Vérifiez également vos spams.
                                </p>
                                <Link href="/auth/login">
                                    <Button variant="outline" className="w-full mt-4">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Retour à la connexion
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Adresse email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="vous@entreprise.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Envoi en cours...
                                        </>
                                    ) : (
                                        'Envoyer le lien'
                                    )}
                                </Button>

                                <div className="text-center">
                                    <Link href="/auth/login" className="text-sm text-primary hover:underline">
                                        <ArrowLeft className="inline mr-1 h-3 w-3" />
                                        Retour à la connexion
                                    </Link>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Footer />
        </div>
    );
}
