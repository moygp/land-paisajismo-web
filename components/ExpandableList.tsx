'use client'

import { useId, useState, type ReactNode } from 'react'

/** Lista extensa colapsada con «Ver más / Ver menos». */
export function ExpandableList({ items, initial = 8, className = 'list-lines' }: { items: ReactNode[]; initial?: number; className?: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const visible = open ? items : items.slice(0, initial)
  return (
    <div className="expand">
      <ul className={className} id={id}>
        {visible.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
      {items.length > initial && (
        <button type="button" className="btn expand__more" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          <span className="lnk">{open ? 'Ver menos' : `Ver más (${items.length - initial})`}</span>
        </button>
      )}
    </div>
  )
}
