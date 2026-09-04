import Image from 'next/image'
import type { MediaAsset } from '@/content/types'
import { focalStyle } from '@/lib/utils'
import { VideoFrame } from './VideoFrame'

export function ProjectHero({ title, media }: { title: string; media: MediaAsset }) {
  return (
    <section className="phero" data-header-theme="dark">
      <div className="phero__media" style={focalStyle(media.focalPoint)}>
        {media.type === 'video' ? <VideoFrame media={media} /> : <Image src={media.src} alt={media.alt} fill priority sizes="100vw" quality={82} />}
      </div>
      <h1 className="phero__title">{title}</h1>
      {media.tag && (
        <span className="frame__tag" aria-hidden="true">
          {media.tag}
        </span>
      )}
    </section>
  )
}
