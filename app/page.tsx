import type { Metadata } from 'next'
import Link from 'next/link'
import { FirstVisitIntro } from '@/components/FirstVisitIntro'
import { StatementHero } from '@/components/StatementHero'
import { FeaturedProjectsScroller } from '@/components/FeaturedProjectsScroller'
import { NewsList } from '@/components/NewsList'
import { featuredProjects } from '@/content/projects'
import { newsSorted } from '@/content/news'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  const items = featuredProjects.map((p) => ({
    slug: p.slug,
    title: p.title,
    shortTitle: p.shortTitle,
    location: p.location,
    cover: p.cover ?? p.hero,
  }))
  const recent = newsSorted.slice(0, 3)

  return (
    <>
      <FirstVisitIntro photo={featuredProjects[0].hero} />
      <StatementHero photo={featuredProjects[0].hero} />
      <FeaturedProjectsScroller items={items} />
      <section className="block grid container" data-theme="dark" data-header-theme="verde" aria-labelledby="enfoque-h">
        <p className="block__eyebrow">Enfoque</p>
        <h2 id="enfoque-h" className="block__title">
          Cuarenta grados. Menos de 600 mm de lluvia al año. Suelo calizo.
        </h2>
        <div className="block__text">
          <p>
            Un jardín que no considere esas tres condiciones se pierde en un verano. LAND parte de ellas: la especie según el asoleamiento de cada área, riego por goteo y documentación hasta el detalle constructivo.
          </p>
          <Link href="/enfoque" className="cta lnk">
            Nuestro enfoque
          </Link>
        </div>
      </section>
      {recent.length > 0 && (
        <section className="section container" data-header-theme="light" aria-labelledby="noticias-h">
          <h2 id="noticias-h" className="h-block">
            Noticias
          </h2>
          <NewsList items={recent} />
          <p className="t-ui" style={{ marginTop: '1.5rem' }}>
            <Link href="/noticias" className="lnk">
              Ver el archivo completo
            </Link>
          </p>
        </section>
      )}
    </>
  )
}
