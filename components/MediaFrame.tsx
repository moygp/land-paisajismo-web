import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { MediaAsset } from '@/content/types'
import { cx, focalStyle } from '@/lib/utils'
import { maxRenderWidth } from '@/lib/media'
import { VideoFrame } from './VideoFrame'
import { Parallax } from './Parallax'

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
  /** Escala + desplazamiento que sigue al cursor (v1.2). */
  parallax?: boolean
  /** Video: reproduce al pasar el cursor, no en automático. */
  hoverPlay?: boolean
  /** Limita el ancho de render a 1.2× el ancho real del archivo (v1.2). */
  capWidth?: boolean
}

/** MediaFrame: imagen o video con relación de aspecto declarada (sin saltos), etiqueta mono y pie. */
export function MediaFrame({ media, ratio, sizes = '100vw', priority, className, caption = true, tag = true, reveal, parallax, hoverPlay, capWidth }: Props) {
  const style = {
    '--ar': ratio ?? `${media.width} / ${media.height}`,
    ...(capWidth ? { '--max-w': `${maxRenderWidth(media)}px` } : {}),
    ...focalStyle(media.focalPoint),
  } as CSSProperties
  const hasCaption = caption && (media.caption || media.credit)
  const inner =
    media.type === 'video' ? (
      <VideoFrame media={media} hoverPlay={hoverPlay} />
    ) : (
      <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} quality={82} />
    )
  return (
    <figure className={cx('frame', capWidth && 'frame--capped', className)} data-reveal={reveal ? '' : undefined}>
      <div className="frame__box" style={style}>
        {parallax ? <Parallax>{inner}</Parallax> : inner}
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
