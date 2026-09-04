import type { Metadata } from 'next'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Términos de uso',
  description: 'Términos de uso del sitio de LAND.',
  alternates: { canonical: '/terminos' },
}

export default function TermsPage() {
  return (
    <article className="doc grid container">
      <div className="col-12">
        <h1>Términos de uso</h1>
        <p className="doc__meta">Última actualización: septiembre de 2026</p>
      </div>
      <div className="col-8 doc__body">
        <h2>Contenido del sitio</h2>
        <p>
          Las fotografías, renders, planos, textos y el logotipo publicados en {site.url.replace('https://', '')} pertenecen a LAND o se publican con autorización de sus autores. No pueden reproducirse, distribuirse ni usarse con fines comerciales sin permiso por escrito.
        </p>
        <h2>Información de proyectos</h2>
        <p>
          Los proyectos se describen con la información disponible al momento de publicarlos. Los renders se identifican como tales; las fotografías documentan el jardín tal como estaba el día de la toma. Ninguna imagen constituye una promesa de resultado para otro predio.
        </p>
        <h2>Uso del sitio</h2>
        <p>Este sitio es informativo. Cualquier propuesta de diseño u obra se formaliza por escrito y por separado.</p>
        <h2>Enlaces externos</h2>
        <p>Los enlaces a sitios de terceros se ofrecen como referencia. LAND no responde por su contenido.</p>
        <h2>Contacto</h2>
        <p>
          Dudas sobre estos términos: <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </article>
  )
}
