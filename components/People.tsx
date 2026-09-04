'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Person } from '@/content/types'
import { MediaFrame } from './MediaFrame'

export function PersonCard({ person }: { person: Person }) {
  return (
    <Link href={`/estudio/equipo/${person.slug}`} className="person">
      {person.portrait && <MediaFrame media={person.portrait} ratio="3 / 4" sizes="(min-width: 48rem) 25vw, 50vw" caption={false} tag={false} />}
      <span className="person__name">{person.name}</span>
      <span className="person__role">{person.role}</span>
    </Link>
  )
}

/** Pestañas por nivel: cuatro columnas de navegación y ocho para la cuadrícula de retratos. */
export function PeopleTabs({ people, levels }: { people: Person[]; levels: { id: string; label: string }[] }) {
  const present = levels.filter((l) => people.some((p) => p.level === l.id))
  const [tab, setTab] = useState(present[0]?.id)
  const list = people.filter((p) => p.level === tab).sort((a, b) => a.order - b.order)
  if (!present.length) return null
  return (
    <div className="people grid container">
      <div className="col-4 people__tabs" role="tablist" aria-label="Equipo por nivel">
        {present.map((l) => (
          <button key={l.id} type="button" role="tab" aria-selected={tab === l.id} className="people__tab" onClick={() => setTab(l.id)}>
            <span className="lnk">{l.label}</span>
          </button>
        ))}
      </div>
      <div className="col-8 people__grid" role="tabpanel">
        {list.map((p) => (
          <PersonCard key={p.slug} person={p} />
        ))}
      </div>
    </div>
  )
}
