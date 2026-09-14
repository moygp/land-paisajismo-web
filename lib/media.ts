import type { MediaAsset } from '@/content/types'

export type MediaSize = 'full' | 'wide' | 'half' | 'small'
export type GridSize = 'L' | 'M' | 'S'

/**
 * Composición por resolución (manual v1.2 §07): una imagen nunca se muestra por encima de 1.2× su ancho real.
 * ≥ 1400 px → 12 columnas · 900–1399 → 8 · 600–899 → 6 · < 600 → 4.
 */
export function sizeFor(media: MediaAsset): MediaSize {
  const w = media.width
  if (w >= 1400) return 'full'
  if (w >= 900) return 'wide'
  if (w >= 600) return 'half'
  return 'small'
}

/** Tamaño de tarjeta en el índice: L 8 col · M 6 col · S 4 col. */
export function gridSizeFor(media: MediaAsset): GridSize {
  const w = media.width
  if (w >= 1100) return 'L'
  if (w >= 700) return 'M'
  return 'S'
}

/** Ancho máximo de render (px CSS) para respetar la regla de 1.2×. */
export function maxRenderWidth(media: MediaAsset) {
  return Math.round(media.width * 1.2)
}
