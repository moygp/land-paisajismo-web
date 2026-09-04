# landpaisajismo.mx — sitio web de LAND

Sitio original para **LAND · Arquitectura de paisaje** (San Pedro Garza García, N.L.), construido sobre el manual de identidad v1.1 y el portafolio 2026. Next.js 16 (App Router) + TypeScript, listo para desplegar en Vercel.

Estructura editorial inspirada en el brief «prompt maestro»: hero tipográfico, escenario de proyectos destacados controlado por scroll, índice filtrable, fichas con relato visual modular, cierre técnico y siguiente proyecto. Ningún texto, imagen, código ni recurso de la referencia analizada aparece en el resultado.

## Arranque

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # compilación de producción (verificada)
npm start
```

Requiere Node ≥ 20.9. No hay variables de entorno.

### Despliegue en Vercel

1. Subir el repositorio a GitHub (o `npx vercel` desde esta carpeta).
2. En Vercel: *New Project → Import* → framework detectado: Next.js. Sin configuración adicional.
3. Dominio: `landpaisajismo.mx` (cambiar `site.url` en `content/site.ts` si se usa otro dominio; alimenta canonical, sitemap, Open Graph y JSON-LD).

## Mapa del sitio

| Ruta | Estado |
| --- | --- |
| `/` | Portada: intro de primera visita (una vez por sesión), hero tipográfico, escenario de cinco proyectos destacados, noticias (se activa al haber entradas), pie de página. |
| `/proyectos` | Índice con filtros por Selección, Tipología, Alcance y Estado. Estado en la URL; se conserva al regresar. |
| `/proyectos/[slug]` | Siete fichas publicadas. Hero, introducción en dos columnas, secuencia editorial, datos, siguiente proyecto. «Cerrar» cuando se abre desde el índice. |
| `/enfoque` | Cuatro pilares (Clima, Agua, Obra, Tiempo), servicios y paleta vegetal recurrente. |
| `/estudio` | Declaración, «LAND es / LAND no es», clientes y colaboradores, reconocimientos. Equipo oculto hasta tener contenido. |
| `/estudio/equipo/[slug]` | Perfil de integrante. Se genera solo con datos en `content/studio.ts`. |
| `/noticias`, `/noticias/[slug]` | Devuelven 404 mientras `content/news.ts` esté vacío. Al añadir una noticia aparecen la sección de portada, el índice y la ficha. |
| `/privacidad`, `/terminos` | Textos base. Ver pendientes. |
| 404 | Con la identidad del sitio. |
| `/sitemap.xml`, `/robots.txt`, `/icon.svg`, `/opengraph-image` | Generados (la imagen Open Graph se dibuja con `next/og`). |

## Editar contenido

Todo el contenido vive en `content/` como archivos tipados (sin CMS). El tipo `Project` y el modelo de bloques están en `content/types.ts`.

- **Proyectos:** `content/projects.ts`. Cada proyecto compone su relato con bloques `text` (izquierda/derecha), `quote`, `media` (`full`, `half-left`, `half-right`) y `pair`, sin tocar componentes. Los nombres botánicos van entre asteriscos (`*Salvia leucantha*`) y se muestran en cursiva. Solo los proyectos con `published: true` aparecen en índices, sitemap y navegación.
- **Medios:** `content/media.ts` se genera con `node scripts/media-manifest.mjs` a partir de `public/media/<slug>/<nombre>.webp`. Cada archivo lleva su ancho y alto (sin saltos de layout) y su etiqueta mono (`RENDER`, `FOTOGRAFÍA`, `PLANO`, `DIAGRAMA`), obligatoria para renders según el manual.
- **Pilares, servicios y paleta:** `content/pillars.ts`.
- **Estudio, clientes, reconocimientos, equipo:** `content/studio.ts`.
- **Noticias:** `content/news.ts`.
- **Datos del estudio y navegación:** `content/site.ts`.

### Sustituir los medios provisionales

Las imágenes actuales son **recortes de las páginas del portafolio PDF (1456 px de ancho)**, útiles para el prototipo y no para producción. Para pasar a producción:

1. Colocar los originales (≥ 2400 px de ancho, JPG o WebP calidad 82) en `public/media/<slug>/` **con los mismos nombres**.
2. Ejecutar `node scripts/media-manifest.mjs` (actualiza dimensiones y conserva etiquetas).
3. Para las portadas de Casa del Sauce y Casa de Piedra se usaron dípticos porque las fotos disponibles son verticales; con originales horizontales basta sustituir `hero-diptico.webp`.

`scripts/build-media.py` y `scripts/detect-regions.py` documentan cómo se obtuvieron los recortes; no hacen falta en producción.

## Sistema visual

Tokens en `app/globals.css` (`:root`), derivados del manual v1.1:

- **Color:** Caliza `#E8E9E3` (fondo por defecto, reemplaza al blanco), Sombra `#101A13` (sustituye al negro), Verde LAND `#337044` (solo como firma), Salvia `#A9B7A4` (acento sobre oscuro), Piedra `#9A9183` (texto secundario grande y líneas técnicas). Para texto secundario pequeño se usa `#4C544D` (Sombra al 72 %), porque Piedra sobre Caliza no alcanza AA por debajo de 24 px.
- **Tipografía:** Archivo en su eje ancho (wdth 112 vía `font-stretch`, display, interletrado −0.035 em), Newsreader con eje óptico (texto; cursiva reservada a nombres botánicos), JetBrains Mono (datos y etiquetas, caja alta, +0.14 em). Servidas con `next/font/google`: se descargan una vez en el build y se auto-alojan; no hay peticiones a Google en runtime.
- **Retícula:** 12 columnas (el manual pide doce en digital; la referencia usaba dieciséis). Margen exterior = 1 X del wordmark de cabecera (≈ 20–24 px), medianil 12/16 px.
- **Línea de horizonte:** 1 px al 16 % sobre claro y 22 % sobre oscuro. Sin radios, sombras, degradados ni iconos. La única forma curva es el avatar circular (`app/icon.svg`).
- **Wordmark:** `components/Wordmark.tsx` contiene los contornos vectoriales trazados desde el archivo maestro del manual (proporción 3.70 : 1). Nunca sustituir por texto tipográfico. Copia en `public/land-wordmark.svg`.
- **Placa:** rectángulo sólido translúcido (Sombra al 55 %) para textos sobre fotografía, en lugar de degradados.

