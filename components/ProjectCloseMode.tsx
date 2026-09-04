'use client'

import { useEffect } from 'react'
import { FROM_INDEX_KEY } from '@/lib/utils'
import { useHeaderMode } from './HeaderModeContext'

/** Si el proyecto se abrió desde el índice, la cabecera muestra «Cerrar» y regresa conservando filtros y scroll. */
export function ProjectCloseMode() {
  const { setMode } = useHeaderMode()
  useEffect(() => {
    let from = false
    try {
      from = sessionStorage.getItem(FROM_INDEX_KEY) === '1'
      sessionStorage.removeItem(FROM_INDEX_KEY)
    } catch {}
    if (from && window.history.length > 1) setMode('close')
    return () => setMode('nav')
  }, [setMode])
  return null
}
