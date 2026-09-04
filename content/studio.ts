import { media } from './media'
import type { MediaAsset, Person } from './types'

export const studio = {
  statement:
    'LAND es un estudio de arquitectura de paisaje con capacidad de obra. Diseñamos y construimos jardines residenciales, corporativos e institucionales en Monterrey y su zona de influencia.',
  body: [
    'En Monterrey se llega a cuarenta grados, llueven menos de 600 mm al año y el suelo es calizo. Cada proyecto parte de esas tres condiciones. Seleccionamos la especie según el asoleamiento de cada área, resolvemos el riego por goteo y documentamos el proyecto hasta el detalle constructivo.',
    'Un jardín bien resuelto exige menos mantenimiento. Lo evaluamos a diez años. La entrega es apenas el primer día.',
  ],
  media: {
    type: 'image',
    src: media['casa-de-piedra']['hero-diptico'].src,
    width: media['casa-de-piedra']['hero-diptico'].width,
    height: media['casa-de-piedra']['hero-diptico'].height,
    tag: 'FOTOGRAFÍA',
    alt: 'Jardín y terraza de Casa de Piedra, San Pedro Garza García',
    caption: 'Casa de Piedra · San Pedro Garza García, 2022',
  } satisfies MediaAsset,
  is: [
    'Un estudio de diseño con capacidad de obra',
    'Autor de proyecto, con criterio propio',
    'Contemporáneo y cálido',
    'Especialista en clima semiárido',
    'Interlocutor del arquitecto',
  ],
  isNot: [
    'Un vivero ni un proveedor de planta',
    'Un ejecutor de la idea de alguien más',
    'Minimalismo frío ni jardín de revista',
    'Un servicio de jardinería por hora',
    'Un contratista que solo cotiza',
  ],
  /** Clientes y colaboradores. Solo los que constan en el portafolio 2026. */
  clients: [
    { group: 'Residencial', items: ['Casa del Sauce · San Pedro Garza García', 'Casa de Piedra · San Pedro Garza García'] },
    { group: 'Desarrollos y torres', items: ['Portefino · Monterrey', 'Vía Zócalo · Centro de Monterrey', 'Torre Miravalle · Monterrey'] },
    { group: 'Corporativo', items: ['Banregio · Back Office, Monterrey'] },
    { group: 'Institucional', items: ['Centro de Convenciones de Reynosa · Tamaulipas'] },
    { group: 'Colaboración con arquitectos', items: ['Vidal Arquitectos · Vía Zócalo'] },
  ],
  /** Reconocimientos. Solo los que constan en el portafolio 2026. */
  recognitions: [{ year: '2021', title: 'Torre Miravalle · proyecto ganador de concurso', projectSlug: 'torre-miravalle' }],
}

/**
 * Equipo. Sin datos autorizados en los archivos entregados; la sección se oculta mientras la lista esté vacía.
 * Para publicar: nombre, cargo, nivel ('direccion' | 'equipo'), retrato vertical (3:4) y biografía breve.
 */
export const people: Person[] = []

export const peopleLevels = [
  { id: 'direccion', label: 'Dirección' },
  { id: 'equipo', label: 'Equipo' },
]
