'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { FeaturedItem } from './FeaturedProjectsScroller'
import { focalStyle } from '@/lib/utils'

const INTERVAL = 6000

/**
 * Carrusel de proyectos destacados (manual v1.2 §08): crossfade 700 ms, avance cada 6 s,
 * pausa con cursor, foco o pestaña oculta; controles de texto y contador mono; teclado ← →;
 * sin avance automático con prefers-reduced-motion.
 */
export function ProjectCarousel({ items }: { items: FeaturedItem[] }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useRef(false)
  const n = items.length

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const onVis = () => setPaused((p) => (document.hidden ? true : p))
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useEffect(() => {
    if (paused || reduce.current || n < 2) return
    const t = window.setInterval(() => setI((x) => (x + 1) % n), INTERVAL)
    return () => window.clearInterval(t)
  }, [paused, n])

  const go = (d: number) => setI((x) => (x + d + n) % n)
  const current = items[i]

  return (
    <section
      className="carousel"
      aria-roledescription="carrusel"
      aria-label="Proyectos destacados"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(document.hidden)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(document.hidden)
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
    >
      <div className="carousel__stage" aria-live="polite">
        {items.map((it, k) => (
          <div key={it.slug} className="carousel__slide" data-active={k === i} style={focalStyle(it.cover.focalPoint)} aria-hidden={k !== i}>
            <Image src={it.cover.src} alt={k === i ? it.cover.alt : ''} fill sizes="(min-width: 48rem) calc(100vw - 3rem), 100vw" priority={k === 0} quality={82} />
          </div>
        ))}
        <Link href={`/proyectos/${current.slug}`} className="carousel__label" style={{ zIndex: 2 }}>
          {current.title}
          <small>{current.location}</small>
        </Link>
      </div>
      <div className="carousel__controls">
        <button type="button" className="btn" onClick={() => go(-1)} aria-label="Proyecto anterior">
          <span className="lnk">Anterior</span>
        </button>
        <button type="button" className="btn" onClick={() => go(1)} aria-label="Proyecto siguiente">
          <span className="lnk">Siguiente</span>
        </button>
        <span className="carousel__count" aria-hidden="true">
          {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}
