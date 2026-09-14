'use client'

import { useRef, useState, type CSSProperties, type ReactNode } from 'react'

/** Escala 1.04 + desplazamiento de hasta ±12 px que sigue al cursor (manual v1.2 §08). Sin efecto táctil ni con movimiento reducido (CSS). */
export function Parallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const nx = (e.clientX - r.left) / r.width - 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5
    setPos({ x: Math.round(nx * -24), y: Math.round(ny * -24) })
  }

  return (
    <div
      ref={ref}
      className="parallax"
      data-hover={hover}
      style={{ '--px': `${pos.x}px`, '--py': `${pos.y}px` } as CSSProperties}
      onMouseEnter={() => setHover(true)}
      onMouseMove={onMove}
      onMouseLeave={() => {
        setHover(false)
        setPos({ x: 0, y: 0 })
      }}
    >
      {children}
    </div>
  )
}
