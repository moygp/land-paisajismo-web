import type { Metadata } from 'next'
import Link from 'next/link'
import { MediaFrame } from '@/components/MediaFrame'
import { PeopleTabs } from '@/components/People'
import { people, peopleLevels, studio } from '@/content/studio'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Estudio',
  description: 'LAND es un estudio de arquitectura de paisaje con capacidad de obra en San Pedro Garza García. Servicios, clientes, colaboradores y reconocimientos.',
  alternates: { canonical: '/estudio' },
}

export default function StudioPage() {
  return (
    <>
      <section className="statement container" data-header-theme="light">
        <h1>{studio.statement}</h1>
        <nav className="statement__links" aria-label="Secciones del estudio">
          <Link href="/enfoque#servicios" className="lnk">
            Servicios
          </Link>
          <a href="#clientes" className="lnk">
            Clientes y colaboradores
          </a>
          <a href="#reconocimientos" className="lnk">
            Reconocimientos
          </a>
          {people.length > 0 && (
            <a href="#equipo" className="lnk">
              Equipo
            </a>
          )}
        </nav>
      </section>

      <div className="container">
        <MediaFrame media={studio.media} ratio="16 / 8" sizes="100vw" priority />
      </div>

      <section className="two grid container" style={{ borderTop: 0 }}>
        <div className="col-4">
          <h2 className="h-block">El estudio</h2>
        </div>
        <div className="col-8 prose">
          {studio.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            Trabajamos desde {site.address.street}, en {site.address.city}, para casas de autor en San Pedro y su zona de influencia, y para desarrollos, corporativos e instituciones en Monterrey y el noreste.
          </p>
        </div>
      </section>

      <section className="two grid container" aria-label="Qué es y qué no es LAND">
        <div className="col-l">
          <h2 className="h-block">LAND es</h2>
          <ul className="list-lines">
            {studio.is.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="col-r">
          <h2 className="h-block">LAND no es</h2>
          <ul className="list-lines">
            {studio.isNot.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {people.length > 0 && (
        <div id="equipo">
          <PeopleTabs people={people} levels={peopleLevels} />
        </div>
      )}

      <section id="clientes" className="two grid container" aria-labelledby="clientes-h">
        <div className="col-4">
          <h2 id="clientes-h" className="t-1">
            Clientes y colaboradores
          </h2>
          <p className="prose" style={{ marginTop: '1rem', fontSize: 'var(--t-body)' }}>
            Los proyectos se nombran por lugar. Los códigos internos se quedan en el estudio.
          </p>
        </div>
        <div className="col-8 cols-2">
          {studio.clients.map((g) => (
            <div key={g.group}>
              <h3 className="h-block">{g.group}</h3>
              <ul className="list-lines">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="reconocimientos" className="two grid container" aria-labelledby="recon-h">
        <div className="col-4">
          <h2 id="recon-h" className="t-1">
            Reconocimientos
          </h2>
        </div>
        <div className="col-8">
          <ul className="list-lines">
            {studio.recognitions.map((r) => (
              <li key={r.title}>
                <span>{r.year}</span>
                <Link href={`/proyectos/${r.projectSlug}`} className="lnk">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
