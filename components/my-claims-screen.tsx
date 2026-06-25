'use client'

import { useEffect, useMemo, useState } from 'react'
import { getMyClaims, type Claim } from '@/lib/api'
import { useClaims } from './claims-store'
import { FoodTile } from './food-tile'
import { StatusPill } from './status-pill'

type Tab = 'active' | 'past'

function isActive(claim: Claim) {
  return claim.status === 'Reserved'
}

function ClaimRow({ claim }: { claim: Claim }) {
  return (
    <div
      className="flex items-center gap-4 bg-white"
      style={{ border: '1px solid var(--color-border)', borderRadius: 18, padding: '18px 20px' }}
    >
      <div className="shrink-0" style={{ width: 48 }}>
        <FoodTile cuisine={claim.cuisine} height={48} radius="13px" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[16px]" style={{ fontWeight: 800 }}>
          {claim.item}
        </p>
        <p className="truncate text-[14px]" style={{ color: 'var(--color-muted)' }}>
          {claim.venue}
        </p>
        <p className="mt-0.5 truncate text-[13px]" style={{ color: 'var(--color-muted)' }}>
          {claim.window}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="font-mono text-[18px]" style={{ fontWeight: 700 }}>
          {claim.code}
        </span>
        <StatusPill status={claim.status} />
      </div>
    </div>
  )
}

export function MyClaimsScreen() {
  const { claims: liveClaims } = useClaims()
  const [seeded, setSeeded] = useState<Claim[]>([])
  const [tab, setTab] = useState<Tab>('active')

  useEffect(() => {
    let mounted = true
    getMyClaims('me').then((data) => {
      if (mounted) setSeeded(data)
    })
    return () => {
      mounted = false
    }
  }, [])

  // Live claims (made elsewhere in the app this session) lead the list, then
  // the seeded history. De-dupe defensively by id.
  const all = useMemo(() => {
    const map = new Map<string, Claim>()
    for (const c of [...liveClaims, ...seeded]) {
      if (!map.has(c.id)) map.set(c.id, c)
    }
    return [...map.values()]
  }, [liveClaims, seeded])

  const active = all.filter(isActive)
  const past = all.filter((c) => !isActive(c))
  const shown = tab === 'active' ? active : past

  const tabs: Array<{ value: Tab; label: string; count: number }> = [
    { value: 'active', label: 'Active', count: active.length },
    { value: 'past', label: 'Past', count: past.length },
  ]

  return (
    <main className="mx-auto w-full max-w-[760px] flex-1" style={{ padding: '34px 24px 40px' }}>
      <h1
        className="font-heading text-[34px]"
        style={{ fontWeight: 800, letterSpacing: '-1px' }}
      >
        My claims
      </h1>
      <p className="mt-1.5 text-[15px]" style={{ color: 'var(--color-muted)' }}>
        Your reserved boxes and pickup codes, plus everything you&apos;ve rescued before.
      </p>

      {/* Segmented tabs */}
      <div
        className="mt-5 inline-flex rounded-full p-1"
        style={{ backgroundColor: 'var(--color-warm-chip)' }}
      >
        {tabs.map((t) => {
          const isSel = tab === t.value
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className="rounded-full px-5 py-2 text-[13px] font-bold transition-colors"
              style={{
                backgroundColor: isSel ? 'var(--color-ink)' : 'transparent',
                color: isSel ? '#fff' : 'var(--color-muted)',
              }}
            >
              {t.label} {t.count}
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {shown.length === 0 ? (
          <div
            className="bg-white text-center text-[14px]"
            style={{
              border: '1px dashed var(--color-border)',
              borderRadius: 18,
              padding: '34px 20px',
              color: 'var(--color-muted)',
            }}
          >
            {tab === 'active'
              ? 'No active claims yet. Claim a box or a Daily Drop to see it here.'
              : 'No past claims yet.'}
          </div>
        ) : (
          shown.map((c) => <ClaimRow key={c.id} claim={c} />)
        )}
      </div>
    </main>
  )
}
