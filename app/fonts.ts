import localFont from 'next/font/local'

/**
 * Sistema tipográfico v1.3 (propuesta, uso gratuito, licencia OFL):
 * Anybody (ETC) en su eje ancho, wdth 125 — display, la «horizontalidad» del manual con eje nativo.
 * Fraunces (Undercase Type) con eje óptico, SOFT 0 y WONK 0 — texto; cursiva para nombres botánicos.
 * Geist Mono (Vercel) — datos, cotas y etiquetas.
 * Archivos auto-alojados en app/fonts, subconjunto latino, cargados con next/font/local.
 */
export const archivo = localFont({
  src: [
    { path: './fonts/Anybody-wdth125.woff2', weight: '300 800', style: 'normal' },
    { path: './fonts/Anybody-Italic-wdth125.woff2', weight: '300 800', style: 'italic' },
  ],
  variable: '--f-archivo',
  display: 'swap',
})

export const newsreader = localFont({
  src: [
    { path: './fonts/Fraunces.woff2', weight: '300 600', style: 'normal' },
    { path: './fonts/Fraunces-Italic.woff2', weight: '300 600', style: 'italic' },
  ],
  variable: '--f-newsreader',
  display: 'swap',
})

export const mono = localFont({
  src: './fonts/GeistMono.woff2',
  weight: '400 500',
  variable: '--f-mono',
  display: 'swap',
})
