import React from 'react';

export const metadata = {
    title: "Centre d'aide – OccaSync",
    description: "Centre d'aide complet avec FAQ, guides et ressources pour vous assister dans l'utilisation de la marketplace B2B d'OccaSync."
};

export default function CentreDAidePage() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-8">
            <div className="container mx-auto max-w-3xl bg-white rounded-xl shadow-lg p-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Centre d'aide</h1>
                <p className="text-lg text-gray-600 mb-4">
                    Retrouvez les réponses aux questions les plus fréquentes, des guides pas à pas et des tutoriels vidéo pour vous accompagner.
                </p>
                <p className="text-gray-500">
                    (Contenu à venir – liste d'articles, recherche, filtres.)
                </p>
            </div>
        </section>
    );
}
