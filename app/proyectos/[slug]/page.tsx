import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectCloseMode } from '@/components/ProjectCloseMode'
import { ProjectHero } from '@/components/ProjectHero'
import { EditorialMediaSequence } from '@/components/EditorialMediaSequence'
import { ProjectFacts } from '@/components/ProjectFacts'
import { NextProject } from '@/components/NextProject'
import { getProject, nextProject, publishedProjects } from '@/content/projects'
import { renderInline } from '@/lib/inline'

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) return {}
  return {
    title: p.seo.title,
    description: p.seo.description,
    alternates: { canonical: `/proyectos/${p.slug}` },
    openGraph: { images: [{ url: p.hero.src, alt: p.hero.alt }] },
  }
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()
  const next = nextProject(slug)
  const meta = [p.typology, p.year, p.status].filter(Boolean).join(' · ')

  return (
    <article>
      <ProjectCloseMode />
      <ProjectHero title={p.title} media={p.hero} />
      <div className="pintro grid container">
        <div className="col-4">
          <p className="pintro__loc">
            {p.location}
            <small>{meta}</small>
          </p>
        </div>
        <div className="col-8">
          <p className="pintro__sum">{renderInline(p.summary)}</p>
        </div>
      </div>
      <EditorialMediaSequence blocks={p.narrative} />
      <ProjectFacts project={p} />
      <NextProject project={next} />
    </article>
  )
}
