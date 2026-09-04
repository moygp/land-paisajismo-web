import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NewsList, Pagination } from '@/components/NewsList'
import { newsSorted } from '@/content/news'

export const metadata: Metadata = {
  title: 'Noticias',
  description: 'Actividad reciente del estudio LAND.',
  alternates: { canonical: '/noticias' },
}

const PER_PAGE = 8

type Props = { searchParams: Promise<{ p?: string }> }

/** Índice de noticias. Devuelve 404 mientras no exista contenido en content/news.ts. */
export default async function NewsIndexPage({ searchParams }: Props) {
  if (newsSorted.length === 0) notFound()
  const { p } = await searchParams
  const page = Math.max(1, Number(p) || 1)
  const pages = Math.ceil(newsSorted.length / PER_PAGE)
  const items = newsSorted.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  return (
    <section className="doc container" data-header-theme="light">
      <h1>Noticias</h1>
      <div style={{ marginTop: '2rem' }}>
        <NewsList items={items} />
        <Pagination page={page} pages={pages} base="/noticias" />
      </div>
    </section>
  )
}
