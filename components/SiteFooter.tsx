import Link from 'next/link'
import { site } from '@/content/site'
import { Wordmark } from './Wordmark'

/** Pie como bloque de contacto sobre blanco (manual v1.2 §09): dirección, teléfono, correo y redes en tipografía grande. */
export function SiteFooter() {
  const a = site.address
  return (
    <footer id="contacto" className="footer" data-header-theme="light">
      <div>
        <Wordmark className="footer__mark" title="LAND" />
        <p className="footer__tagline">{site.tagline}</p>
      </div>
      <div className="contact">
        <div className="contact__row">
          <h2>Estudio</h2>
          <p>
            {a.street}
            <small>
              {a.neighborhood}, {a.postalCode} · {a.city}, {a.regionShort}
            </small>
          </p>
        </div>
        <div className="contact__row">
          <h2>Teléfono</h2>
          <a href={site.phoneHref}>{site.phone}</a>
        </div>
        <div className="contact__row">
          <h2>Correo</h2>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <div className="contact__row">
          <h2>Nuevos proyectos</h2>
          <a href={`mailto:${site.email}?subject=Nuevo%20proyecto`}>
            Escribir al estudio
            <small>Cuéntanos del terreno: superficie, orientación y etapa de la obra.</small>
          </a>
        </div>
        <div className="contact__row">
          <h2>Redes</h2>
          <div>
            <a href={site.instagram.url} target="_blank" rel="noopener">
              Instagram {site.instagram.handle}
              {site.instagram.followers && <small>{site.instagram.followers} seguidores</small>}
            </a>
            {site.linkedin.url && (
              <a href={site.linkedin.url} target="_blank" rel="noopener">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="footer__legal">
        <p>© {new Date().getFullYear()} LAND · Arquitectura de paisaje · {a.city}, {a.region}</p>
        <nav aria-label="Legal">
          <Link href="/privacidad">Aviso de privacidad</Link>
          <Link href="/terminos">Términos</Link>
        </nav>
      </div>
    </footer>
  )
}
