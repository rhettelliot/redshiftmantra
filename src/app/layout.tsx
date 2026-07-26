import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['200', '400', '500', '600', '700'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Red Shift Mantra',
  metadataBase: new URL('https://redshiftmantra.vercel.app'),
  description: 'The geometry of sound. The transmutation of matter. Electronic / Synthwave cosmic art by Manteis Recordings.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Red Shift Mantra',
    description: 'Electronic / Synthwave — Manteis Recordings',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 1200, alt: 'Red Shift Mantra — Manteis Recordings' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Red Shift Mantra',
    description: 'Electronic / Synthwave — Manteis Recordings',
    images: ['/og.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-[#0D0F12] text-[#9EA4B0] antialiased">
        <div className="grain" />
        <a
          href="#main"
          className="skip-link"
        >
          Skip to main content
        </a>
        <noscript>
          <style>{`
            nav, .hero-badge, .hero-title, .hero-tagline, .hero-scroll {
              opacity: 1 !important;
            }
          `}</style>
        </noscript>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
