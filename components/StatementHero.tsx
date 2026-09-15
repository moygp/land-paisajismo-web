import Link from 'next/link'
import { site } from '@/content/site'
import type { MediaAsset } from '@/content/types'
import { MediaFrame } from './MediaFrame'

/** Portada editorial (v2.1): metadato, titular en Instrument Serif a gran escala, fotografía desfasada del grid, texto breve y CTA discreto. */
export function StatementHero({ photo }: { photo: MediaAsset }) {
  return (
    <section className="cover grid container" data-header-theme="light">
      <p className="cover__eyebrow">
        Arquitectura de paisaje · {site.address.city} · 2026
      </p>
      <h1 className="cover__title">Diseñamos jardines que se ven mejor con los años.</h1>
      <div className="cover__media">
        <MediaFrame media={{ ...photo, caption: undefined, focalPoint: { x: 0.25, y: 0.5 } }} ratio="4 / 5" sizes="(min-width: 48rem) 44vw, 100vw" priority caption={false} />
      </div>
      <div className="cover__foot">
        <p className="cover__text">
          Cuarenta grados en verano. Menos de 600 mm de lluvia al año. Suelo calizo. El proyecto parte de esas tres condiciones.
        </p>
        <Link href="/proyectos" className="cta lnk">
          Ver proyectos
        </Link>
        <p className="cover__meta">Diseño y obra · {site.address.regionShort}</p>
      </div>
    </section>
  )
}
