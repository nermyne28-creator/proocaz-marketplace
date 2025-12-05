import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, AlertTriangle, XCircle, Clock, RefreshCw, Shield, Server, Database, Globe } from 'lucide-react'

export const metadata = {
    title: 'État du Service – ProOccaz',
    description: 'Consultez l\'état en temps réel de nos services et l\'historique des incidents.',
    alternates: { canonical: '/etat-service' },
}

const services = [
    { name: 'Site Web', status: 'operational', icon: Globe, uptime: '99.98%' },
    { name: 'API', status: 'operational', icon: Server, uptime: '99.95%' },
    { name: 'Base de données', status: 'operational', icon: Database, uptime: '99.99%' },
    { name: 'Paiements', status: 'operational', icon: Shield, uptime: '99.97%' },
    { name: 'Messagerie', status: 'operational', icon: RefreshCw, uptime: '99.94%' },
]

const incidents = [
    {
        date: '28 Nov 2024',
        title: 'Maintenance planifiée',
        status: 'resolved',
        description: 'Mise à jour de l\'infrastructure - Aucun impact utilisateur.',
        duration: '15 min',
    },
    {
        date: '15 Nov 2024',
        title: 'Lenteur temporaire',
        status: 'resolved',
        description: 'Pic de trafic exceptionnel ayant causé des ralentissements.',
        duration: '45 min',
    },
    {
        date: '02 Nov 2024',
        title: 'Maintenance base de données',
        status: 'resolved',
        description: 'Migration vers une infrastructure plus performante.',
        duration: '2h',
    },
]

function StatusBadge({ status }) {
    const config = {
        operational: { icon: CheckCircle2, label: 'Opérationnel', class: 'text-green-500 bg-green-500/10' },
        degraded: { icon: AlertTriangle, label: 'Dégradé', class: 'text-yellow-500 bg-yellow-500/10' },
        outage: { icon: XCircle, label: 'Panne', class: 'text-red-500 bg-red-500/10' },
        resolved: { icon: CheckCircle2, label: 'Résolu', class: 'text-green-500 bg-green-500/10' },
    }
    const { icon: Icon, label, class: className } = config[status]
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${className}`}>
            <Icon className="w-4 h-4" />
            {label}
        </span>
    )
}

export default function EtatServicePage() {
    const allOperational = services.every(s => s.status === 'operational')

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Status Banner */}
                <section className={`py-12 ${allOperational ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
                    <div className="container text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            {allOperational ? (
                                <CheckCircle2 className="w-12 h-12 text-green-500" />
                            ) : (
                                <AlertTriangle className="w-12 h-12 text-yellow-500" />
                            )}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            {allOperational ? 'Tous les systèmes sont opérationnels' : 'Certains services sont dégradés'}
                        </h1>
                        <p className="text-muted-foreground flex items-center justify-center gap-2">
                            <Clock className="w-4 h-4" />
                            Dernière mise à jour : {new Date().toLocaleString('fr-FR')}
                        </p>
                    </div>
                </section>

                {/* Services Status */}
                <section className="container py-12">
                    <h2 className="text-2xl font-bold mb-6">État des services</h2>
                    <div className="space-y-3">
                        {services.map((service) => (
                            <Card key={service.name} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                            <service.icon className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{service.name}</p>
                                            <p className="text-sm text-muted-foreground">Uptime 30j : {service.uptime}</p>
                                        </div>
                                    </div>
                                    <StatusBadge status={service.status} />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Uptime Stats */}
                <section className="bg-muted/50 py-12">
                    <div className="container">
                        <h2 className="text-2xl font-bold mb-6 text-center">Disponibilité globale</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <p className="text-4xl font-bold text-green-500">99.97%</p>
                                    <p className="text-muted-foreground mt-1">30 derniers jours</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <p className="text-4xl font-bold text-primary">99.95%</p>
                                    <p className="text-muted-foreground mt-1">90 derniers jours</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <p className="text-4xl font-bold text-primary">99.94%</p>
                                    <p className="text-muted-foreground mt-1">12 derniers mois</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Incident History */}
                <section className="container py-12">
                    <h2 className="text-2xl font-bold mb-6">Historique des incidents</h2>
                    <div className="space-y-4">
                        {incidents.map((incident, i) => (
                            <Card key={i} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                                        <div>
                                            <h3 className="font-semibold text-lg">{incident.title}</h3>
                                            <p className="text-sm text-muted-foreground">{incident.date} • Durée : {incident.duration}</p>
                                        </div>
                                        <StatusBadge status={incident.status} />
                                    </div>
                                    <p className="text-muted-foreground">{incident.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Subscribe to Updates */}
                <section className="bg-primary/5 py-12">
                    <div className="container max-w-2xl text-center">
                        <h2 className="text-2xl font-bold mb-4">Restez informé</h2>
                        <p className="text-muted-foreground mb-6">
                            Recevez des notifications en cas d'incident ou de maintenance planifiée.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                            >
                                S'abonner aux alertes
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
