import React from 'react';

export const metadata = {
    title: 'Parcourir les annonces – OccaSync',
    description: 'Explorez toutes les annonces d’équipements d’occasion disponibles sur la marketplace B2B d’OccaSync.'
};

export default function AnnoncesPage() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-8">
            <div className="container mx-auto max-w-4xl bg-white rounded-xl shadow-lg p-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Parcourir les annonces</h1>
                <p className="text-lg text-gray-600 mb-4">
                    Bienvenue sur la page de recherche d’annonces. Vous pouvez filtrer les équipements par catégorie, prix, localisation et état.
                </p>
                <p className="text-gray-500">
                    Cette zone sera bientôt enrichie d’un moteur de recherche avancé, de filtres dynamiques et d’une pagination fluide.
                </p>
            </div>
        </section>
    );
}
