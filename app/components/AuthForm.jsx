'use client';
import React, { useState } from 'react';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AuthForm({ mode = 'login' }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!isSupabaseConfigured) {
        throw new Error("Supabase n'est pas configure. Ajoutez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      }

      const supabase = getSupabaseClient();
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        router.push('/auth/confirm');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {mode === 'login' ? 'Connexion' : 'Creer un compte'}
        </h2>
        {error && <p className="mb-4 text-center text-sm text-destructive">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary',
                'disabled:opacity-50'
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary',
                'disabled:opacity-50'
              )}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={cn(
              'w-full rounded-md bg-primary px-4 py-2 text-white transition hover:bg-primary/90 disabled:opacity-50',
              'flex items-center justify-center'
            )}
          >
            {loading ? 'En cours...' : mode === 'login' ? 'Se connecter' : 'Creer le compte'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {mode === 'login' ? (
            <>Pas encore de compte ? <a href="/auth/register" className="text-primary underline">S inscrire</a></>
          ) : (
            <>Deja un compte ? <a href="/auth/login" className="text-primary underline">Se connecter</a></>
          )}
        </p>
      </div>
    </section>
  );
}
