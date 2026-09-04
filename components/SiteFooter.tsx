import Link from 'next/link'
import { site } from '@/content/site'
import { Wordmark } from './Wordmark'

export function SiteFooter() {
  const a = site.address
  return (
    <footer id="contacto" className="footer" data-theme="dark" data-header-theme="sombra">
      <div>
        <Wordmark className="footer__mark" title="LAND" />
        <p className="footer__tagline">{site.tagline}</p>
      </div>
      <div>
        <div className="footer__cols">
          <div className="footer__col">
            <h2>Estudio</h2>
            <p>
              {a.street}
              <br />
              {a.neighborhood}, {a.postalCode}
              <br />
              {a.city}, {a.regionShort}
            </p>
          </div>
          <div className="footer__col">
            <h2>Contacto</h2>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="footer__col">
            <h2>Nuevos proyectos</h2>
            <p>Cuéntanos del terreno: superficie, orientación y etapa de la obra.</p>
            <a href={`mailto:${site.email}?subject=Nuevo%20proyecto`}>Escribir al estudio</a>
          </div>
          <div className="footer__col">
            <h2>Prensa</h2>
            <a href={`mailto:${site.email}?subject=Prensa`}>{site.email}</a>
          </div>
          <div className="footer__col">
            <h2>Redes</h2>
            <a href={site.instagram.url} target="_blank" rel="noopener">
              Instagram {site.instagram.handle}
            </a>
          </div>
        </div>
        <div className="footer__legal">
          <p>© {new Date().getFullYear()} LAND · Arquitectura de paisaje · {a.city}, {a.region}</p>
          <nav aria-label="Legal">
            <Link href="/privacidad">Aviso de privacidad</Link>
            <Link href="/terminos">Términos</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
