'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Transición de ruta: fundido al color de fondo (220 ms) → navegación → entrada (300 ms).
 * Total ≈ 520–600 ms. Desactivada con prefers-reduced-motion. Nunca bloquea el scroll.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [on, setOn] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    setOn(false)
    if (timer.current) window.clearTimeout(timer.current)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element).closest('a')
      if (!a || a.target === '_blank' || a.hasAttribute('download') || a.dataset.noTransition !== undefined) return
      const url = new URL(a.href, location.href)
      if (url.origin !== location.origin) return
      if (url.pathname === location.pathname && url.hash) return
      if (url.pathname === location.pathname && url.search === location.search) return
      // Solo preventDefault: los onClick de React siguen corriendo y next/link respeta defaultPrevented.
      e.preventDefault()
      const target = url.pathname + url.search + url.hash
      if (reduce) {
        router.push(target)
        return
      }
      setOn(true)
      timer.current = window.setTimeout(() => router.push(target), 220)
      window.setTimeout(() => setOn(false), 1800)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [router])

  return (
    <>
      {children}
      <div className="veil" data-on={on} aria-hidden="true" />
    </>
  )
}
