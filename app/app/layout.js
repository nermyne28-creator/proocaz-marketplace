import './globals.css';
import { Toaster } from 'sonner';
import CookieConsent from '@/components/CookieConsent';
import CookieLoader from '@/components/CookieLoader';
import AnalyticsLoader from '@/components/AnalyticsLoader';
import ThemeProvider from '@/components/ThemeProvider';

const siteName = 'ProOccaz';
const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://prooccaz.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ProOccaz - Marketplace B2B d\'Équipements Professionnels d\'Occasion',
    template: '%s | ProOccaz',
  },
  description: 'ProOccaz est la marketplace B2B n°1 en France pour acheter et vendre des équipements professionnels d\'occasion. Matériel BTP, informatique, logistique, industrie. Transactions sécurisées entre entreprises.',
  keywords: [
    'marketplace B2B',
    'équipement professionnel occasion',
    'matériel professionnel occasion',
    'achat vente B2B',
    'matériel BTP occasion',
    'équipement industriel occasion',
    'chariot élévateur occasion',
    'informatique entreprise occasion',
    'mobilier bureau occasion',
    'économie circulaire entreprise',
    'revente matériel professionnel',
    'marketplace entreprise France',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: siteName,
    title: 'ProOccaz - La Marketplace B2B d\'Équipements d\'Occasion',
    description: 'Achetez et vendez des équipements professionnels d\'occasion entre entreprises. +2500 entreprises nous font confiance. Transactions 100% sécurisées.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ProOccaz - Marketplace B2B d\'occasion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProOccaz - Marketplace B2B d\'Équipements d\'Occasion',
    description: 'La première marketplace B2B dédiée aux équipements professionnels d\'occasion. Économisez jusqu\'à 70% sur vos achats.',
    images: ['/og-image.png'],
    creator: '@prooccaz',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'fr-FR': siteUrl,
    },
  },
  verification: {
    google: 'votre-code-verification-google',
  },
  category: 'business',
};

// JSON-LD Schema for Organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: 'Marketplace B2B d\'équipements professionnels d\'occasion',
  foundingDate: '2024',
  founders: [{ '@type': 'Person', name: 'ProOccaz Team' }],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
    addressLocality: 'Paris',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'contact@prooccaz.com',
    availableLanguage: ['French'],
  },
  sameAs: [
    'https://www.linkedin.com/company/prooccaz',
    'https://twitter.com/prooccaz',
  ],
};

// JSON-LD Schema for WebSite (enables sitelinks search box)
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors />
          <CookieConsent />
          <CookieLoader />
          <AnalyticsLoader />
        </ThemeProvider>
      </body>
    </html>
  );
}
