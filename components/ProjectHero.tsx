import type { MediaAsset } from '@/content/types'
import { MediaFrame } from './MediaFrame'

/** Apertura de ficha (v1.2): imagen grande a ancho de retícula, sin texto superpuesto; el título va debajo. */
export function ProjectHero({ media }: { media: MediaAsset }) {
  return (
    <section className="phero" data-header-theme="light">
      <MediaFrame media={{ ...media, caption: undefined }} sizes="(min-width: 48rem) calc(100vw - 3rem), 100vw" priority caption={false} />
    </section>
  )
}
