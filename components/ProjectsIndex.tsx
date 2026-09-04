'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { filterGroups, optionLabel } from '@/content/projects'
import type { MediaAsset } from '@/content/types'
import { FROM_INDEX_KEY, cx } from '@/lib/utils'
import { MediaFrame } from './MediaFrame'

export type ProjectCardData = {
  slug: string
  title: string
  location: string
  shortStatement: string
  categories: string[]
  featured: boolean
  hero: MediaAsset
}

/** ProjectFilter + ProjectGrid + ProjectCard. El estado de filtros vive en la URL y sobrevive al regreso desde un proyecto. */
export function ProjectsIndex({ projects }: { projects: ProjectCardData[] }) {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const selected = params.get('sel') === '1'
  const active: Record<string, string | null> = {}
  for (const g of filterGroups) active[g.id] = params.get(g.id)
  const activeCount = (selected ? 1 : 0) + Object.values(active).filter(Boolean).length

  const filtered = projects.filter(
    (p) => (!selected || p.featured) && filterGroups.every((g) => !active[g.id] || p.categories.includes(active[g.id] as string)),
  )

  function set(key: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (next.get(key) === value) next.delete(key)
    else next.set(key, value)
    const q = next.toString()
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false })
  }

  function clear() {
    router.replace(pathname, { scroll: false })
  }

  const summary = [selected ? 'Seleccionados' : null, ...Object.values(active).map((v) => (v ? optionLabel(v) : null))].filter(Boolean).join(' · ')

  return (
    <>
      <div className="filters container">
        <button type="button" className="filters__toggle" aria-expanded={open} aria-controls="filtros" onClick={() => setOpen((o) => !o)}>
          <span>{open ? 'Cerrar filtros' : 'Filtros'}</span>
          <span className="filters__active">{summary || 'Todos'}</span>
        </button>
        <div id="filtros" className="filters__groups" data-open={open}>
          <div className="filters__group">
            <h2>Selección</h2>
            <button type="button" className="filters__option" aria-pressed={selected} onClick={() => set('sel', '1')}>
              <span className="lnk">Seleccionados</span>
            </button>
            {activeCount > 0 && (
              <button type="button" className="filters__option" onClick={clear}>
                <span className="lnk">Quitar filtros</span>
              </button>
            )}
          </div>
          {filterGroups.map((g) => (
            <div className="filters__group" key={g.id}>
              <h2>{g.label}</h2>
              {g.options.map((o) => (
                <button key={o.id} type="button" className="filters__option" aria-pressed={active[g.id] === o.id} onClick={() => set(g.id, o.id)}>
                  <span className="lnk">{o.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="pgrid container" aria-live="polite">
        {filtered.length === 0 && (
          <p className="pgrid__empty">
            Ningún proyecto coincide con estos filtros.{' '}
            <button type="button" className="lnk" onClick={clear}>
              Ver todos los proyectos
            </button>
          </p>
        )}
        {filtered.map((p, i) => (
          <ProjectCard key={p.slug} project={p} variant={i < 2 && p.featured && !activeCount ? 'full' : (i % 2 === 0 ? 'a' : 'b')} />
        ))}
      </div>
    </>
  )
}

function ProjectCard({ project, variant }: { project: ProjectCardData; variant: 'full' | 'a' | 'b' }) {
  const p = project
  return (
    <Link
      href={`/proyectos/${p.slug}`}
      className={cx('card', `card--${variant}`)}
      data-reveal=""
      onClick={() => {
        try {
          sessionStorage.setItem(FROM_INDEX_KEY, '1')
        } catch {}
      }}
    >
      <MediaFrame
        media={p.hero}
        ratio={variant === 'full' ? '16 / 9' : '4 / 3'}
        sizes={variant === 'full' ? '100vw' : '(min-width: 48rem) 50vw, 100vw'}
        caption={false}
      />
      <span className="card__body">
        <span className="card__title display">{p.title}</span>
        <span className="card__loc">{p.location}</span>
        <span className="card__phrase">{p.shortStatement}</span>
      </span>
    </Link>
  )
}
