import { media } from './media'
import type { MediaAsset, Project } from './types'

/**
 * Contenido de proyectos. Fuente única: LAND · Portafolio de proyectos · Edición 2026.
 * Regla del manual: nombra la planta, da la medida, explica por qué, una idea por frase, sin superlativos.
 * Los nombres botánicos van entre asteriscos (*Salvia leucantha*) y se renderizan en cursiva.
 * Campos ausentes en el portafolio (superficie, cliente, créditos) se omiten. No se inventan.
 */

type Slug = keyof typeof media
function img<S extends Slug>(slug: S, key: keyof (typeof media)[S], alt: string, extra: Partial<MediaAsset> = {}): MediaAsset {
  const m = media[slug][key] as { src: string; width: number; height: number; tag: MediaAsset['tag'] }
  return { type: 'image', src: m.src, width: m.width, height: m.height, tag: m.tag, alt, ...extra }
}

export const filterGroups = [
  {
    id: 'tipologia',
    label: 'Tipología',
    options: [
      { id: 'residencial', label: 'Residencial' },
      { id: 'desarrollos', label: 'Desarrollos y torres' },
      { id: 'corporativo', label: 'Corporativo' },
      { id: 'institucional', label: 'Institucional' },
      { id: 'parques', label: 'Parques y espacio público' },
    ],
  },
  {
    id: 'alcance',
    label: 'Alcance',
    options: [
      { id: 'diseno', label: 'Diseño' },
      { id: 'diseno-y-obra', label: 'Diseño y obra' },
      { id: 'plan-maestro', label: 'Plan maestro' },
    ],
  },
  {
    id: 'estado',
    label: 'Estado',
    options: [
      { id: 'construido', label: 'Construido' },
      { id: 'en-desarrollo', label: 'En desarrollo' },
      { id: 'proyecto', label: 'Proyecto' },
    ],
  },
] as const

