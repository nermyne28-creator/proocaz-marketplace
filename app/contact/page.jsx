import React from 'react';

export const metadata = {
    title: 'Nous contacter – OccaSync',
    description: 'Contactez l\'équipe d\'OccaSync pour toute question, demande d\'assistance ou partenariat.'
};

export default function ContactPage() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-8">
            <div className="container mx-auto max-w-2xl bg-white rounded-xl shadow-lg p-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Nous contacter</h1>
                <p className="text-lg text-gray-600 mb-4">
                    Vous avez une question ou besoin d\'aide ? Remplissez le formulaire ci‑dessous et nous vous répondrons dans les plus brefs délais.
                </p>
                {/* Placeholder for contact form */}
                <div className="border border-dashed border-gray-300 rounded p-6 text-center text-gray-500">
                    Formulaire de contact à implémenter
                </div>
            </div>
        </section>
    );
}
