'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Shield, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    company: '',
    siret: '',
    role: 'buyer',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        toast.success('Compte créé avec succès !');
        router.push('/dashboard');
      } else {
        toast.error(data.error || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      toast.error('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    'Inscription 100% gratuite',
    'Publiez vos annonces en 2 minutes',
    'Transactions sécurisées',
    'Support dédié aux pros',
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Left Side - Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary p-12 flex-col justify-center text-white">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8">
            <span className="text-3xl font-bold font-display">P</span>
          </div>
          <h1 className="text-4xl font-bold font-display mb-4">Rejoignez ProOccaz</h1>
          <p className="text-lg opacity-90 mb-8">
            La marketplace B2B n°1 pour les équipements professionnels d'occasion.
          </p>
          <ul className="space-y-4">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-white/80" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>

          <Card className="border-2">
            <CardHeader className="text-center pb-2">
              <div className="lg:hidden mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-3xl font-bold text-white font-display">P</span>
              </div>
              <CardTitle className="text-2xl font-display">Créer un compte</CardTitle>
              <CardDescription>Rejoignez +2 500 entreprises sur ProOccaz</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email professionnel *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@entreprise.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Mot de passe *
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-muted-foreground">Minimum 8 caractères</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Nom de l'entreprise *
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Votre Entreprise SAS"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="siret" className="text-sm font-medium">
                    SIRET <span className="text-muted-foreground">(optionnel)</span>
                  </label>
                  <Input
                    id="siret"
                    name="siret"
                    type="text"
                    placeholder="123 456 789 00010"
                    value={formData.siret}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Je souhaite *
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="buyer">Acheter du matériel</option>
                    <option value="seller">Vendre du matériel</option>
                    <option value="both">Acheter et vendre</option>
                  </select>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? 'Création...' : 'Créer mon compte'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  En créant un compte, vous acceptez nos{' '}
                  <Link href="/cgu" className="text-primary hover:underline">CGU</Link>
                  {' '}et notre{' '}
                  <Link href="/confidentialite" className="text-primary hover:underline">Politique de confidentialité</Link>.
                </p>
              </form>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
                  <Shield className="w-4 h-4" />
                  <span>Inscription sécurisée</span>
                </div>
                <p className="text-center text-sm">
                  <span className="text-muted-foreground">Déjà un compte ? </span>
                  <Link href="/auth/login" className="text-primary font-medium hover:underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
