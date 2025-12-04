import React from 'react';

export const metadata = {
    title: 'Vendre un équipement – OccaSync',
    description: 'Publiez votre équipement d’occasion sur la marketplace B2B d’OccaSync et atteignez des acheteurs qualifiés.'
};

export default function VendreEquipmentPage() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-blue-100 p-8">
            <div className="container mx-auto max-w-3xl bg-white rounded-xl shadow-lg p-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Vendre un équipement</h1>
                <p className="text-lg text-gray-600 mb-4">
                    Vous avez un équipement d’occasion à vendre ? Créez votre annonce en quelques clics et bénéficiez d’une visibilité maximale auprès de professionnels.
                </p>
                <p className="text-gray-500">
                    Cette page sera prochainement enrichie d’un formulaire complet avec téléchargement d’images, description détaillée, prix, localisation, etc.
                </p>
            </div>
        </section>
    );
}
