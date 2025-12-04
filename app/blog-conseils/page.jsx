import React from 'react';

export const metadata = {
    title: 'Blog & Conseils – OccaSync',
    description: 'Articles, guides et conseils pour optimiser vos ventes et achats d’équipements d’occasion sur la marketplace B2B d’OccaSync.'
};

export default function BlogConseilsPage() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-8">
            <div className="container mx-auto max-w-4xl bg-white rounded-xl shadow-lg p-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Blog &amp; Conseils</h1>
                <p className="text-lg text-gray-600 mb-4">
                    Bienvenue dans notre espace de connaissances. Vous y trouverez des articles, des études de cas et des guides pratiques pour vous aider à tirer le meilleur parti de la plateforme.
                </p>
                <p className="text-gray-500">
                    (Contenu à venir – cette zone sera remplie avec des articles dynamiques alimentés par un CMS ou un système de markdown.)
                </p>
            </div>
        </section>
    );
}
