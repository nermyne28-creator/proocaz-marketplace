import React from 'react';
import AuthForm from '@/components/AuthForm';

export const metadata = {
    title: 'Connexion – OccaSync',
    description: 'Connectez-vous à votre compte OccaSync pour accéder à votre tableau de bord.'
};

export default function LoginPage() {
    return <AuthForm mode="login" />;
}