## Movimiento

- Revelado de bloques por opacidad: 300 ms, retraso 120 ms.
- Hover de imagen: `scale(1.03)`, 500 ms, `cubic-bezier(0.28, 1, 0.5, 1)`.
- Subrayados: 125 ms. Cambios de color: 300 ms, `cubic-bezier(0.4, 0, 0.2, 1)`.
- Escenario de destacados: crossfade de 400 ms por scroll nativo; se montan solo el medio activo y el siguiente y el resto en reposo.
- Menú móvil: 500 ms, Caliza al 70 % con `blur(15px)`.
- Transición de ruta: fundido a Caliza de 220 ms + entrada de 300 ms.
- Intro de primera visita: 2.2 s, omitible con clic, Enter o Escape; una vez por sesión y solo en portada.
- Con `prefers-reduced-motion` no hay intro, ni veil, ni crossfade: el escenario se sustituye por una lista estática y los cambios son instantáneos.
- `VideoFrame` está listo para video (silenciado, loop, `playsInline`, poster, pausa, detención fuera del viewport). Hoy no hay videos en el contenido.

## Accesibilidad y rendimiento

- Navegación completa por teclado, foco visible, enlace «Ir al contenido», áreas táctiles ≥ 44 px, menú móvil con `inert` y cierre con Escape, contraste AA.
- `next/image` con AVIF/WebP y `sizes` por diseño; prioridad solo en el primer medio de cada página.
- Cabecera de 44 px que cambia de tema según la sección bajo ella (`data-header-theme`).
- Datos estructurados `LocalBusiness`, Open Graph, canonical por ruta, sitemap y robots.
- Sin analítica ni cookies. Si se instala Meta Pixel o GA4, añadir consentimiento previo (componente `CookieConsent` no incluido por no ser necesario hoy).

Compilación de producción verificada. Capturas (en el ZIP de entrega, `docs/capturas/`) a 390, 768 y 1280 px y pruebas de interacción (intro, filtros, «Cerrar» con restauración de filtro y scroll, menú móvil, movimiento reducido, 404, sitemap).

## Medios en el repositorio

Los binarios (`public/media/**`) no viajan por el conector de GitHub; se suben una vez desde GitHub web (*Add file → Upload files*, arrastrando la carpeta `media` dentro de `public/`) o con `git push` desde una copia local del ZIP. Vercel vuelve a desplegar en automático con cada push.

## Pendientes antes de publicar

- **Fotografías originales** de los siete proyectos (ver «Sustituir los medios provisionales»).
- **Nombres provisionales:** Casa del Sauce y Casa de Piedra esperan confirmación de LAND (`provisionalName: true`).
- **Parque Industrial FINSA** está como borrador (`published: false`) hasta confirmar ubicación, cliente y estado.
- **Aviso de privacidad:** completar razón social o nombre del responsable (marcado en verde en `/privacidad`).
- **Correo** `info@landpaisajismo.mx`: confirmar que está activo antes de distribuir.
- **WhatsApp:** no se incluyó enlace porque no consta el número que lo recibe; se añade en `content/site.ts` y `SiteFooter` en cuanto LAND lo confirme.
- **Equipo, noticias, publicaciones:** el sistema está listo; solo faltan datos autorizados.
- **Instagram:** el enlace apunta a `@land.paisajismo`.

## Estructura

```
app/                rutas, layout, globals.css, fonts, icon.svg, sitemap, robots
components/         SiteHeader, MobileMenu (en SiteHeader), HeaderTheme, PageTransition, FirstVisitIntro,
                    StatementHero, FeaturedProjectsScroller, MediaFrame, VideoFrame, ProjectsIndex
                    (ProjectFilter + ProjectGrid + ProjectCard), ProjectHero, EditorialMediaSequence,
                    QuoteBlock, ProjectFacts, NextProject, Pillars (PillarNavigation + PillarSection),
                    People (PeopleTabs + PersonCard), ExpandableList, NewsList (NewsRow + Pagination),
                    SiteFooter, Wordmark, JsonLd
content/            site, projects, pillars, studio, news, media (generado), types
lib/                utilidades, marcado en línea
public/media/       medios por proyecto
scripts/            media-manifest.mjs (producción), build-media.py y detect-regions.py (origen de los recortes)
docs/capturas/      capturas de QA
```
