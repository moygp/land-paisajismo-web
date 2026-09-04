import type { Metadata } from 'next'
import { PillarNavigation, PillarSection } from '@/components/Pillars'
import { ExpandableList } from '@/components/ExpandableList'
import { palette, pillars, services } from '@/content/pillars'

export const metadata: Metadata = {
  title: 'Enfoque',
  description: 'Clima, agua, obra y tiempo. Cómo LAND diseña y construye jardines para el clima semiárido de Monterrey: asoleamiento, xerojardín, riego por goteo y documentación constructiva.',
  alternates: { canonical: '/enfoque' },
}

export default function ApproachPage() {
  return (
    <>
      <section className="statement container" data-header-theme="light">
        <h1>Un jardín que madura. Al quinto año se ve mejor que el día de la entrega.</h1>
        <p className="prose" style={{ marginTop: '1.5rem' }}>
          Hacer habitable el exterior en un clima que no lo pone fácil. Cuatro condiciones de trabajo ordenan cada
          proyecto, del primer levantamiento a la entrega de obra.
        </p>
      </section>
      <div className="container">
        <PillarNavigation pillars={pillars} />
      </div>
      {pillars.map((p, i) => (
        <PillarSection key={p.slug} pillar={p} alt={i % 2 === 1} />
      ))}

      <section className="services grid container" id="servicios" aria-labelledby="servicios-h">
        <div className="col-4">
          <h2 id="servicios-h" className="t-1">
            Servicios
          </h2>
          <p className="prose" style={{ marginTop: '1rem', fontSize: 'var(--t-body)' }}>
            Diseño y obra en el mismo estudio. El mismo criterio dibuja el plano y dirige la plantación.
          </p>
        </div>
        <div className="col-8 grid" style={{ rowGap: '2rem' }}>
          <div className="col-l">
            <h3 className="h-block">Diseño</h3>
            <ul className="list-lines">
              {services.design.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="col-r">
            <h3 className="h-block">Obra</h3>
            <ul className="list-lines">
              {services.build.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <h3 className="h-block" style={{ marginTop: '2rem' }}>
              Tipologías
            </h3>
            <ul className="list-lines">
              {services.typologies.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="services grid container" id="paleta" aria-labelledby="paleta-h">
        <div className="col-4">
          <h2 id="paleta-h" className="t-1">
            Paleta recurrente
          </h2>
          <p className="prose" style={{ marginTop: '1rem', fontSize: 'var(--t-body)' }}>
            Especies que se repiten en los proyectos del estudio porque resisten el verano regio y el suelo calizo.
            Nombre común y nombre botánico.
          </p>
        </div>
        <div className="col-8">
          <ExpandableList
            initial={8}
            items={palette.map((p) => (
              <>
                <span>{p.common}</span>
                <em>{p.botanical}</em>
              </>
            ))}
          />
        </div>
      </section>
    </>
  )
}
