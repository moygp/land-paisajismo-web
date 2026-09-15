import localFont from 'next/font/local'

/**
 * Sistema tipográfico v2.1 (dirección de arte editorial, sep 2026). Licencias libres (OFL):
 * Instrument Serif — titulares editoriales (H1, H2, nombres de proyecto, citas). Nunca en texto pequeño.
 * Inter — capa funcional: cuerpo, introducciones, navegación, botones, subtítulos.
 * Cousine — metadatos: etiquetas, numeraciones, pies de foto, datos técnicos. Nunca en cuerpo.
 * Auto-alojadas en app/fonts (woff2, subconjunto latino) con next/font/local.
 */
export const serif = localFont({
  src: [
    { path: './fonts/InstrumentSerif-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/InstrumentSerif-Italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--f-serif',
  display: 'swap',
})

export const sans = localFont({
  src: [
    { path: './fonts/Inter.woff2', weight: '400 600', style: 'normal' },
    { path: './fonts/Inter-Italic.woff2', weight: '400 600', style: 'italic' },
  ],
  variable: '--f-sans',
  display: 'swap',
})

export const mono = localFont({
  src: [
    { path: './fonts/Cousine-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Cousine-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--f-mono',
  display: 'swap',
})
