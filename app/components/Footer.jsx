'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Github, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t relative overflow-hidden">
      {/* Gradient Top Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Social */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-lg font-bold font-display">O</span>
              </div>
              <span className="text-xl font-bold font-display text-primary">OccaSync</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La première marketplace B2B dédiée aux professionnels. Achetez et vendez votre matériel d'occasion en toute confiance.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Plateforme</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/search" className="text-muted-foreground hover:text-primary transition-colors">Parcourir les annonces</Link></li>
              <li><Link href="/create-listing" className="text-muted-foreground hover:text-primary transition-colors">Vendre un équipement</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Tarifs</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog & Conseils</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">Centre d'aide</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Nous contacter</Link></li>
              <li><Link href="/status" className="text-muted-foreground hover:text-primary transition-colors">État du service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Légal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/legal/terms" className="text-muted-foreground hover:text-primary transition-colors">CGU / CGV</Link></li>
              <li><Link href="/legal/privacy" className="text-muted-foreground hover:text-primary transition-colors">Confidentialité</Link></li>
              <li><Link href="/legal/cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OccaSync. Tous droits réservés.</p>
          <div className="flex items-center space-x-6">
            <span>Fait avec ❤️ en France</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
