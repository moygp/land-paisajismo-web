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
      <StatementHero />
      <FeaturedProjectsScroller items={items} />
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
