import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: '2MKA — Électricité Générale à Albertville | Savoie',
    template: '%s | 2MKA Électricité',
  },
  description: 'Électricien professionnel à Albertville, Savoie. Installation électrique, mise en conformité, dépannage rapide et maintenance.',
  keywords: ['électricien Albertville', 'électricité générale Savoie', 'installation électrique', 'dépannage électrique', 'mise en conformité', 'tableau électrique', '2MKA', '73200'],
  authors: [{ name: '2MKA' }],
  openGraph: {
    title: '2MKA — Électricité Générale à Albertville',
    description: 'Votre électricien de confiance en Savoie.',
    url: 'https://2mka.com',
    siteName: '2MKA',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-dark text-text font-sans antialiased">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

