import Link from 'next/link'
import type { NewsItem } from '@/content/types'
import { formatDate } from '@/lib/utils'
import { MediaFrame } from './MediaFrame'

export function NewsRow({ item }: { item: NewsItem }) {
  return (
    <article className="news__row">
      <div>{item.image && <MediaFrame media={item.image} ratio="4 / 3" sizes="(min-width: 48rem) 33vw, 100vw" caption={false} />}</div>
      <div>
        <p className="news__date">
          <time dateTime={item.date}>{formatDate(item.date)}</time>
        </p>
        <h2 className="news__title">
          <Link href={`/noticias/${item.slug}`} className="lnk">
            {item.title}
          </Link>
        </h2>
        <p style={{ marginTop: '0.5rem', maxWidth: '52ch' }}>{item.summary}</p>
        {item.externalSource && (
          <p className="t-small muted" style={{ marginTop: '0.5rem' }}>
            <a href={item.externalSource.url} target="_blank" rel="noopener" className="lnk">
              {item.externalSource.label}
            </a>
          </p>
        )}
      </div>
    </article>
  )
}

export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <div className="news">
      {items.map((n) => (
        <NewsRow key={n.slug} item={n} />
      ))}
    </div>
  )
}

export function Pagination({ page, pages, base }: { page: number; pages: number; base: string }) {
  if (pages <= 1) return null
  return (
    <nav className="t-ui" aria-label="Paginación" style={{ display: 'flex', gap: '1.5rem', paddingBlock: '1.5rem' }}>
      {page > 1 && (
        <Link className="lnk" href={page - 1 === 1 ? base : `${base}?p=${page - 1}`}>
          Anteriores
        </Link>
      )}
      <span className="muted">
        {page} / {pages}
      </span>
      {page < pages && (
        <Link className="lnk" href={`${base}?p=${page + 1}`}>
          Siguientes
        </Link>
      )}
    </nav>
  )
}
