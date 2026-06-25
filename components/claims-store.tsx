'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import type { Claim } from '@/lib/api'

interface ClaimsState {
  claims: Claim[]
  latest: Claim | null
  addClaim: (claim: Claim) => void
}

const ClaimsContext = createContext<ClaimsState | null>(null)

export function ClaimsProvider({ children }: { children: ReactNode }) {
  const [claims, setClaims] = useState<Claim[]>([])

  const addClaim = useCallback((claim: Claim) => {
    // newest first, so claims[0] is always the most recent
    setClaims((prev) => [claim, ...prev])
  }, [])

  const latest = claims[0] ?? null

  return (
    <ClaimsContext.Provider value={{ claims, latest, addClaim }}>
      {children}
    </ClaimsContext.Provider>
  )
}

export function useClaims() {
  const ctx = useContext(ClaimsContext)
  if (!ctx) throw new Error('useClaims must be used within ClaimsProvider')
  return ctx
}
