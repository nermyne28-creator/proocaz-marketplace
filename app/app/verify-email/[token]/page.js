'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VerifyEmailPage() {
    const params = useParams();
    const router = useRouter();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('');

    useEffect(() => {
        verifyEmail();
    }, [params.token]);

    const verifyEmail = async () => {
        try {
            const response = await fetch('/api/auth/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: params.token }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage('Votre email a été vérifié avec succès !');
                // Redirect to login after 3 seconds
                setTimeout(() => router.push('/auth/login'), 3000);
            } else {
                setStatus('error');
                setMessage(data.error || 'Lien de vérification invalide ou expiré');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Erreur de connexion au serveur');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {status === 'verifying' && (
                    <>
                        <Loader2 className="h-16 w-16 mx-auto text-primary animate-spin mb-6" />
                        <h1 className="text-2xl font-bold mb-2">Vérification en cours...</h1>
                        <p className="text-muted-foreground">Veuillez patienter</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-green-600 mb-2">Email vérifié !</h1>
                        <p className="text-muted-foreground mb-6">{message}</p>
                        <p className="text-sm text-muted-foreground mb-4">
                            Redirection vers la connexion...
                        </p>
                        <Link href="/auth/login">
                            <Button className="w-full">Se connecter</Button>
                        </Link>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
                            <XCircle className="h-12 w-12 text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-red-600 mb-2">Erreur de vérification</h1>
                        <p className="text-muted-foreground mb-6">{message}</p>
                        <div className="space-y-2">
                            <Link href="/auth/register">
                                <Button variant="outline" className="w-full">S'inscrire à nouveau</Button>
                            </Link>
                            <Link href="/">
                                <Button variant="ghost" className="w-full">Retour à l'accueil</Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
