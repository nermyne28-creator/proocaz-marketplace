import React from 'react';
import AuthForm from '@/components/AuthForm';

export const metadata = {
    title: 'Créer un compte – OccaSync',
    description: 'Inscrivez-vous sur la marketplace B2B d’OccaSync pour commencer à vendre ou acheter des équipements.'
};

export default function RegisterPage() {
    return <AuthForm mode="register" />;
}