export const projects: Project[] = [
  {
    slug: 'casa-del-sauce',
    title: 'Casa del Sauce',
    location: 'San Pedro Garza García, N.L.',
    shortStatement: 'Jardín, terraza social y alberca bajo encino, sabino, sauce y olivo.',
    summary:
      'Un jardín de sombra alrededor de la alberca. El sauce y el sabino dan la escala; las arbustivas se plantan bajo su dosel para que el jardín cierre con los años.',
    categories: ['residencial', 'diseno-y-obra', 'construido'],
    status: 'Construido',
    featured: true,
    featuredOrder: 1,
    published: true,
    provisionalName: true,
    year: '2023',
    typology: 'Residencial',
    scope: 'Diseño y ejecución de paisaje',
    hero: img('casa-del-sauce', 'hero-diptico', 'Jardín terminado de Casa del Sauce: sauce llorón sobre el andador de grava y masas de arbustivas', { focalPoint: { x: 0.25, y: 0.45 } }),
    narrative: [
      {
        type: 'text',
        alignment: 'left',
        body: 'Diseño y ejecución de paisaje para una residencia en San Pedro Garza García. El programa se resolvió en tres áreas: jardín, terraza social y alberca.',
      },
      {
        type: 'pair',
        caption: 'Jardín terminado',
        media: [
          img('casa-del-sauce', 'jardin-a', 'Sauce llorón y andador de grava con orilla de acero junto a las arbustivas'),
          img('casa-del-sauce', 'jardin-b', 'Encino joven entre salvias y pastos, con el muro de la casa al fondo'),
        ],
      },
      {
        type: 'text',
        alignment: 'right',
        body: 'La paleta combina arbustivas y cubresuelos de riego moderado: *Salvia leucantha*, *Salvia greggii*, *Rosmarinus officinalis* ‘Prostratus’, *Trachelospermum jasminoides* y *Ophiopogon japonicus*. El arbolado se eligió por porte y follaje: *Quercus polymorpha*, *Quercus virginiana*, *Taxodium mucronatum*, *Salix babylonica*, *Lagerstroemia indica* y *Olea europaea*.',
      },
      {
        type: 'media',
        layout: 'full',
        media: img('casa-del-sauce', 'plano-plantacion', 'Planta de conjunto y plano de plantación de Casa del Sauce', { caption: 'Planta de conjunto y plano de plantación' }),
      },
    ],
    seo: {
      title: 'Casa del Sauce · Jardín residencial en San Pedro Garza García',
      description: 'Diseño y ejecución de paisaje: jardín, terraza social y alberca con arbolado de encino, sabino, sauce y olivo. San Pedro Garza García, 2023.',
    },
  },
  {
    slug: 'casa-de-piedra',
    title: 'Casa de Piedra',
    location: 'San Pedro Garza García, N.L.',
    shortStatement: 'Muros, escaleras y elementos sólidos fabricados con la piedra del sitio.',
    summary:
      'La piedra que salió de la excavación regresó al jardín como muro, escalera y patio. El material del sitio fija el color del proyecto.',
    categories: ['residencial', 'diseno-y-obra', 'construido'],
    status: 'Construido',
    featured: true,
    featuredOrder: 2,
    published: true,
    provisionalName: true,
    year: '2022',
    typology: 'Residencial',
    scope: 'Diseño y ejecución de paisaje',
    hero: img('casa-de-piedra', 'hero-diptico', 'Jardín y terraza de Casa de Piedra: pasto, pinos y la pérgola de la terraza frente a la casa', { focalPoint: { x: 0.25, y: 0.5 } }),
    narrative: [
      {
        type: 'text',
        alignment: 'left',
        body: 'Diseño y ejecución de paisaje para una residencia en San Pedro Garza García. Los muros de contención, las escaleras y los elementos sólidos del jardín se fabricaron con piedra extraída del propio terreno.',
      },
      {
        type: 'pair',
        caption: 'Jardín y terraza',
        media: [
          img('casa-de-piedra', 'jardin-a', 'Pasto y pinos frente a la fachada de piedra oscura de la casa'),
          img('casa-de-piedra', 'terraza-b', 'Terraza cubierta con vista al jardín y arbolado joven'),
        ],
      },
      {
        type: 'media',
        layout: 'half-left',
        media: img('casa-de-piedra', 'muro', 'Muro de piedra del sitio con pasto ornamental al frente y pino detrás', { caption: 'Muro de piedra del sitio' }),
      },
      {
        type: 'text',
        alignment: 'right',
        body: 'Un muro de piedra del sitio no se pinta ni se aplana. Su color es el del cerro donde está la casa, y las juntas se dejan a la vista para que el musgo y la sombra trabajen con los años.',
      },
      {
        type: 'pair',
        caption: 'Muros de piedra del sitio',
        media: [
          img('casa-de-piedra', 'muros-a', 'Muro bajo de piedra con pasto y cielo despejado'),
          img('casa-de-piedra', 'muros-b', 'Muro de piedra del sitio entre vegetación y la fachada de la casa'),
        ],
      },
      {
        type: 'media',
        layout: 'half-right',
        media: img('casa-de-piedra', 'patio', 'Patio con muro de piedra y vegetación de sombra', { caption: 'Patio y muro de piedra' }),
      },
      {
        type: 'pair',
        caption: 'Escaleras de piedra del sitio · diseño y fabricación',
        media: [
          img('casa-de-piedra', 'escaleras-a', 'Escalera de piedra del sitio entre taludes plantados'),
          img('casa-de-piedra', 'escaleras-b', 'Detalle de peldaños de piedra y muro de contención'),
        ],
      },
    ],
    seo: {
      title: 'Casa de Piedra · Jardín residencial en San Pedro Garza García',
      description: 'Diseño y ejecución de paisaje con muros, escaleras y elementos sólidos fabricados con piedra del sitio. San Pedro Garza García, 2022.',
    },
  },
  {
    slug: 'portefino',
    title: 'Portefino',
    location: 'Monterrey, N.L.',
    shortStatement: 'Plan maestro, amenidades en terraza, parque lineal sobre Loma Florida y parque Los Magueyes.',
    summary:
      'Cuatro piezas de paisaje para un conjunto de usos mixtos: el plan maestro, las amenidades en terraza, el parque lineal con banqueta sobre Loma Florida y el parque Los Magueyes.',
    categories: ['desarrollos', 'parques', 'diseno', 'plan-maestro', 'proyecto'],
    status: 'Proyecto',
    featured: true,
    featuredOrder: 3,
    published: true,
    year: '2022',
    typology: 'Desarrollo habitacional y usos mixtos',
    scope: 'Diseño arquitectónico de paisaje',
    hero: img('portefino', 'hero-parque-magueyes-aerea', 'Vista aérea del parque Los Magueyes: arbolado, andadores y las torres del conjunto', { focalPoint: { x: 0.5, y: 0.5 } }),
    narrative: [
      {
        type: 'media',
        layout: 'full',
        media: img('portefino', 'plan-maestro', 'Plan maestro del conjunto Portefino con el parque, las torres y el parque lineal', { caption: 'Plan maestro' }),
      },
      {
        type: 'text',
        alignment: 'left',
        body: 'Diseño arquitectónico de paisaje para un desarrollo habitacional y de usos mixtos en Monterrey. El encargo abarca el plan maestro del conjunto, las amenidades en terraza, el parque lineal con banqueta sobre Loma Florida y el parque Los Magueyes.',
      },
      {
        type: 'pair',
        caption: 'Vistas del conjunto',
        media: [
          img('portefino', 'conjunto-a', 'Perspectiva del conjunto con arbolado en la plaza de acceso'),
          img('portefino', 'conjunto-b', 'Perspectiva de las torres desde el parque'),
        ],
      },
      {
        type: 'media',
        layout: 'full',
        media: img('portefino', 'espejo-agua', 'Espejo de agua y arbolado en la terraza de amenidades', { caption: 'Espejo de agua y arbolado' }),
      },
      {
        type: 'text',
        alignment: 'right',
        body: 'Las amenidades en terraza se resuelven con arbolado en jardinera y un espejo de agua. El arbolado del conjunto incluye *Pinus montezumae*, *Quercus polymorpha*, *Quercus virginiana*, *Ulmus minor*, *Ehretia anacua* y *Ebenopsis ebano*.',
      },
      {
        type: 'pair',
        caption: 'Amenidades en terraza',
        media: [
          img('portefino', 'terraza-b', 'Terraza con arbolado en jardineras y mobiliario'),
          img('portefino', 'terraza-c', 'Terraza con vista al cielo entre copas de árboles'),
        ],
      },
      {
        type: 'media',
        layout: 'half-left',
        media: img('portefino', 'plano-parque-lineal', 'Plano del parque lineal y banqueta sobre Loma Florida', { caption: 'Parque lineal y banqueta Loma Florida' }),
      },
      {
        type: 'text',
        alignment: 'right',
        body: 'El parque lineal acompaña la banqueta de Loma Florida con pastos y arbustivas de bajo riego: *Eragrostis curvula*, *Leucophyllum frutescens*, *Salvia greggii*, *Salvia leucantha*, *Lantana montevidensis* y *Hesperaloe parviflora*.',
      },
      {
        type: 'media',
        layout: 'full',
        media: img('portefino', 'parque-lineal-a', 'Parque lineal con banqueta, bancas y arbolado joven', { caption: 'Parque lineal' }),
      },
      {
        type: 'media',
        layout: 'full',
        media: img('portefino', 'parque-lineal-b', 'Andador del parque lineal entre pastos ornamentales', { caption: 'Parque lineal' }),
      },
      {
        type: 'media',
        layout: 'half-right',
        media: img('portefino', 'plano-magueyes', 'Plano del parque Los Magueyes con cancha, área de juegos y arbolado', { caption: 'Parque Los Magueyes' }),
      },
      {
        type: 'pair',
        caption: 'Parque Los Magueyes · cancha y área de juegos',
        media: [
          img('portefino', 'magueyes-b', 'Andador del parque Los Magueyes bajo arbolado existente'),
          img('portefino', 'magueyes-cancha', 'Cancha y área de juegos del parque Los Magueyes'),
        ],
      },
    ],
    seo: {
      title: 'Portefino · Plan maestro y parques para un desarrollo de usos mixtos en Monterrey',
      description: 'Diseño arquitectónico de paisaje: plan maestro, amenidades en terraza, parque lineal sobre Loma Florida y parque Los Magueyes. Monterrey, 2022.',
    },
  },
  {
    slug: 'via-zocalo',
    title: 'Vía Zócalo',
    location: 'Centro de Monterrey, N.L.',
    shortStatement: 'Jardineras, terrazas y arbolado en altura, del sótano −1 a la terraza del nivel +19.',
    summary:
      'El paisaje de una torre sobre Padre Mier se reparte en cuatro niveles. Cada uno resuelve sustrato, drenaje y especie según la altura y el asoleamiento.',
    categories: ['desarrollos', 'diseno', 'proyecto'],
    status: 'Proyecto',
    featured: true,
    featuredOrder: 4,
    published: true,
    year: '2021',
    typology: 'Torre de usos mixtos',
    scope: 'Diseño de paisaje · niveles −1, 0, +9 y +19',
    collaborators: ['Arquitectura: Vidal Arquitectos'],
    hero: img('via-zocalo', 'hero-nivel-menos-1', 'Nivel −1 de Vía Zócalo: escalinata con jardineras y arbolado bajo la torre', { focalPoint: { x: 0.5, y: 0.55 } }),
    narrative: [
      {
        type: 'media',
        layout: 'full',
        media: img('via-zocalo', 'plano-niveles', 'Planos de diseño de paisaje de los niveles −1, 0, +9 y +19', { caption: 'Niveles −1, 0, +9 y +19' }),
      },
      {
        type: 'text',
        alignment: 'left',
        body: 'Diseño de paisaje para una torre de usos mixtos sobre Padre Mier, en el centro de Monterrey. La intervención se resuelve en cuatro niveles, del sótano −1 a la terraza del +19, con jardineras, terrazas y arbolado en altura.',
      },
      {
        type: 'media',
        layout: 'half-right',
        media: img('via-zocalo', 'seccion-jardinera', 'Sección del nivel −1 con el detalle constructivo de la jardinera', { caption: 'Sección · nivel −1, detalle de jardinera' }),
      },
      {
        type: 'text',
        alignment: 'left',
        body: 'En altura, la jardinera es el suelo. La sección fija la profundidad de sustrato, la capa drenante y la sujeción del árbol antes de elegir la especie.',
      },
      {
        type: 'pair',
        caption: 'Nivel +9',
        media: [
          img('via-zocalo', 'nivel-9-a', 'Terraza del nivel +9 con jardineras corridas y mobiliario'),
          img('via-zocalo', 'nivel-9-b', 'Terraza del nivel +9 con arbolado en jardinera y vista a la ciudad'),
        ],
      },
    ],
    seo: {
      title: 'Vía Zócalo · Paisaje en altura para una torre de usos mixtos en Monterrey',
      description: 'Diseño de paisaje en cuatro niveles, del sótano −1 a la terraza del +19, con jardineras, terrazas y arbolado. Centro de Monterrey, 2021.',
    },
  },
  {
    slug: 'torre-miravalle',
    title: 'Torre Miravalle',
    location: 'Monterrey, N.L.',
    shortStatement: 'Un jardín boscoso bajo la sombra del arbolado existente.',
    summary:
      'Los árboles existentes dictan el proyecto. Bajo su sombra densa se propone un jardín boscoso, libre pero estructurado.',
    categories: ['residencial', 'desarrollos', 'diseno', 'proyecto'],
    status: 'Concurso · proyecto ganador',
    featured: true,
    featuredOrder: 5,
    published: true,
    year: '2021',
    typology: 'Residencial vertical',
    scope: 'Diseño de paisaje',
    awards: ['Concurso 2021 · proyecto ganador'],
    hero: img('torre-miravalle', 'hero-arbolado', 'Arbolado existente del predio de Torre Miravalle con pasto bajo sombra densa', { focalPoint: { x: 0.5, y: 0.5 } }),
    narrative: [
      {
        type: 'text',
        alignment: 'left',
        body: 'Diseño de paisaje residencial para Torre Miravalle, en Monterrey. Proyecto ganador de concurso en 2021.',
      },
      {
        type: 'media',
        layout: 'full',
        media: img('torre-miravalle', 'arbolado-a', 'Arbolado existente en el sitio', { caption: 'Arbolado existente' }),
      },
      {
        type: 'quote',
        quote: 'Los árboles existentes dictan el tipo de vegetación al brindar una sombra densa. Los jardines se proponen libres pero estructurados, limpios y elegantes.',
        attribution: 'Memoria de concurso, 2021',
      },
      {
        type: 'pair',
        caption: 'Situación actual del sitio',
        media: [
          img('torre-miravalle', 'arbolado-b', 'Área de juegos bajo el arbolado existente'),
          img('torre-miravalle', 'arbolado-c', 'Andador entre árboles maduros del predio'),
        ],
      },
      {
        type: 'media',
        layout: 'full',
        media: img('torre-miravalle', 'plano-propuesta', 'Propuesta de diseño de paisaje de Torre Miravalle', { caption: 'Propuesta de diseño de paisaje' }),
      },
      {
        type: 'text',
        alignment: 'right',
        body: 'La paleta se propone a partir de los requerimientos de cada especie, con bajo mantenimiento y adaptación a la semisombra y la sombra: *Trachelospermum asiaticum*, *Dietes iridioides*, *Philodendron bipinnatifidum*, *Pittosporum tobira*, *Viburnum suspensum* y *Nephrolepis cordifolia*.',
      },
    ],
    seo: {
      title: 'Torre Miravalle · Jardín boscoso bajo arbolado existente, Monterrey',
      description: 'Diseño de paisaje residencial para Torre Miravalle. Proyecto ganador de concurso en 2021, con paleta de semisombra y sombra bajo el arbolado existente.',
    },
  },
  {
    slug: 'centro-de-convenciones-de-reynosa',
    title: 'Centro de Convenciones de Reynosa',
    shortTitle: 'Centro de Convenciones',
    location: 'Reynosa, Tamaulipas',
    shortStatement: 'Paisaje y elementos urbanos para la plaza de acceso. Construido en 2020.',
    summary:
      'Pastos, suculentas y arbustivas de bajo riego para una plaza de acceso a pleno sol. Construido en 2020.',
    categories: ['institucional', 'parques', 'diseno', 'construido'],
    status: 'Construido',
    featured: false,
    published: true,
    year: '2020',
    typology: 'Institucional',
    scope: 'Diseño de paisaje y elementos urbanos',
    hero: img('centro-de-convenciones-de-reynosa', 'hero-plaza-acceso', 'Plaza de acceso principal del Centro de Convenciones de Reynosa con arbolado y pastos ornamentales', { focalPoint: { x: 0.5, y: 0.55 } }),
    narrative: [
      {
        type: 'media',
        layout: 'full',
        media: img('centro-de-convenciones-de-reynosa', 'plano-propuesta', 'Plano de la propuesta de diseño de paisaje', { caption: 'Propuesta de diseño de paisaje' }),
      },
      {
        type: 'text',
        alignment: 'left',
        body: 'Proyecto de diseño de paisaje y elementos urbanos para el Centro de Convenciones de Reynosa. La plaza de acceso principal concentra la intervención.',
      },
      {
        type: 'media',
        layout: 'full',
        media: img('centro-de-convenciones-de-reynosa', 'acceso-principal', 'Área de intervención junto al acceso principal, con pastos y suculentas al sol', { caption: 'Área de intervención · acceso principal' }),
      },
      {
        type: 'text',
        alignment: 'right',
        body: 'Pastos y suculentas para el sol de Reynosa: *Eragrostis curvula*, *Bouteloua gracilis*, *Nassella tenuissima*, *Agave ovatifolia*, *Hesperaloe parviflora*, *Dasylirion texanum* y *Leucophyllum frutescens*. El arbolado combina *Quercus polymorpha*, *Quercus virginiana*, *Parkinsonia* × ‘Desert Museum’ y *Washingtonia robusta*.',
      },
    ],
    seo: {
      title: 'Centro de Convenciones de Reynosa · Paisaje institucional construido en 2020',
      description: 'Diseño de paisaje y elementos urbanos para la plaza de acceso del Centro de Convenciones de Reynosa, Tamaulipas. Construido en 2020.',
    },
  },
  {
    slug: 'banregio-back-office',
    title: 'Banregio Back Office',
    shortTitle: 'Banregio Back Office',
    location: 'Monterrey, N.L.',
    shortStatement: 'Plan maestro y paleta vegetal por condición de luz, de pleno sol a sombra.',
    summary:
      'Un modelo de asoleamiento por solsticios y equinoccio decide dónde va cada especie. La paleta se separa en pleno sol, semisombra y sombra.',
    categories: ['corporativo', 'diseno', 'plan-maestro', 'en-desarrollo'],
    status: 'En desarrollo',
    featured: false,
    published: true,
    year: '2020',
    typology: 'Corporativo',
    scope: 'Plan maestro y paisajismo',
    client: 'Banregio',
    hero: img('banregio-back-office', 'hero-acceso-principal', 'Acceso principal del back office de Banregio con arbolado y plaza sombreada', { focalPoint: { x: 0.5, y: 0.6 } }),
    narrative: [
      {
        type: 'media',
        layout: 'full',
        media: img('banregio-back-office', 'plan-maestro', 'Plan maestro y paisajismo del conjunto', { caption: 'Plan maestro y paisajismo' }),
      },
      {
        type: 'text',
        alignment: 'left',
        body: 'Plan maestro y diseño de paisaje corporativo para el back office de Banregio en Monterrey. Incluye análisis de asoleamiento y paleta vegetal por condición de luz, de pleno sol a sombra.',
      },
      {
        type: 'media',
        layout: 'full',
        media: img('banregio-back-office', 'asoleamiento', 'Modelos de asoleamiento en solsticio de invierno, equinoccio y solsticio de verano', { caption: 'Modelo de asoleamiento · solsticio de invierno, equinoccio y solsticio de verano' }),
      },
      {
        type: 'text',
        alignment: 'right',
        body: 'El análisis solar muestra las horas de luz que recibe cada área ajardinada en el solsticio de invierno, el equinoccio y el solsticio de verano. Con ese dato, cada especie se coloca donde su desarrollo es correcto.',
      },
      {
        type: 'media',
        layout: 'half-left',
        media: img('banregio-back-office', 'plano-acceso-principal', 'Planta del área de intervención en el acceso principal', { caption: 'Acceso principal · vista en planta' }),
      },
      {
        type: 'media',
        layout: 'full',
        media: img('banregio-back-office', 'acceso-posterior', 'Acceso posterior a oficinas con arbolado y jardineras', { caption: 'Acceso posterior a oficinas' }),
      },
      {
        type: 'media',
        layout: 'half-right',
        media: img('banregio-back-office', 'plano-acceso-posterior', 'Planta del área de intervención en el acceso posterior', { caption: 'Acceso posterior · vista en planta' }),
      },
      {
        type: 'media',
        layout: 'full',
        media: img('banregio-back-office', 'parque-lineal', 'Parque lineal del conjunto al atardecer', { caption: 'Parque lineal' }),
      },
    ],
    seo: {
      title: 'Banregio Back Office · Plan maestro y paisaje corporativo en Monterrey',
      description: 'Plan maestro y diseño de paisaje corporativo con análisis de asoleamiento y paleta vegetal por condición de luz. Monterrey, en desarrollo.',
    },
  },
  {
    slug: 'parque-industrial-finsa',
    title: 'Parque Industrial FINSA',
    location: 'Ubicación por confirmar',
    shortStatement: 'Paleta de bajo riego y arbolado nativo para un parque industrial.',
    summary:
      'Cenizo, sotol, agave, mezquite, ébano y huizache para un parque industrial a pleno sol. Riego bajo o muy bajo en toda la paleta.',
    categories: ['corporativo', 'diseno', 'proyecto'],
    status: 'Propuesta',
    featured: false,
    // Borrador: se publica cuando LAND confirme ubicación, cliente y estado del proyecto.
    published: false,
    year: '2026',
    typology: 'Industrial',
    scope: 'Diseño de paisaje',
    hero: img('parque-industrial-finsa', 'hero-acceso', 'Acceso del parque industrial con arbolado nativo y pastos', { focalPoint: { x: 0.5, y: 0.6 } }),
    narrative: [
      { type: 'media', layout: 'full', media: img('parque-industrial-finsa', 'plano-vegetacion', 'Planta de paisaje con la distribución de vegetación', { caption: 'Planta arquitectónica de paisaje · vegetación' }) },
      { type: 'text', alignment: 'left', body: 'Propuesta de diseño de paisaje para un parque industrial. La paleta se limita a especies de riego bajo o muy bajo: *Leucophyllum frutescens*, *Salvia greggii*, *Dasylirion wheeleri*, *Agave americana*, *Agave maximiliana*, *Aloe vera*; arbolado de *Ebenopsis ebano*, *Prosopis glandulosa*, *Vachellia farnesiana*, *Parkinsonia aculeata* y *Pinus greggii*.' },
      { type: 'pair', caption: 'Perspectivas', media: [img('parque-industrial-finsa', 'acceso-b', 'Vialidad de acceso con arbolado y masas de arbustivas'), img('parque-industrial-finsa', 'terraza', 'Terraza con mesas junto a un muro y pastos ornamentales')] },
      { type: 'media', layout: 'full', media: img('parque-industrial-finsa', 'aerea', 'Vista aérea del conjunto industrial con el paisaje propuesto', { caption: 'Vista aérea' }) },
    ],
    seo: {
      title: 'Parque Industrial FINSA · Paisaje de bajo riego',
      description: 'Propuesta de diseño de paisaje con paleta nativa de bajo riego para un parque industrial.',
    },
  },
]

export const publishedProjects = projects.filter((p) => p.published)
export const featuredProjects = publishedProjects
  .filter((p) => p.featured)
  .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99))

export function getProject(slug: string) {
  return publishedProjects.find((p) => p.slug === slug)
}

export function nextProject(slug: string) {
  const i = publishedProjects.findIndex((p) => p.slug === slug)
  return publishedProjects[(i + 1) % publishedProjects.length]
}

export function optionLabel(id: string) {
  for (const g of filterGroups) for (const o of g.options) if (o.id === id) return o.label
  return id
}
