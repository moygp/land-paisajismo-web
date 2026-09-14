import type { NarrativeBlock } from '@/content/types'
import { renderInline } from '@/lib/inline'
import { cx } from '@/lib/utils'
import { sizeFor } from '@/lib/media'
import { MediaFrame } from './MediaFrame'

const SIZES_ATTR = { full: '100vw', wide: '(min-width: 48rem) 66vw, 100vw', half: '(min-width: 48rem) 50vw, 100vw', small: '(min-width: 48rem) 33vw, 100vw' }

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
          case 'media': {
            // Composición por resolución (v1.2): el tamaño lo fija la resolución real, el layout solo decide el lado.
            const size = b.size ?? sizeFor(b.media)
            const side = b.layout === 'half-right' ? 'seq__right' : b.layout === 'half-left' ? '' : size === 'full' ? '' : 'seq__center'
            const cls = size === 'full' ? 'seq__full' : `seq__${size}`
            return <MediaFrame key={i} media={b.media} className={cx(cls, side)} sizes={SIZES_ATTR[size]} reveal parallax capWidth />
          }
          case 'composition':
            return (
              <div key={i} className="seq__comp" data-reveal="">
                {b.items.map((it, j) => {
                  const size = it.size ?? sizeFor(it.media)
                  return (
                    <MediaFrame
                      key={j}
                      media={it.media}
                      className={cx(`comp--${size}`, it.offset === 'right' && 'comp--right', it.stagger && 'comp--offset')}
                      sizes={SIZES_ATTR[size]}
                      caption={false}
                      parallax
                      capWidth
                    />
                  )
                })}
                {b.caption && <p className="frame__caption" style={{ gridColumn: '1 / -1' }}>{b.caption}</p>}
              </div>
            )
          case 'pair': {
            const both = b.media.every((m) => m.width >= m.height)
            return (
              <div key={i} className="seq__pair" data-reveal="">
                {b.media.map((m, j) => (
                  <MediaFrame key={j} media={m} ratio={both ? '4 / 3' : '4 / 5'} sizes="50vw" caption={false} parallax />
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
