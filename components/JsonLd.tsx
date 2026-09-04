import { site } from '@/content/site'

/** Datos estructurados LocalBusiness para SEO local. */
export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: site.name,
    alternateName: 'LAND Paisajismo',
    description: site.description,
    url: site.url,
    telephone: '+52 81 1339 3939',
    email: site.email,
    image: `${site.url}/opengraph-image`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: 'MX',
    },
    areaServed: ['San Pedro Garza García', 'Monterrey', 'Nuevo León'],
    sameAs: [site.instagram.url],
    knowsAbout: ['Arquitectura de paisaje', 'Xerojardinería', 'Diseño de jardines residenciales', 'Riego por goteo'],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
