import './globals.css';
import { Toaster } from 'sonner';
import CookieConsent from '@/components/CookieConsent';
import CookieLoader from '@/components/CookieLoader';
import AnalyticsLoader from '@/components/AnalyticsLoader';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata = {
  title: 'OccaSync - Marketplace B2B d\'occasion',
  description: 'Achetez et vendez l\'occasion pro. Simplement.',
  keywords: ['OccaSync', 'occasion', 'B2B', 'Marketplace', 'matériel professionnel', 'annonces'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'OccaSync - Marketplace B2B d\'occasion',
    description: 'Achetez et vendez l\'occasion pro. Simplement.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    siteName: 'OccaSync',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OccaSync',
    description: 'Marketplace B2B d\'occasion',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
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
