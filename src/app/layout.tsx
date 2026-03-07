import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ClientProviders } from '@/components/ClientProviders';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://agt-equipment.com'),
  title: {
    default: 'AGT Equipment - Mini Excavators & Skid Steers | Factory Direct',
    template: '%s | AGT Equipment',
  },
  description: 'AGT Industrial mini excavators and skid steers. Factory direct pricing. 1-4 ton excavators with Kubota and Rato engines. US warehouses in CA and IL.',
  keywords: ['mini excavator', 'skid steer', 'compact excavator', 'AGT Industrial', 'mini skid steer loader', 'excavator attachments'],
  authors: [{ name: 'AGT Industrial Inc.' }],
  creator: 'AGT Industrial Inc.',
  publisher: 'AGT Industrial Inc.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agt-equipment.com',
    siteName: 'AGT Equipment',
    title: 'AGT Equipment - Mini Excavators & Skid Steers',
    description: 'Factory direct mini excavators and skid steers. 1-4 ton excavators with Kubota and Rato engines.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AGT Equipment - Mini Excavators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGT Equipment - Mini Excavators & Skid Steers',
    description: 'Factory direct mini excavators and skid steers. US warehouses.',
    images: ['/og-image.png'],
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
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://agt-equipment.com',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ClientProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
