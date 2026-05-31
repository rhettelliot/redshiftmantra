import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Red Shift Mantra',
  description: 'The geometry of sound. The transmutation of matter. Electronic / Synthwave by Manteis Recordings.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Red Shift Mantra',
    description: 'Electronic / Synthwave — Manteis Recordings',
    type: 'website',
  },
  other: {
    'theme-color': '#000000',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${playfair.variable}`}>
      <body className="bg-void text-light antialiased">
        {/* Without JS the gate can't be dismissed and intro-animated content
            never reveals — degrade gracefully so the page stays usable. */}
        <noscript>
          <style>{`
            [aria-label="Welcome gate"] { display: none !important; }
            nav, .hero-badge, .hero-title, .hero-tagline, .hero-scroll,
            .gate-label, .gate-title, .gate-subtitle, .gate-button {
              opacity: 1 !important;
            }
          `}</style>
        </noscript>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}