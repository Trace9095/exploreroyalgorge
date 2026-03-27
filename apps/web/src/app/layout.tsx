import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { ConsentAwareAnalytics } from '@/components/ConsentAwareAnalytics'
import { CookieConsent } from '@/components/cookie-consent'
import './globals.css'

const APP_URL = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://exploreroyalgorge.com'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Explore Royal Gorge — Canon City, Colorado Adventure Directory',
    template: '%s | Explore Royal Gorge',
  },
  description:
    'The Royal Gorge adventure directory — rafting, ziplines, hiking, rock climbing, helicopter tours, camping, and more near Canon City, Colorado.',
  keywords: [
    'Royal Gorge adventures',
    'Canon City Colorado',
    'whitewater rafting Royal Gorge',
    'zipline Royal Gorge',
    'hiking Canon City',
    'rock climbing Shelf Road',
    'Royal Gorge Bridge Park',
    'Colorado adventure directory',
    'things to do Royal Gorge',
  ],
  authors: [{ name: 'Explore Royal Gorge' }],
  openGraph: {
    type: 'website',
    siteName: 'Explore Royal Gorge',
    locale: 'en_US',
    url: APP_URL,
    title: 'Explore Royal Gorge — Canon City, Colorado Adventure Directory',
    description: 'The Royal Gorge adventure directory — rafting, ziplines, hiking, rock climbing, helicopter tours, camping, and more near Canon City, Colorado.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Explore Royal Gorge' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@exploreroyalgorge',
    title: 'Explore Royal Gorge — Canon City, Colorado Adventure Directory',
    description: 'Rafting, ziplines, hiking, rock climbing, helicopter tours, and more near Canon City, Colorado.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: '7jc12-lVG5f_urymoqzGqftRCjj_5iFngU0PSXzXdPI',
  },
}

export const viewport: Viewport = {
  themeColor: '#0D1117',
  width: 'device-width',
  initialScale: 1,
}

const JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://exploreroyalgorge.com",
  "name": "Explore Royal Gorge",
  "description": "Discover adventures, attractions, and experiences at the Royal Gorge and Canon City, Colorado."
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSONLD }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground antialiased`}>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
        <GoogleAnalytics />
        <ConsentAwareAnalytics />
        <CookieConsent />
      </body>
    </html>
  )
}
// GA4 + GSC v3 - 2026-03-24
