'use client'

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'

export type Screen =
  | 'discover'
  | 'drop'
  | 'detail'
  | 'claim'
  | 'myclaims'
  | 'merchant'
  | 'create'

interface NavState {
  screen: Screen
  // id of the box currently being viewed on detail / claim screens
  activeBoxId: string | null
  navigate: (screen: Screen, boxId?: string | null) => void
}

const NavContext = createContext<NavState | null>(null)

export function NavProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>('discover')
  const [activeBoxId, setActiveBoxId] = useState<string | null>(null)

  const navigate = useCallback((next: Screen, boxId: string | null = null) => {
    setScreen(next)
    if (boxId !== undefined) setActiveBoxId(boxId)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [])

  return (
    <NavContext.Provider value={{ screen, activeBoxId, navigate }}>
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav must be used within NavProvider')
  return ctx
}
