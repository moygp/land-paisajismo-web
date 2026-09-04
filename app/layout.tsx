import type { Metadata, Viewport } from 'next'
import './globals.css'
import { archivo, mono, newsreader } from './fonts'
import { site } from '@/content/site'
import { cx } from '@/lib/utils'
import { HeaderModeProvider } from '@/components/HeaderModeContext'
import { SiteHeader } from '@/components/SiteHeader'
import { HeaderTheme } from '@/components/HeaderTheme'
import { RevealObserver } from '@/components/RevealObserver'
import { PageTransition } from '@/components/PageTransition'
import { SiteFooter } from '@/components/SiteFooter'
import { WordmarkSymbol } from '@/components/Wordmark'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'LAND · Arquitectura de paisaje en San Pedro Garza García',
    template: '%s · LAND',
  },
  description: site.description,
  applicationName: 'LAND',
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: 'LAND',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#337044',
}

/* Fija html[data-intro] antes del primer render: solo en portada, una vez por sesión, nunca con movimiento reducido. */
const introScript = `(function(){try{if(location.pathname==='/'&&!sessionStorage.getItem('land:intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-intro','1')}}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={cx(archivo.variable, newsreader.variable, mono.variable)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <WordmarkSymbol />
        <a className="skip" href="#contenido">
          Ir al contenido
        </a>
        <HeaderModeProvider>
          <SiteHeader />
          <HeaderTheme />
          <RevealObserver />
          <PageTransition>
            <main id="contenido" className="main">
              {children}
            </main>
            <SiteFooter />
          </PageTransition>
        </HeaderModeProvider>
        <JsonLd />
      </body>
    </html>
  )
}
