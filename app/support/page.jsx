import React from 'react';

export const metadata = {
    title: 'Support – OccaSync',
    description: 'Obtenez de l\'aide, posez vos questions et recevez un support dédié pour la marketplace B2B d\'OccaSync.'
};

export default function SupportPage() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">
            <div className="container mx-auto max-w-3xl bg-white rounded-xl shadow-lg p-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Support</h1>
                <p className="text-lg text-gray-600 mb-4">
                    Vous avez besoin d\'aide ? Notre équipe de support est disponible pour répondre à vos questions concernant la plateforme, les transactions ou tout autre sujet.
                </p>
                <p className="text-gray-500">
                    (Contenu à venir – formulaire de contact, FAQ, chat en direct, etc.)
                </p>
            </div>
        </section>
    );
}
