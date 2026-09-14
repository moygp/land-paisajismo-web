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

/** Proceso de trabajo en seis etapas (manual v1.2 §09). PENDIENTE LAND: validar o corregir el texto. */
export const process = [
  { title: 'Primera reunión', body: 'En el estudio o en el terreno. Se define el alcance, el presupuesto de referencia y si LAND es el equipo adecuado para el proyecto.', deliverable: 'Alcance y presupuesto de referencia' },
  { title: 'Visita y levantamiento', body: 'Un día en el sitio: asoleamiento por área, suelo, escorrentía, arbolado existente y vistas. Se documenta con fotografía y medición.', deliverable: 'Levantamiento y análisis del sitio' },
  { title: 'Anteproyecto', body: 'Planta de conjunto, paleta vegetal por condición de luz y referencias de materiales. Se presenta en el estudio y se ajusta con el cliente.', deliverable: 'Planta de conjunto y paleta vegetal' },
  { title: 'Proyecto ejecutivo', body: 'Plano de plantación, riego por goteo, iluminación exterior y detalles de muros y jardineras. Lo que se dibuja es lo que se construye.', deliverable: 'Documentación constructiva completa' },
  { title: 'Obra', body: 'El mismo estudio dirige la plantación. Cada árbol se ubica por su porte adulto y la piedra del sitio regresa como muro, escalera o patio.', deliverable: 'Jardín construido y entregado' },
  { title: 'Seguimiento', body: 'Visitas después de la entrega para revisar riego, poda y adaptación. El proyecto se evalúa a diez años; la entrega es apenas el primer día.', deliverable: 'Visitas de seguimiento' },
]

/**
 * Equipo. Sin datos autorizados en los archivos entregados; la sección se oculta mientras la lista esté vacía.
 * Para publicar: nombre, cargo, nivel ('direccion' | 'equipo'), retrato vertical (3:4) y biografía breve.
 */
export const people: Person[] = []

export const peopleLevels = [
  { id: 'direccion', label: 'Dirección' },
  { id: 'equipo', label: 'Equipo' },
]
