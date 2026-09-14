export type MediaAsset = {
  type: 'image' | 'video'
  src: string
  width: number
  height: number
  alt: string
  /** Etiqueta mono del manual: RENDER · FOTOGRAFÍA · PLANO · DIAGRAMA */
  tag?: 'RENDER' | 'FOTOGRAFÍA' | 'PLANO' | 'DIAGRAMA' | 'REFERENCIA'
  caption?: string
  credit?: string
  poster?: string
  /** 0–1 en cada eje. Punto que debe permanecer visible al recortar con object-fit: cover. */
  focalPoint?: { x: number; y: number }
}

export type MediaSize = 'full' | 'wide' | 'half' | 'small'

export type NarrativeBlock =
  | { type: 'text'; body: string; alignment: 'left' | 'right' }
  | { type: 'quote'; quote: string; attribution?: string }
  | { type: 'media'; layout: 'full' | 'half-left' | 'half-right'; media: MediaAsset; size?: MediaSize }
  | { type: 'pair'; media: [MediaAsset, MediaAsset]; caption?: string }
  /** Composición de 2–5 medios con tamaño y desplazamiento propios (manual v1.2 §07). */
  | { type: 'composition'; caption?: string; items: { media: MediaAsset; size?: MediaSize; offset?: 'left' | 'center' | 'right'; stagger?: boolean }[] }

export type FilterGroupId = 'tipologia' | 'alcance' | 'estado'

export type Project = {
  slug: string
  title: string
  /** Nombre corto para listas densas (scroller de portada). */
  shortTitle?: string
  location: string
  shortStatement: string
  summary: string
  /** Párrafo descriptivo de apertura de la ficha (60–110 palabras). */
  description?: string
  /** Tamaño de tarjeta en el índice; si falta se calcula por resolución del medio. */
  gridSize?: 'L' | 'M' | 'S'
  categories: string[]
  status?: string
  featured: boolean
  featuredOrder?: number
  /** Solo los proyectos publicados aparecen en índices, sitemap y navegación. */
  published: boolean
  /** Nombre provisional pendiente de confirmación por LAND. */
  provisionalName?: boolean
  year?: string
  typology?: string
  scope?: string
  area?: string
  client?: string
  collaborators?: string[]
  awards?: string[]
  hero: MediaAsset
  /** Medio horizontal para la portada; si falta se usa hero. */
  cover?: MediaAsset
  narrative: NarrativeBlock[]
  credits?: string
  seo: { title: string; description: string }
}

export type Pillar = {
  slug: string
  title: string
  statement: string
  media: MediaAsset
  order: number
  subprinciples: { title: string; body: string }[]
}

export type Person = {
  slug: string
  name: string
  role: string
  level: string
  portrait?: MediaAsset
  bio: string
  order: number
  relatedProjects?: string[]
}

export type NewsItem = {
  slug: string
  date: string
  title: string
  summary: string
  image?: MediaAsset
  body: string[]
  externalSource?: { label: string; url: string }
  relatedProjects?: string[]
}
