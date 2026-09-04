'use client'

import { useEffect, useRef, useState } from 'react'
import type { MediaAsset } from '@/content/types'

/** Video silenciado, en loop, playsInline, con poster, control de pausa y detención fuera del viewport. */
export function VideoFrame({ media }: { media: MediaAsset }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const userPaused = useRef(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting && !userPaused.current && !reduce) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    return () => {
      io.disconnect()
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
    }
  }, [])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      userPaused.current = false
      v.play().catch(() => {})
    } else {
      userPaused.current = true
      v.pause()
    }
  }

  return (
    <>
      <video ref={ref} src={media.src} poster={media.poster} muted loop playsInline preload="metadata" aria-label={media.alt} />
      <button type="button" className="vctl" onClick={toggle} aria-pressed={!playing}>
        {playing ? 'Pausar' : 'Reproducir'}
      </button>
    </>
  )
}
