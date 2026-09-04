import type { Project } from '@/content/types'

/** Cierre técnico: síntesis y créditos a la izquierda, tabla de datos reales a la derecha. Sin campos inventados. */
export function ProjectFacts({ project }: { project: Project }) {
  const p = project
  const rows: [string, string][] = []
  if (p.year) rows.push(['Año', p.year])
  if (p.typology) rows.push(['Tipología', p.typology])
  if (p.scope) rows.push(['Alcance', p.scope])
  if (p.area) rows.push(['Superficie', p.area])
  if (p.client) rows.push(['Cliente', p.client])
  if (p.collaborators?.length) rows.push(['Colaboradores', p.collaborators.join(' · ')])
  if (p.awards?.length) rows.push(['Reconocimientos', p.awards.join(' · ')])
  if (p.status) rows.push(['Estado', p.status])
  rows.push(['Ubicación', p.location])

  return (
    <section className="pfacts grid container" aria-label="Datos del proyecto">
      <div className="col-l">
        <p className="pfacts__credits">
          {p.credits ??
            `${p.typology ? `${p.typology}. ` : ''}${p.scope ? `${p.scope} a cargo de LAND` : 'Proyecto de LAND'}${
              p.collaborators?.length ? `, con ${p.collaborators.join(' y ').replace(/^Arquitectura: /, 'arquitectura de ')}` : ''
            }.`}
          <small>Diseño y obra · LAND, {p.location.split(',')[0]}</small>
        </p>
      </div>
      <dl className="facts col-r">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
