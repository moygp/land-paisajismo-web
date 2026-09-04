'use client'

import { useEffect } from 'react'

/**
 * Revelado por opacidad de los bloques [data-reveal] al entrar en pantalla (una sola vez por bloque).
 * Observa también los nodos que se añaden después (Suspense, navegación cliente).
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add('is-in')
            io.unobserve(en.target)
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.02 },
    )
    const watch = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    }
    watch(document)
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches('[data-reveal]')) io.observe(n)
            watch(n)
          }
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
  return null
}
