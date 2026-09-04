import Link from 'next/link'
import type { Project } from '@/content/types'
import { MediaFrame } from './MediaFrame'

export function NextProject({ project }: { project: Project }) {
  return (
    <Link href={`/proyectos/${project.slug}`} className="pnext" aria-label={`Siguiente proyecto: ${project.title}`}>
      <span className="pnext__label">Siguiente proyecto</span>
      <MediaFrame media={{ ...project.hero, caption: undefined }} sizes="100vw" caption={false} />
      <span className="pnext__body">
        <h2>{project.title}</h2>
        <span className="card__loc">{project.location}</span>
      </span>
    </Link>
  )
}
