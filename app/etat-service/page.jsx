import React from 'react';

export const metadata = {
    title: 'État du service – OccaSync',
    description: 'Consultez l\'état actuel des services de la marketplace B2B d\'OccaSync, incluant la disponibilité du serveur et les incidents récents.'
};

export default function EtatServicePage() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-200 via-white to-gray-300 p-8">
            <div className="container mx-auto max-w-2xl bg-white rounded-xl shadow-lg p-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">État du service</h1>
                <p className="text-lg text-gray-600 mb-4">
                    Aucun incident majeur signalé. Tous les services fonctionnent normalement.
                </p>
                <p className="text-gray-500">
                    Cette section sera mise à jour automatiquement via notre système de monitoring.
                </p>
            </div>
        </section>
    );
}
