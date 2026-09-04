import type { ReactNode } from 'react'

/** Convierte *texto* en <em> (nombres botánicos en cursiva, manual §05). Sin HTML arbitrario. */
export function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*[^*]+\*)/g)
  return parts.map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : <span key={i}>{part}</span>,
  )
}
