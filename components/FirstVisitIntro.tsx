'use client'

import { useEffect, useRef, useState } from 'react'
import { site } from '@/content/site'
import type { MediaAsset } from '@/content/types'
import { INTRO_KEY } from '@/lib/utils'
import { Wordmark } from './Wordmark'

/**
 * Intro de primera visita (por sesión). 2.2 s: fotografía desenfocada que adquiere nitidez,
 * wordmark sobredimensionado y tres conceptos del manual. Se omite con clic, Enter o Escape.
 * Un script en <head> fija html[data-intro] antes del primer render; con prefers-reduced-motion no existe.
 */
export function FirstVisitIntro({ photo }: { photo: MediaAsset }) {
  const [step, setStep] = useState(-1)
  const [run, setRun] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const done = useRef(false)

  const finish = () => {
    if (done.current) return
    done.current = true
    setLeaving(true)
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {}
    window.setTimeout(() => {
      delete document.documentElement.dataset.intro
    }, 340)
  }

  useEffect(() => {
    if (document.documentElement.dataset.intro !== '1') return
    const t = [
      window.setTimeout(() => setRun(true), 20),
      window.setTimeout(() => setStep(0), 150),
      window.setTimeout(() => setStep(1), 800),
      window.setTimeout(() => setStep(2), 1450),
      window.setTimeout(finish, 2200),
    ]
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') finish()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      t.forEach(clearTimeout)
      document.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="intro" data-run={run} data-leaving={leaving} onClick={finish} role="presentation">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="intro__photo" src={photo.src} alt="" width={photo.width} height={photo.height} decoding="async" />
      <div className="intro__tint" />
      <div className="intro__body">
        <Wordmark className="intro__mark" />
        <div className="intro__concepts" aria-live="off">
          {site.introConcepts.map((c, i) => (
            <span key={c} className="intro__concept" data-on={step === i}>
              {c}
            </span>
          ))}
        </div>
      </div>
      <button type="button" className="intro__skip" onClick={finish}>
        <span className="lnk">Omitir</span>
      </button>
    </div>
  )
}
