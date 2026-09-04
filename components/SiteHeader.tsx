'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { nav, site } from '@/content/site'
import { Wordmark } from './Wordmark'
import { useHeaderMode } from './HeaderModeContext'

/** SiteHeader + DesktopNavigation + MobileMenu. Sticky, 44 px, cambia de tema según la sección bajo la cabecera. */
export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { mode, setMode } = useHeaderMode()
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('is-locked')
    }
  }, [open])

  const isActive = (href: string) => !href.startsWith('#') && (pathname === href || pathname.startsWith(href + '/'))

  const closeProject = () => {
    setMode('nav')
    router.back()
  }

  return (
    <>
      <header className="header">
        <Link href="/" className="header__brand" aria-label="LAND · inicio">
          <Wordmark />
        </Link>
        {mode === 'close' ? (
          <button type="button" className="header__close" onClick={closeProject}>
            <span className="lnk lnk--on">Cerrar</span>
          </button>
        ) : (
          <>
            <nav className="nav" aria-label="Principal">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? 'page' : undefined}>
                  <span className="lnk">{n.label}</span>
                </Link>
              ))}
            </nav>
            <button
              ref={btnRef}
              type="button"
              className="header__menu"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? 'Cerrar' : 'Menú'}
            </button>
          </>
        )}
      </header>

      <div id="menu" className="menu" data-open={open} inert={!open} aria-label="Menú">
        <ul className="menu__list">
          <li>
            <Link href="/" onClick={() => setOpen(false)}>Inicio</Link>
          </li>
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="menu__foot">
          <p>
            {site.address.street}, {site.address.neighborhood}
            <br />
            {site.address.city}, {site.address.regionShort}
          </p>
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.instagram.url} target="_blank" rel="noopener">
            {site.instagram.handle}
          </a>
        </div>
      </div>
    </>
  )
}
