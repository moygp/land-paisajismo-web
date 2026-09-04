import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { MediaAsset } from '@/content/types'
import { cx, focalStyle } from '@/lib/utils'
import { VideoFrame } from './VideoFrame'

type Props = {
  media: MediaAsset
  /** Relación forzada, p. ej. "4 / 5". Por defecto, la del propio archivo. */
  ratio?: string
  sizes?: string
  priority?: boolean
  className?: string
  caption?: boolean
  tag?: boolean
  reveal?: boolean
}

/** MediaFrame: imagen o video con relación de aspecto declarada (sin saltos), etiqueta mono y pie. */
export function MediaFrame({ media, ratio, sizes = '100vw', priority, className, caption = true, tag = true, reveal }: Props) {
  const style = { '--ar': ratio ?? `${media.width} / ${media.height}`, ...focalStyle(media.focalPoint) } as CSSProperties
  const hasCaption = caption && (media.caption || media.credit)
  return (
    <figure className={cx('frame', className)} data-reveal={reveal ? '' : undefined}>
      <div className="frame__box" style={style}>
        {media.type === 'video' ? (
          <VideoFrame media={media} />
        ) : (
          <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} quality={82} />
        )}
        {tag && media.tag && (
          <span className="frame__tag" aria-hidden="true">
            {media.tag}
          </span>
        )}
      </div>
      {hasCaption && (
        <figcaption className="frame__caption">
          {media.caption}
          {media.credit && <span className="frame__credit">{media.credit}</span>}
        </figcaption>
      )}
    </figure>
  )
}
