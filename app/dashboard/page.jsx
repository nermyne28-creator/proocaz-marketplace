import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata = {
    title: 'Dashboard – OccaSync',
    description: 'User dashboard for managing listings and account settings.'
};

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <section className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-8">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p className="text-gray-700">Bienvenue ! Vous êtes connecté et pouvez accéder à votre tableau de bord.</p>
                {/* Add future dashboard widgets here */}
            </section>
        </ProtectedRoute>
    );
}
