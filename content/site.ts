export const site = {
  name: 'LAND',
  legalName: 'LAND Arquitectura de Paisaje',
  tagline: 'Arquitectura de paisaje para el clima del noreste.',
  description:
    'Estudio de arquitectura de paisaje residencial en San Pedro Garza García. Diseño y obra de jardines contemporáneos calibrados al clima semiárido de Monterrey.',
  url: 'https://landpaisajismo.mx',
  locale: 'es_MX',
  address: {
    street: 'Av. José Vasconcelos 745-9',
    neighborhood: 'Del Valle',
    postalCode: '66220',
    city: 'San Pedro Garza García',
    region: 'Nuevo León',
    regionShort: 'N.L.',
    country: 'México',
  },
  phone: '81 1339 3939',
  phoneHref: 'tel:+528113393939',
  email: 'info@landpaisajismo.mx',
  instagram: { handle: '@land.paisajismo', url: 'https://www.instagram.com/land.paisajismo/' },
  founded: undefined as string | undefined,
  /** Conceptos de la intro de primera visita. Tomados del manual de identidad v1.1. */
  introConcepts: ['Nombra la planta.', 'Da la medida.', 'Un jardín que madura.'],
} as const

export const nav = [
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/enfoque', label: 'Enfoque' },
  { href: '/estudio', label: 'Estudio' },
  { href: '#contacto', label: 'Contacto' },
] as const
