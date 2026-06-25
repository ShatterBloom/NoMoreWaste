'use client'

import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { claimItem, getDailyDrops, type DropItem } from '@/lib/api'
import { useClaims } from './claims-store'
import { FoodTile } from './food-tile'
import { useNav } from './navigation'
import { useDropCountdown } from './use-drop-countdown'

type DropState = 'before' | 'open' | 'soldout'

const TOGGLE_OPTIONS: Array<{ value: DropState; label: string }> = [
  { value: 'before', label: 'Before open' },
  { value: 'open', label: 'Open now' },
  { value: 'soldout', label: 'Sold out' },
]

function BigCountdownBlock({
  value,
  label,
  highlight,
}: {
  value: string
  label: string
  highlight?: boolean
}) {
  return (
    <div
      className="flex min-w-[96px] flex-col items-center rounded-2xl px-4 py-3"
      style={{ backgroundColor: 'rgba(255,255,255,.08)' }}
    >
      <span
        className="font-heading leading-none"
        style={{ fontWeight: 800, fontSize: 52, color: highlight ? 'var(--color-yellow)' : '#fff' }}
      >
        {value}
      </span>
      <span
        className="font-mono mt-2 text-[11px] uppercase tracking-widest"
        style={{ color: 'rgba(255,255,255,.6)' }}
      >
        {label}
      </span>
    </div>
  )
}

function DropCard({
  item,
  dropState,
  onClaim,
}: {
  item: DropItem
  dropState: DropState
  onClaim: (item: DropItem) => void
}) {
  // An individual item is sold out if its own stock is gone, or the whole drop is.
  const itemSoldOut = item.quantity <= 0
  const effectiveState: DropState = itemSoldOut ? 'soldout' : dropState

  const pct = Math.round((item.quantity / item.total) * 100)
  const barColor = itemSoldOut ? '#D9534F' : 'var(--color-teal)'

  let label: string
  let disabled: boolean
  let bg: string
  let color: string
  if (effectiveState === 'open') {
    label = `Claim for $${item.salePrice.toFixed(2)}`
    disabled = false
    bg = 'var(--color-primary)'
    color = '#fff'
  } else if (effectiveState === 'soldout') {
    label = 'Sold out'
    disabled = true
    bg = '#EFE4D8'
    color = '#A89A8C'
  } else {
    label = 'Opens at 5 pm'
    disabled = true
    bg = '#EFE4D8'
    color = '#A89A8C'
  }

  return (
    <div
      className="flex flex-col overflow-hidden bg-white"
      style={{ border: '1px solid var(--color-border)', borderRadius: 22 }}
    >
      <FoodTile cuisine={item.cuisine} height={140}>
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white"
          style={{ backgroundColor: 'var(--color-berry)' }}
        >
          Daily Drop
        </span>
        <span
          className="font-heading absolute bottom-3 left-3 right-3 text-[18px] leading-tight text-white"
          style={{ fontWeight: 800, textShadow: '0 1px 8px rgba(0,0,0,.32)' }}
        >
          {item.dish}
        </span>
      </FoodTile>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <span className="text-[15px] font-bold" style={{ color: 'var(--color-muted)' }}>
          {item.venue}
        </span>

        <div className="mt-2 flex items-baseline gap-2">
          <span
            className="font-heading text-[24px]"
            style={{ fontWeight: 800, color: 'var(--color-primary)' }}
          >
            ${item.salePrice.toFixed(2)}
          </span>
          <span className="text-[14px] line-through" style={{ color: 'var(--color-muted)' }}>
            ${item.originalPrice.toFixed(2)}
          </span>
        </div>

        <div
          className="mt-3 h-2 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: '#F1E7DA' }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${pct}%`, backgroundColor: barColor }}
          />
        </div>
        <span className="mt-2 text-[13px] font-semibold" style={{ color: 'var(--color-muted)' }}>
          {item.quantity} of {item.total} left
        </span>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onClaim(item)}
          className="mt-3.5 w-full rounded-[13px] py-3 text-[15px] font-bold transition-transform"
          style={{
            backgroundColor: bg,
            color,
            cursor: disabled ? 'not-allowed' : 'pointer',
            boxShadow: disabled ? 'none' : '0 8px 18px rgba(255,106,43,.32)',
          }}
        >
          {label}
        </button>
      </div>
    </div>
  )
}

