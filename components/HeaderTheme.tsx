'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Lee qué sección queda bajo la cabecera y fija html[data-header] = light | dark | sombra | verde. */
export function HeaderTheme() {
  const pathname = usePathname()

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const y = Math.min(22, window.innerHeight - 1)
      const x = Math.round(window.innerWidth * 0.5)
      const els = document.elementsFromPoint(x, y)
      let theme = 'light'
      for (const el of els) {
        if (el.closest('.header, .menu, .veil, .intro')) continue
        const host = el.closest('[data-header-theme]') as HTMLElement | null
        if (host) theme = host.dataset.headerTheme || 'light'
        break
      }
      document.documentElement.dataset.header = theme
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    const t = window.setTimeout(update, 120)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [pathname])

  return null
}
