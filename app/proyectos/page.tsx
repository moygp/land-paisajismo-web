import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProjectsIndex } from '@/components/ProjectsIndex'
import { ProjectCarousel } from '@/components/ProjectCarousel'
import { featuredProjects, publishedProjects } from '@/content/projects'

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Jardines residenciales, parques, paisaje corporativo e institucional en Monterrey, San Pedro Garza García y Reynosa. Diseño y obra por LAND.',
  alternates: { canonical: '/proyectos' },
}

export default function ProjectsPage() {
  const data = publishedProjects.map((p) => ({
    slug: p.slug,
    title: p.title,
    location: p.location,
    shortStatement: p.shortStatement,
    categories: p.categories,
    featured: p.featured,
    hero: p.cover ?? p.hero,
    gridSize: p.gridSize,
  }))
  const featured = featuredProjects.map((p) => ({ slug: p.slug, title: p.title, shortTitle: p.shortTitle, location: p.location, cover: p.cover ?? p.hero }))
  return (
    <>
      <div style={{ paddingTop: '1rem' }} data-header-theme="light">
        <h1 className="sr-only">Proyectos</h1>
        <ProjectCarousel items={featured} />
      </div>
      <section className="index-lead container">
        <p>Jardines residenciales, parques y paisaje corporativo en Monterrey y su zona de influencia. Diseño y obra.</p>
      </section>
      <Suspense fallback={null}>
        <ProjectsIndex projects={data} />
      </Suspense>
    </>
  )
}
