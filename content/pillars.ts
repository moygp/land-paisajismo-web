import { media } from './media'
import type { MediaAsset, Pillar } from './types'

const m = (o: { src: string; width: number; height: number; tag: MediaAsset['tag'] }, alt: string, caption?: string): MediaAsset => ({
  type: 'image', src: o.src, width: o.width, height: o.height, tag: o.tag, alt, caption,
})

/**
 * Pilares del enfoque. Derivados del manual de identidad v1.1 (fundamentos, atributos, voz)
 * y del portafolio 2026. No hay publicaciones ni investigación publicada: la sección cierra con servicios.
 */
export const pillars: Pillar[] = [
  {
    slug: 'clima',
    order: 1,
    title: 'Clima',
    statement: 'En Monterrey se llega a cuarenta grados, llueven menos de 600 mm al año y el suelo es calizo. El proyecto parte de esas tres condiciones.',
    media: m(media['banregio-back-office']['asoleamiento'], 'Modelos de asoleamiento del back office de Banregio en solsticio de invierno, equinoccio y solsticio de verano', 'Banregio Back Office · modelo de asoleamiento por estación'),
    subprinciples: [
      { title: 'Asoleamiento por área', body: 'Antes de elegir una especie se mide cuántas horas de sol recibe cada área en el solsticio de invierno, el equinoccio y el solsticio de verano.' },
      { title: 'Especie según condición de luz', body: 'La paleta se separa en pleno sol, semisombra y sombra. Cada planta se coloca donde su desarrollo es correcto.' },
      { title: 'Suelo calizo', body: 'El sustrato se corrige por área de plantación, no por jardín completo. Se documenta profundidad, drenaje y mezcla.' },
      { title: 'Sombra como material', body: 'El arbolado existente se conserva y dicta la vegetación de abajo. La sombra se diseña antes que el pasto.' },
    ],
  },
  {
    slug: 'agua',
    order: 2,
    title: 'Agua',
    statement: 'Xerojardín, planta nativa y riego por goteo. Un jardín bien resuelto exige menos agua y menos mantenimiento cada año.',
    media: m(media['centro-de-convenciones-de-reynosa']['acceso-principal'], 'Pastos y suculentas a pleno sol en el acceso del Centro de Convenciones de Reynosa', 'Centro de Convenciones de Reynosa · paleta de bajo riego'),
    subprinciples: [
      { title: 'Paleta nativa y adaptada', body: 'Cenizo, salvia, love grass, sotol, encino, anacahuita, ébano. Especies que resisten el verano del noreste sin riego de emergencia.' },
      { title: 'Riego por goteo diseñado', body: 'El sistema de riego se proyecta con el plano de plantación, por sectores y por demanda de cada especie.' },
      { title: 'Cubresuelos y gravas', body: 'Menos superficie de pasto. Cubresuelos, gravilla y piedra del sitio reducen evaporación y mantenimiento.' },
    ],
  },
  {
    slug: 'obra',
    order: 3,
    title: 'Obra',
    statement: 'Diseño y obra en el mismo estudio. El plano de plantación, el riego y la iluminación se documentan hasta el detalle constructivo y se ejecutan con el mismo criterio.',
    media: m(media['casa-de-piedra']['escaleras-a'], 'Escalera de piedra del sitio en Casa de Piedra', 'Casa de Piedra · escaleras fabricadas con piedra del sitio'),
    subprinciples: [
      { title: 'Documentación constructiva', body: 'Planta de conjunto, plano de plantación, secciones de jardinera y detalles de muro. Lo que se dibuja se construye.' },
      { title: 'Coordinación de ingenierías', body: 'Riego, drenaje, iluminación exterior y estructura de jardineras se coordinan con el arquitecto y los ingenieros del proyecto.' },
      { title: 'Material del sitio', body: 'La piedra que sale de la excavación regresa como muro, escalera o patio. El color del jardín es el del terreno.' },
      { title: 'Iluminación exterior', body: 'Se diseña con la plantación, para el porte adulto del árbol y no para el día de la entrega.' },
    ],
  },
  {
    slug: 'tiempo',
    order: 4,
    title: 'Tiempo',
    statement: 'El proyecto se evalúa a diez años. La entrega es apenas el primer día. Al quinto año el jardín se ve mejor que cuando se entregó.',
    media: m(media['torre-miravalle']['arbolado-a'], 'Arbolado maduro existente en el predio de Torre Miravalle', 'Torre Miravalle · el arbolado existente como punto de partida'),
    subprinciples: [
      { title: 'Porte adulto', body: 'Cada árbol se ubica por su porte a diez años, no por el tamaño con el que llega del vivero.' },
      { title: 'Cierre de dosel', body: 'Las arbustivas se plantan a la distancia que cierra en tres temporadas. Ni apretadas al inicio ni huecas al final.' },
      { title: 'Mantenimiento bajo', body: 'Un jardín que exige poda constante está mal proyectado. Se elige la especie por su crecimiento y no se corrige después.' },
    ],
  },
]

export const services = {
  design: [
    'Diseño urbano y paisajístico',
    'Documentación constructiva de paisaje',
    'Coordinación de ingenierías',
    'Diseño de sistemas de riego',
    'Diseño de iluminación exterior',
  ],
  build: [
    'Construcción de proyectos paisajísticos',
    'Instalación de sistemas de riego',
    'Instalación de iluminación exterior',
  ],
  typologies: ['Residencial', 'Parques', 'Comercial', 'Institucional', 'Industrial', 'Urbanismo'],
}

/** Paleta recurrente en los proyectos del portafolio 2026. Nombre común · nombre botánico. */
export const palette = [
  { common: 'Cenizo', botanical: 'Leucophyllum frutescens' },
  { common: 'Salvia', botanical: 'Salvia leucantha' },
  { common: 'Salvia greggii', botanical: 'Salvia greggii' },
  { common: 'Love grass', botanical: 'Eragrostis curvula' },
  { common: 'Red yucca', botanical: 'Hesperaloe parviflora' },
  { common: 'Sotol', botanical: 'Dasylirion texanum' },
  { common: 'Agave', botanical: 'Agave ovatifolia' },
  { common: 'Romero', botanical: 'Rosmarinus officinalis' },
  { common: 'Lavanda', botanical: 'Lavandula dentata' },
  { common: 'Lantana morada', botanical: 'Lantana montevidensis' },
  { common: 'Jazmín rastrero', botanical: 'Trachelospermum jasminoides' },
  { common: 'Viburnio áspero', botanical: 'Viburnum suspensum' },
  { common: 'Encino roble', botanical: 'Quercus polymorpha' },
  { common: 'Encino siempre verde', botanical: 'Quercus virginiana' },
  { common: 'Encino chinkapin', botanical: 'Quercus muehlenbergii' },
  { common: 'Anacua', botanical: 'Ehretia anacua' },
  { common: 'Anacahuita', botanical: 'Cordia boissieri' },
  { common: 'Ébano', botanical: 'Ebenopsis ebano' },
  { common: 'Mezquite', botanical: 'Prosopis laevigata' },
  { common: 'Huizache', botanical: 'Vachellia farnesiana' },
  { common: 'Sabino', botanical: 'Taxodium mucronatum' },
  { common: 'Olivo', botanical: 'Olea europaea' },
  { common: 'Palo verde', botanical: 'Parkinsonia × ‘Desert Museum’' },
]
