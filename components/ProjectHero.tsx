import type { Project } from '@/content/types'
import { renderInline } from '@/lib/inline'
import { MediaFrame } from './MediaFrame'

/**
 * Apertura de ficha (v2.1): bloque de texto a la izquierda (metadato, titular editorial, síntesis)
 * y fotografía a la derecha desbordando el margen, en proporción 5/7. En móvil: metadato, titular, foto, texto.
 */
export function ProjectHero({ project, index }: { project: Project; index: number }) {
  const p = project
  const eyebrow = [`Proyecto ${String(index).padStart(2, '0')}`, p.typology, p.year].filter(Boolean).join(' · ')
  const loc = [p.location, p.status].filter(Boolean).join(' · ')
  return (
    <section className="popen grid container" data-header-theme="light">
      <div className="popen__head">
        <p className="popen__eyebrow">{eyebrow}</p>
        <h1 className="popen__title">{p.title}</h1>
      </div>
      <div className="popen__media">
        <MediaFrame media={{ ...p.hero, caption: undefined }} ratio="4 / 5" sizes="(min-width: 48rem) 58vw, 100vw" priority caption={false} />
      </div>
      <div className="popen__foot">
        <p className="popen__sum">{renderInline(p.summary)}</p>
        <p className="popen__loc">{loc}</p>
      </div>
    </section>
  )
}
