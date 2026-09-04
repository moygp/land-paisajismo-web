'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type Mode = 'nav' | 'close'
const Ctx = createContext<{ mode: Mode; setMode: (m: Mode) => void }>({ mode: 'nav', setMode: () => {} })

export function HeaderModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('nav')
  return <Ctx.Provider value={{ mode, setMode }}>{children}</Ctx.Provider>
}

export function useHeaderMode() {
  return useContext(Ctx)
}
