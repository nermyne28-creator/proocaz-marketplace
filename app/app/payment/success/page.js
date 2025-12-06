'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package, ArrowRight, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sessionId = searchParams.get('session_id');
    const listingId = searchParams.get('listing');

    useEffect(() => {
        if (!sessionId) {
            setError('Session de paiement invalide');
            setLoading(false);
            return;
        }

        // Celebrate!
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        setLoading(false);
    }, [sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center p-4">
                    <Card className="max-w-md w-full text-center">
                        <CardContent className="pt-8 pb-8">
                            <p className="text-red-500 mb-4">{error}</p>
                            <Link href="/">
                                <Button>Retour à l'accueil</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 flex items-center justify-center p-4">
                <Card className="max-w-lg w-full">
                    <CardContent className="pt-8 pb-8 text-center">
                        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>

                        <h1 className="text-3xl font-bold text-green-600 mb-2">
                            Paiement réussi ! 🎉
                        </h1>

                        <p className="text-muted-foreground mb-6">
                            Merci pour votre achat sur ProOccaz. Le vendeur a été notifié et vous recevrez un email de confirmation.
                        </p>

                        <div className="bg-muted/50 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <Package className="h-4 w-4" />
                                <span>Le vendeur va préparer votre commande</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Link href="/dashboard">
                                <Button className="w-full">
                                    Voir mes achats
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/search">
                                <Button variant="outline" className="w-full">
                                    Continuer mes achats
                                </Button>
                            </Link>
                        </div>

                        <p className="text-xs text-muted-foreground mt-6">
                            Transaction #{sessionId?.slice(-8)}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Footer />
        </div>
    );
}
