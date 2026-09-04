import { Archivo, JetBrains_Mono, Newsreader } from 'next/font/google'

/**
 * Familias del manual v1.1, servidas por next/font/google (auto-alojadas en el build, sin peticiones a Google en runtime).
 * Archivo se usa en su eje ancho (wdth 112, manual: 106–118) mediante `font-stretch: 112%` en globals.css.
 */
export const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--f-archivo',
  display: 'swap',
})

/** Newsreader con eje óptico; la cursiva se reserva a nombres botánicos. */
export const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--f-newsreader',
  display: 'swap',
})

/** JetBrains Mono para datos, cotas y etiquetas. */
export const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--f-mono',
  display: 'swap',
})
