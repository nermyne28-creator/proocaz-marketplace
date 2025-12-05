'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Instagram, Mail, MapPin, Phone, ArrowUpRight, Sparkles } from 'lucide-react';

const footerLinks = {
  plateforme: [
    { label: 'Parcourir les annonces', href: '/search' },
    { label: 'Vendre un équipement', href: '/create-listing' },
    { label: 'Tarifs', href: '/tarifs' },
    { label: 'Blog & Conseils', href: '/blog' },
  ],
  support: [
    { label: 'Centre d\'aide', href: '/aide' },
    { label: 'Nous contacter', href: '/contact' },
    { label: 'État du service', href: '/etat-service' },
    { label: 'Support', href: '/support' },
  ],
  legal: [
    { label: 'CGU / CGV', href: '/cgu' },
    { label: 'Confidentialité', href: '/confidentialite' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Mentions légales', href: '/mentions-legales' },
  ],
  categories: [
    { label: 'Informatique & IT', href: '/search?category=informatique' },
    { label: 'BTP & Construction', href: '/search?category=btp' },
    { label: 'Logistique', href: '/search?category=logistique' },
    { label: 'Industrie', href: '/search?category=industrie' },
  ],
};

const stats = [
  { value: '2 500+', label: 'Entreprises' },
  { value: '15 000+', label: 'Annonces' },
  { value: '98%', label: 'Satisfaction' },
  { value: '< 48h', label: 'Temps de vente' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/50 border-t overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Stats Banner */}
      <div className="border-b bg-primary/5">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary font-display">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg group-hover:shadow-primary/25 transition-shadow">
                <span className="text-xl font-bold font-display">P</span>
              </div>
              <span className="text-2xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                ProOccaz
              </span>
            </Link>

            <p className="text-muted-foreground leading-relaxed max-w-sm">
              La marketplace B2B n°1 en France pour les équipements professionnels d'occasion.
              Achetez et vendez en toute confiance entre entreprises.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <a href="mailto:contact@prooccaz.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                contact@prooccaz.com
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Paris, France
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: 'https://linkedin.com/company/prooccaz', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://twitter.com/prooccaz', label: 'Twitter' },
                { icon: Instagram, href: 'https://instagram.com/prooccaz', label: 'Instagram' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Plateforme</h3>
            <ul className="space-y-3">
              {footerLinks.plateforme.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Légal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Catégories</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Restez informé
              </h3>
              <p className="text-muted-foreground text-sm">
                Recevez les meilleures opportunités et conseils pour votre entreprise.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Votre email professionnel"
                className="flex-1 md:w-64 px-4 py-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ProOccaz. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Tous les systèmes opérationnels
            </span>
            <span>Fait avec ❤️ en France</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
