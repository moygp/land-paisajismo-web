'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { MediaAsset } from '@/content/types'
import { focalStyle } from '@/lib/utils'
import { MediaFrame } from './MediaFrame'

export type FeaturedItem = {
  slug: string
  title: string
  shortTitle?: string
  location: string
  cover: MediaAsset
}

/**
 * Escenario sticky de 100svh. El fondo cambia por crossfade (400 ms) según el scroll;
 * los títulos siempre visibles, activo al 100 % e inactivos al 50 %. Sin carrusel automático.
 * Solo se monta el medio activo y el siguiente. Con prefers-reduced-motion se muestra la lista estática.
 */
export function FeaturedProjectsScroller({ items }: { items: FeaturedItem[] }) {
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(2)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinels = Array.from(trackRef.current?.querySelectorAll<HTMLElement>('[data-i]') ?? [])
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue
          const i = Number((en.target as HTMLElement).dataset.i)
          setActive(i)
          setMounted((m) => Math.max(m, i + 2))
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )
    sentinels.forEach((s) => io.observe(s))
    // Tras la primera pintura, el resto de fondos se monta en reposo para que un scroll rápido no encuentre huecos.
    const idle = window.setTimeout(() => setMounted(items.length), 2500)
    return () => {
      io.disconnect()
      window.clearTimeout(idle)
    }
  }, [items.length])

  const current = items[active] ?? items[0]

  return (
    <section
      className="scroller"
      style={{ '--n': items.length } as CSSProperties}
      data-theme="dark"
      data-header-theme="dark"
      aria-label="Proyectos destacados"
    >
      <div className="scroller__stage">
        {items.map(
          (it, i) =>
            i < mounted && (
              <div key={it.slug} className="scroller__bg" data-active={i === active} style={focalStyle(it.cover.focalPoint)} aria-hidden={i !== active}>
                <Image src={it.cover.src} alt={i === active ? it.cover.alt : ''} fill sizes="100vw" priority={i === 0} quality={82} />
              </div>
            ),
        )}
        <div className="scroller__ui">
          <ol className="scroller__list">
            {items.map((it, i) => (
              <li key={it.slug} className="scroller__item" data-active={i === active}>
                <Link href={`/proyectos/${it.slug}`}>
                  {it.shortTitle ?? it.title}
                  <small>{it.location}</small>
                </Link>
              </li>
            ))}
          </ol>
          <div className="scroller__actions">
            <Link className="btn" href="/proyectos">
              <span className="lnk">Todos los proyectos</span>
            </Link>
            <Link className="btn scroller__view" href={`/proyectos/${current.slug}`}>
              <span className="lnk">Ver proyecto</span>
            </Link>
          </div>
        </div>
      </div>
      <div ref={trackRef} className="scroller__track" aria-hidden="true">
        {items.map((it, i) => (
          <div key={it.slug} data-i={i} style={{ height: `${100 / items.length}%` }} />
        ))}
      </div>
      <ol className="scroller__static">
        {items.map((it) => (
          <li key={it.slug}>
            <Link href={`/proyectos/${it.slug}`}>
              <MediaFrame media={{ ...it.cover, caption: `${it.title} · ${it.location}` }} ratio="16 / 10" sizes="100vw" />
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
