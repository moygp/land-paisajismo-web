import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MediaFrame } from '@/components/MediaFrame'
import { people } from '@/content/studio'
import { publishedProjects } from '@/content/projects'

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const p = people.find((x) => x.slug === slug)
  return p ? { title: `${p.name} · ${p.role}`, description: p.bio.slice(0, 160), alternates: { canonical: `/estudio/equipo/${slug}` } } : {}
}

/** Perfil de integrante. Solo existe cuando hay contenido autorizado en content/studio.ts. */
export default async function PersonPage({ params }: Params) {
  const { slug } = await params
  const p = people.find((x) => x.slug === slug)
  if (!p) notFound()
  const related = publishedProjects.filter((pr) => p.relatedProjects?.includes(pr.slug))
  return (
    <article className="doc grid container">
      <div className="col-12">
        <h1>{p.name}</h1>
        <p className="doc__meta">{p.role}</p>
      </div>
      <div className="col-l">{p.portrait && <MediaFrame media={p.portrait} ratio="3 / 4" sizes="(min-width: 48rem) 50vw, 100vw" tag={false} />}</div>
      <div className="col-r doc__body">
        <p>{p.bio}</p>
        {related.length > 0 && (
          <>
            <h2>Proyectos relacionados</h2>
            <ul>
              {related.map((pr) => (
                <li key={pr.slug}>
                  <Link href={`/proyectos/${pr.slug}`}>{pr.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  )
}
