import type { NarrativeBlock } from '@/content/types'
import { renderInline } from '@/lib/inline'
import { cx } from '@/lib/utils'
import { MediaFrame } from './MediaFrame'

/** Relato visual modular: cada proyecto compone su secuencia sin tocar el componente. */
export function EditorialMediaSequence({ blocks }: { blocks: NarrativeBlock[] }) {
  return (
    <div className="seq">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'text':
            return (
              <p key={i} className={cx('seq__text', `seq__text--${b.alignment}`)}>
                {renderInline(b.body)}
              </p>
            )
          case 'quote':
            return <QuoteBlock key={i} quote={b.quote} attribution={b.attribution} />
          case 'media':
            return (
              <MediaFrame
                key={i}
                media={b.media}
                className={`seq__${b.layout}`}
                sizes={b.layout === 'full' ? '100vw' : '(min-width: 48rem) 50vw, 100vw'}
                reveal
              />
            )
          case 'pair': {
            const both = b.media.every((m) => m.width >= m.height)
            return (
              <div key={i} className="seq__pair" data-reveal="">
                {b.media.map((m, j) => (
                  <MediaFrame key={j} media={m} ratio={both ? '4 / 3' : '4 / 5'} sizes="50vw" caption={false} />
                ))}
                {b.caption && <p className="frame__caption">{b.caption}</p>}
              </div>
            )
          }
        }
      })}
    </div>
  )
}

export function QuoteBlock({ quote, attribution }: { quote: string; attribution?: string }) {
  return (
    <figure className="seq__quote">
      <blockquote>{renderInline(quote)}</blockquote>
      {attribution && <figcaption>{attribution}</figcaption>}
    </figure>
  )
}
