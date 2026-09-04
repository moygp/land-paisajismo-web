export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function focalStyle(focal?: { x: number; y: number }) {
  return focal ? ({ '--focal': `${Math.round(focal.x * 100)}% ${Math.round(focal.y * 100)}%` } as React.CSSProperties) : undefined
}

export function formatDate(iso: string) {
  const d = new Date(iso + 'T12:00:00')
  return new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
}

export const FROM_INDEX_KEY = 'land:from-index'
export const INTRO_KEY = 'land:intro'
