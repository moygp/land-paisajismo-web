/**
 * Regenera content/media.ts a partir de los archivos en public/media/<slug>/<nombre>.webp|jpg|png.
 * Uso: node scripts/media-manifest.mjs
 * Conserva las etiquetas ya declaradas en content/media.ts; para archivos nuevos, deduce la etiqueta por nombre.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const root = new URL('..', import.meta.url).pathname
const mediaDir = join(root, 'public', 'media')
const out = join(root, 'content', 'media.ts')

const RENDER_SLUGS = new Set(['portefino', 'banregio-back-office', 'via-zocalo', 'parque-industrial-finsa'])
const guessTag = (slug, name) => {
  if (/plano|plan-|seccion/.test(name)) return 'PLANO'
  if (/asoleamiento|diagrama/.test(name)) return 'DIAGRAMA'
  return RENDER_SLUGS.has(slug) ? 'RENDER' : 'FOTOGRAFÍA'
}

let existing = {}
try {
  const src = readFileSync(out, 'utf8')
  for (const m of src.matchAll(/'([^']+)': \{ src: '\/media\/([^/]+)\/[^']+', width: \d+, height: \d+, tag: '([^']+)' \}/g)) {
    existing[`${m[2]}/${m[1]}`] = m[3]
  }
} catch {}

const lines = [
  '// Generado por scripts/media-manifest.mjs a partir de public/media.',
  '// Sustituir los recortes provisionales por los originales de LAND (≥ 2400 px) conservando los nombres y volver a ejecutar el script.',
  '',
  'export const media = {',
]
for (const slug of readdirSync(mediaDir).sort()) {
  const files = readdirSync(join(mediaDir, slug)).filter((f) => /\.(webp|jpe?g|png|avif)$/i.test(f)).sort()
  if (!files.length) continue
  lines.push(`  '${slug}': {`)
  for (const f of files) {
    const name = f.replace(/\.[^.]+$/, '')
    const meta = await sharp(join(mediaDir, slug, f)).metadata()
    const tag = existing[`${slug}/${name}`] ?? guessTag(slug, name)
    lines.push(`    '${name}': { src: '/media/${slug}/${f}', width: ${meta.width}, height: ${meta.height}, tag: '${tag}' },`)
  }
  lines.push('  },')
}
lines.push('} as const', '', 'export type MediaKey = keyof typeof media', '')
writeFileSync(out, lines.join('\n'))
console.log('content/media.ts actualizado')