export function DropScreen() {
  const { navigate } = useNav()
  const { addClaim } = useClaims()
  const { hrs, min, sec } = useDropCountdown()

  const [items, setItems] = useState<DropItem[]>([])
  const [dropState, setDropState] = useState<DropState>('before')

  useEffect(() => {
    let mounted = true
    getDailyDrops().then((data) => {
      if (mounted) setItems(data)
    })
    return () => {
      mounted = false
    }
  }, [])

  async function handleClaim(item: DropItem) {
    if (dropState !== 'open' || item.quantity <= 0) return
    const { claim, items: next } = await claimItem(item.id, 'me')
    setItems(next)
    addClaim(claim)
    // If everything is gone, flip the whole drop to sold out.
    if (next.every((d) => d.quantity <= 0)) setDropState('soldout')
    navigate('claim')
  }

  return (
    <main className="mx-auto w-full max-w-[1120px]" style={{ padding: '30px 28px 8px' }}>
      <button
        type="button"
        onClick={() => navigate('discover')}
        className="flex items-center gap-1.5 text-[14px]"
        style={{ color: '#897B6D', fontWeight: 700 }}
      >
        <ArrowLeft size={17} strokeWidth={2.4} />
        Back to discover
      </button>

      {/* Banner */}
      <section
        className="mt-4 flex flex-col gap-8 text-white lg:flex-row lg:items-center lg:justify-between"
        style={{ backgroundColor: 'var(--color-ink)', borderRadius: 28, padding: '38px 40px' }}
      >
        <div className="max-w-[560px]">
          <span
            className="inline-block rounded-full px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-wide text-white"
            style={{ backgroundColor: 'var(--color-berry)' }}
          >
            Today&apos;s Daily Drop
          </span>
          <h1
            className="font-heading mt-4 leading-[1.04]"
            style={{ fontWeight: 800, fontSize: 40, letterSpacing: '-1.2px' }}
          >
            The flash deal that sells out in seconds
          </h1>
          <p className="mt-4 text-[16px]" style={{ color: 'rgba(255,255,255,.82)' }}>
            Every day at 5 pm a handful of items unlock at once for everyone. The
            claim button stays locked until the exact second it opens. First to tap
            wins.
          </p>
        </div>

        <div className="flex shrink-0 gap-3">
          <BigCountdownBlock value={hrs} label="Hrs" />
          <BigCountdownBlock value={min} label="Min" />
          <BigCountdownBlock value={sec} label="Sec" highlight />
        </div>
      </section>

      {/* Preview control bar */}
      <section
        className="mt-5 flex flex-col gap-3 bg-white sm:flex-row sm:items-center sm:justify-between"
        style={{ border: '1px solid var(--color-border)', borderRadius: 20, padding: '16px 20px' }}
      >
        <div>
          <h2 className="text-[15px] font-extrabold">Preview the moment</h2>
          <p className="mt-0.5 text-[12px]" style={{ color: 'var(--color-muted)' }}>
            Demo aid only. In production the state is driven by real time and stock,
            not a manual toggle.
          </p>
        </div>
        <div
          className="flex shrink-0 rounded-full p-1"
          style={{ backgroundColor: 'var(--color-warm-chip)' }}
        >
          {TOGGLE_OPTIONS.map((opt) => {
            const isActive = dropState === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDropState(opt.value)}
                className="rounded-full px-4 py-2 text-[13px] font-bold transition-colors"
                style={{
                  backgroundColor: isActive ? 'var(--color-ink)' : 'transparent',
                  color: isActive ? '#fff' : '#897B6D',
                }}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </section>

      {/* Drop grid */}
      <div
        className="mt-6 grid gap-5 pb-2"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(248px, 1fr))' }}
      >
        {items.map((item) => (
          <DropCard key={item.id} item={item} dropState={dropState} onClaim={handleClaim} />
        ))}
      </div>
    </main>
  )
}
