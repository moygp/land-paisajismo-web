import { site } from '@/content/site'

/** Hero tipográfico de una pantalla. Una sola declaración, alineada a la izquierda, sin botones. */
export function StatementHero() {
  return (
    <section className="hero container" data-header-theme="light">
      <h1 className="hero__title">Diseñamos jardines que se ven mejor con los años.</h1>
      <p className="hero__sub">
        Cuarenta grados en verano. Menos de 600 mm de lluvia al año. Suelo calizo. El proyecto parte de esas tres
        condiciones.
      </p>
      <p className="hero__meta">
        <span>Arquitectura de paisaje · diseño y obra</span>
        <span>
          {site.address.city}, {site.address.regionShort}
        </span>
      </p>
    </section>
  )
}
