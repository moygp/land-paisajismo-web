import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MediaFrame } from '@/components/MediaFrame'
import { getNews, news } from '@/content/news'
import { publishedProjects } from '@/content/projects'
import { formatDate } from '@/lib/utils'

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const n = getNews(slug)
  return n ? { title: n.title, description: n.summary, alternates: { canonical: `/noticias/${slug}` } } : {}
}

export default async function NewsPage({ params }: Params) {
  const { slug } = await params
  const n = getNews(slug)
  if (!n) notFound()
  const related = publishedProjects.filter((p) => n.relatedProjects?.includes(p.slug))
  return (
    <article className="doc grid container">
      <div className="col-12">
        <h1>{n.title}</h1>
        <p className="doc__meta">
          <time dateTime={n.date}>{formatDate(n.date)}</time>
        </p>
      </div>
      {n.image && (
        <div className="col-12">
          <MediaFrame media={n.image} sizes="100vw" priority />
        </div>
      )}
      <div className="col-8 doc__body">
        {n.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {n.externalSource && (
          <p>
            <a href={n.externalSource.url} target="_blank" rel="noopener">
              {n.externalSource.label}
            </a>
          </p>
        )}
        {related.length > 0 && (
          <>
            <h2>Proyectos relacionados</h2>
            <ul>
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/proyectos/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  )
}
