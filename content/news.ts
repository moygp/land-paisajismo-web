import type { NewsItem } from './types'

/**
 * Noticias. Sin publicaciones por ahora: la sección de portada y la ruta /noticias se activan
 * automáticamente cuando este arreglo tenga al menos una entrada. Fecha en formato ISO (AAAA-MM-DD).
 */
export const news: NewsItem[] = []

export const newsSorted = [...news].sort((a, b) => b.date.localeCompare(a.date))
export function getNews(slug: string) {
  return news.find((n) => n.slug === slug)
}
