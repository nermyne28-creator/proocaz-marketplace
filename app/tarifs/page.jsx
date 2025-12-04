import React from 'react';

export const metadata = {
    title: 'Tarifs – OccaSync',
    description: 'Découvrez les tarifs transparents de la marketplace B2B d’OccaSync pour les vendeurs et les acheteurs.'
};

export default function TarifsPage() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 p-8">
            <div className="container mx-auto max-w-3xl bg-white rounded-xl shadow-lg p-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Tarifs</h1>
                <p className="text-lg text-gray-600 mb-4">
                    Nous proposons une tarification claire et sans surprise pour chaque transaction.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Frais d’inscription :</strong> Gratuit.</li>
                    <li><strong>Commission vendeur :</strong> 5 % du prix de vente.</li>
                    <li><strong>Frais de paiement :</strong> 2,5 % + 0,30 € par transaction (Stripe).</li>
                    <li><strong>Abonnement premium :</strong> 29 € / mois pour des fonctionnalités avancées.</li>
                </ul>
                <p className="mt-6 text-gray-500">
                    Tous les tarifs sont soumis à la TVA applicable. Consultez nos <a href="/cgu-cgv" className="text-primary underline">CGU / CGV</a> pour plus de détails.
                </p>
            </div>
        </section>
    );
}
