'use client'

import { ArrowRight, MapPin, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { CATEGORIES, getNearbyBoxes, type Box, type Cuisine } from '@/lib/api'
import { BoxCard } from './box-card'
import { useNav } from './navigation'
import { useDropCountdown } from './use-drop-countdown'

function PulseDot({ color, size = 8 }: { color: string; size?: number }) {
  return (
    <span
      className="nmw-pulse inline-block rounded-full"
      style={{ width: size, height: size, backgroundColor: color }}
      aria-hidden="true"
    />
  )
}

function CountdownBlock({
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
      className="flex flex-col items-center rounded-2xl px-3 py-2"
      style={{ backgroundColor: 'rgba(255,255,255,.08)' }}
    >
      <span
        className="font-heading text-[28px] leading-none"
        style={{ fontWeight: 800, color: highlight ? 'var(--color-yellow)' : '#fff' }}
      >
        {value}
      </span>
      <span
        className="font-mono mt-1 text-[10px] uppercase tracking-widest"
        style={{ color: 'rgba(255,255,255,.6)' }}
      >
        {label}
      </span>
    </div>
  )
}

function DailyDropSpotlight() {
  const { navigate } = useNav()
  const { hrs, min, sec } = useDropCountdown()
  return (
    <button
      type="button"
      onClick={() => navigate('drop')}
      className="relative flex flex-col justify-between overflow-hidden text-left text-white"
      style={{ backgroundColor: 'var(--color-ink)', borderRadius: 28, padding: '30px 32px' }}
    >
      <div className="flex items-center gap-2">
        <span
          className="rounded-full px-2.5 py-1 text-[12px] font-extrabold uppercase tracking-wide text-white"
          style={{ backgroundColor: 'var(--color-berry)' }}
        >
          Daily Drop
        </span>
        <span className="text-[13px]" style={{ color: 'rgba(255,255,255,.7)' }}>
          opens at 5pm
        </span>
      </div>

      <h3
        className="font-heading mt-5 text-[24px] leading-tight"
        style={{ fontWeight: 800, letterSpacing: '-0.4px' }}
      >
        Tonight&apos;s surplus drops at 5pm sharp
      </h3>

      <div className="mt-5 flex gap-2.5">
        <CountdownBlock value={hrs} label="Hrs" />
        <CountdownBlock value={min} label="Min" />
        <CountdownBlock value={sec} label="Sec" highlight />
      </div>

      <span
        className="mt-6 flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-bold text-white"
        style={{ backgroundColor: 'var(--color-berry)' }}
      >
        Go to Daily Drop
        <ArrowRight size={18} strokeWidth={2.4} />
      </span>
    </button>
  )
}

function Hero() {
  return (
    <div className="grid grid-cols-1 gap-[22px] lg:grid-cols-[1.18fr_.82fr]">
      <div
        className="relative overflow-hidden text-white"
        style={{ backgroundColor: 'var(--color-primary)', borderRadius: 28, padding: '38px 40px' }}
      >
        <span
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,.12)' }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -bottom-16 right-16 h-40 w-40 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,.1)' }}
          aria-hidden="true"
        />

        <span
          className="relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-bold"
          style={{ backgroundColor: 'rgba(255,255,255,.18)' }}
        >
          <PulseDot color="var(--color-yellow)" />
          Closing soon near you
        </span>

        <h1
          className="font-heading relative mt-4 text-[40px] leading-[1.02] sm:text-[50px]"
          style={{ fontWeight: 800, letterSpacing: '-1.4px' }}
        >
          Rescue delicious food before it goes to waste
        </h1>

        <p className="relative mt-4 max-w-[440px] text-[17px]" style={{ color: 'rgba(255,255,255,.92)' }}>
          Cafés and bakeries near you have good food they can&apos;t sell before
          close. Grab it at a steep discount and keep it out of the bin.
        </p>

        <div
          className="relative mt-6 flex items-center gap-2 bg-white p-2"
          style={{ borderRadius: 16 }}
        >
          <Search size={20} strokeWidth={2} style={{ color: 'var(--color-muted)' }} className="ml-2" />
          <input
            type="text"
            placeholder="Search cafés, cuisines or dishes"
            className="flex-1 bg-transparent text-[15px] outline-none"
            style={{ color: 'var(--color-ink)' }}
          />
          <button
            type="button"
            className="rounded-[12px] px-4 py-2.5 text-[14px] font-bold text-white"
            style={{ backgroundColor: 'var(--color-ink)' }}
          >
            Find food
          </button>
        </div>

        <div className="relative mt-7 flex flex-wrap items-center gap-5">
          {[
            { n: '1,240', l: 'meals rescued today' },
            { n: '86', l: 'venues nearby' },
            { n: '3.1 t', l: 'saved this month' },
          ].map((s, i) => (
            <div key={s.l} className="flex items-center gap-5">
              {i > 0 && (
                <span
                  className="h-9 w-px"
                  style={{ backgroundColor: 'rgba(255,255,255,.28)' }}
                  aria-hidden="true"
                />
              )}
              <div>
                <div className="font-heading text-[26px] leading-none" style={{ fontWeight: 800 }}>
                  {s.n}
                </div>
                <div className="mt-1 text-[13px]" style={{ color: 'rgba(255,255,255,.85)' }}>
                  {s.l}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DailyDropSpotlight />
    </div>
  )
}

export function DiscoverScreen() {
  const [boxes, setBoxes] = useState<Box[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState<'All' | Cuisine>('All')

  useEffect(() => {
    let mounted = true
    getNearbyBoxes().then((data) => {
      if (mounted) {
        setBoxes(data)
        setLoading(false)
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  const filtered = useMemo(
    () => (active === 'All' ? boxes : boxes.filter((b) => b.cuisine === active)),
    [boxes, active],
  )

  return (
    <main className="mx-auto w-full max-w-[1240px] px-7 pb-2 pt-8">
      <Hero />

      {/* Category chips */}
      <div className="no-scrollbar flex gap-[9px] overflow-x-auto px-0.5 pb-1.5 pt-[26px]">
        {CATEGORIES.map((cat) => {
          const isActive = cat === active
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className="shrink-0 rounded-full px-4 py-[9px] text-[14px] font-bold transition-colors"
              style={{
                backgroundColor: isActive ? 'var(--color-primary)' : '#fff',
                color: isActive ? '#fff' : 'var(--color-ink)',
                border: isActive ? '1px solid transparent' : '1px solid var(--color-border)',
              }}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Section header */}
      <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-[30px]" style={{ fontWeight: 800, letterSpacing: '-0.8px' }}>
            Surplus boxes near you
          </h2>
          <p className="mt-1 text-[15px]" style={{ color: 'var(--color-muted)' }}>
            {filtered.length} venues with food to rescue right now
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[14px] font-bold"
          style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
        >
          <MapPin size={16} strokeWidth={2} style={{ color: 'var(--color-primary)' }} />
          Open map view
        </button>
      </div>

      {/* Box grid */}
      <div
        className="mt-5 grid gap-5"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(248px, 1fr))' }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-[290px] animate-pulse"
                style={{
                  backgroundColor: 'var(--color-track)',
                  borderRadius: 22,
                  border: '1px solid var(--color-border)',
                }}
              />
            ))
          : filtered.map((box) => <BoxCard key={box.id} box={box} />)}
      </div>
    </main>
  )
}
