import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="nf container" data-header-theme="light">
      <h1>Esta página no existe.</h1>
      <p>Puede que el enlace haya cambiado o que el proyecto todavía no esté publicado.</p>
      <nav aria-label="Rutas">
        <Link href="/" className="lnk">
          Inicio
        </Link>
        <Link href="/proyectos" className="lnk">
          Proyectos
        </Link>
        <a href="#contacto" className="lnk">
          Contacto
        </a>
      </nav>
    </section>
  )
}
