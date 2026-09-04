import type { Pillar } from '@/content/types'
import { cx } from '@/lib/utils'
import { MediaFrame } from './MediaFrame'

export function PillarNavigation({ pillars }: { pillars: Pillar[] }) {
  return (
    <nav className="pillars-nav" aria-label="Pilares">
      {pillars.map((p) => (
        <a key={p.slug} href={`#${p.slug}`}>
          <span>{p.title}</span>
          <small>{p.statement.split('.')[0]}.</small>
        </a>
      ))}
    </nav>
  )
}

export function PillarSection({ pillar, alt }: { pillar: Pillar; alt: boolean }) {
  return (
    <section id={pillar.slug} className={cx('pillar grid container', alt && 'pillar--alt')} aria-labelledby={`${pillar.slug}-h`}>
      <div className="col-l pillar__head">
        <h2 id={`${pillar.slug}-h`}>{pillar.title}</h2>
        <p className="pillar__statement">{pillar.statement}</p>
        <ol className="pillar__list">
          {pillar.subprinciples.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="col-r">
        <MediaFrame media={pillar.media} sizes="(min-width: 48rem) 50vw, 100vw" reveal />
      </div>
    </section>
  )
}
