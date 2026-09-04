import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { publishedProjects } from '@/content/projects'
import { news } from '@/content/news'
import { people } from '@/content/studio'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base = site.url
  const statics = ['', '/proyectos', '/enfoque', '/estudio', '/privacidad', '/terminos'].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: (p === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: p === '' ? 1 : p === '/proyectos' ? 0.9 : 0.6,
  }))
  const projects = publishedProjects.map((p) => ({ url: `${base}/proyectos/${p.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 }))
  const newsUrls = news.length ? [{ url: `${base}/noticias`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.5 }, ...news.map((n) => ({ url: `${base}/noticias/${n.slug}`, lastModified: new Date(n.date), changeFrequency: 'yearly' as const, priority: 0.4 }))] : []
  const peopleUrls = people.map((p) => ({ url: `${base}/estudio/equipo/${p.slug}`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 }))
  return [...statics, ...projects, ...newsUrls, ...peopleUrls]
}
