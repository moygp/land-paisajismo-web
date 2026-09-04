import { ImageResponse } from 'next/og'
import { WORDMARK_PATH, WORDMARK_VIEWBOX } from '@/components/Wordmark'
import { site } from '@/content/site'

export const alt = 'LAND · Arquitectura de paisaje para el clima del noreste'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Imagen Open Graph: Verde LAND, wordmark en negativo y frase del manual. Sin fotografía (portada de propuesta, manual §08). */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#337044', color: '#fff', padding: '72px' }}>
        <svg width="640" height="173" viewBox={WORDMARK_VIEWBOX} style={{ marginTop: 60 }}>
          <path d={WORDMARK_PATH} fill="#fff" fillRule="evenodd" />
        </svg>
        <div style={{ marginTop: 44, fontSize: 34, lineHeight: 1.25, width: 800, display: 'flex' }}>{site.tagline} {site.address.city}, {site.address.region}.</div>
        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.22)', fontSize: 15, letterSpacing: 2, display: 'flex' }}>
          LANDPAISAJISMO.MX · DISEÑO Y OBRA
        </div>
      </div>
    ),
    size,
  )
}
