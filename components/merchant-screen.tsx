'use client'

import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  getMerchantClaims,
  getMerchantImpact,
  getMerchantListings,
  type Listing,
  type MerchantClaim,
  type MerchantImpact,
} from '@/lib/api'
import { FoodTile } from './food-tile'
import { useNav } from './navigation'
import { StatusPill } from './status-pill'

function StatCard({
  value,
  label,
  sub,
}: {
  value: string
  label: string
  sub: string
}) {
  return (
    <div
      className="bg-white"
      style={{ border: '1px solid var(--color-border)', borderRadius: 18, padding: '18px 20px' }}
    >
      <p
        className="font-heading text-[30px] leading-none"
        style={{ fontWeight: 800, color: 'var(--color-primary)' }}
      >
        {value}
      </p>
      <p className="mt-2 text-[14px]" style={{ fontWeight: 800 }}>
        {label}
      </p>
      <p className="mt-0.5 text-[12px]" style={{ color: 'var(--color-muted)' }}>
        {sub}
      </p>
    </div>
  )
}

function TypePill({ type }: { type: Listing['type'] }) {
  const isDrop = type === 'Daily Drop'
  return (
    <span
      className="inline-block whitespace-nowrap text-[11px] uppercase tracking-wide"
      style={{
        backgroundColor: isDrop ? 'var(--color-orange-bg)' : 'var(--color-success-bg)',
        color: isDrop ? 'var(--color-primary)' : 'var(--color-success)',
        borderRadius: 999,
        padding: '4px 10px',
        fontWeight: 800,
      }}
    >
      {type}
    </span>
  )
}

function ListingRow({ listing }: { listing: Listing }) {
  const soldOut = listing.left <= 0
  const pct = Math.round((listing.left / listing.total) * 100)
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="shrink-0" style={{ width: 46 }}>
        <FoodTile cuisine={listing.cuisine} height={46} radius="12px" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-[15px]" style={{ fontWeight: 800 }}>
            {listing.item}
          </p>
          <TypePill type={listing.type} />
        </div>

        <div
          className="mt-2 h-2 w-full max-w-[260px] overflow-hidden rounded-full"
          style={{ backgroundColor: 'var(--color-track)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              backgroundColor: soldOut ? 'var(--color-soldout)' : 'var(--color-teal)',
            }}
          />
        </div>
        <p className="mt-1.5 text-[12px]" style={{ color: 'var(--color-muted)' }}>
          {soldOut ? 'Sold out' : `${listing.left} of ${listing.total} left`} ·{' '}
          {listing.claims} claims
        </p>
      </div>

      <span
        className="font-heading shrink-0 text-[18px]"
        style={{ fontWeight: 800, color: 'var(--color-primary)' }}
      >
        ${listing.price.toFixed(2)}
      </span>
    </div>
  )
}

export function MerchantScreen() {
  const { navigate } = useNav()
  const [impact, setImpact] = useState<MerchantImpact | null>(null)
  const [listings, setListings] = useState<Listing[]>([])
  const [claims, setClaims] = useState<MerchantClaim[]>([])

  useEffect(() => {
    let mounted = true
    Promise.all([
      getMerchantImpact('dawn'),
      getMerchantListings('dawn'),
      getMerchantClaims('dawn'),
    ]).then(([i, l, c]) => {
      if (!mounted) return
      setImpact(i)
      setListings(l)
      setClaims(c)
    })
    return () => {
      mounted = false
    }
  }, [])

  const stats = impact
    ? [
        { value: String(impact.mealsRescued), label: 'Meals rescued', sub: 'All time' },
        {
          value: `$${impact.revenueRecovered}`,
          label: 'Revenue recovered',
          sub: 'From surplus stock',
        },
        {
          value: String(impact.newCustomers),
          label: 'New customers',
          sub: 'via Daily Drops',
        },
        { value: `${impact.wasteSavedKg} kg`, label: 'Waste saved', sub: 'Diverted from landfill' },
      ]
    : []

  return (
    <main className="mx-auto w-full max-w-[1080px] flex-1" style={{ padding: '34px 24px 44px' }}>
      {/* Header row */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span
            className="text-[12px] uppercase tracking-wide"
            style={{ color: 'var(--color-muted)', fontWeight: 800 }}
          >
            Merchant dashboard
          </span>
          <h1
            className="font-heading mt-1 text-[34px] leading-none"
            style={{ fontWeight: 800, letterSpacing: '-1px' }}
          >
            Dawn Bakehouse
          </h1>
          <p className="mt-1.5 text-[15px]" style={{ color: 'var(--color-muted)' }}>
            Brunswick, Melbourne
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('create')}
          className="flex items-center gap-2 rounded-[13px] px-5 py-3 text-[15px] text-white"
          style={{
            backgroundColor: 'var(--color-primary)',
            fontWeight: 700,
            boxShadow: '0 8px 18px rgba(255,106,43,.32)',
          }}
        >
          <Plus size={18} strokeWidth={2.6} />
          New listing
        </button>
      </div>

      {/* Impact stats */}
      <div
        className="mt-6 grid gap-3.5"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}
      >
        {stats.map((s) => (
          <StatCard key={s.label} value={s.value} label={s.label} sub={s.sub} />
        ))}
      </div>

      {/* Two columns */}
      <div
        className="mt-3.5 grid gap-3.5"
        style={{ gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)' }}
      >
        {/* Active listings */}
        <section
          className="bg-white"
          style={{ border: '1px solid var(--color-border)', borderRadius: 18, padding: '6px 22px 14px' }}
        >
          <h2 className="pt-5 text-[16px]" style={{ fontWeight: 800 }}>
            Active listings
          </h2>
          <div className="mt-1 flex flex-col divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {listings.map((l) => (
              <ListingRow key={l.id} listing={l} />
            ))}
          </div>
        </section>

        {/* Recent claims */}
        <section
          className="bg-white"
          style={{ border: '1px solid var(--color-border)', borderRadius: 18, padding: '6px 22px 18px' }}
        >
          <h2 className="pt-5 text-[16px]" style={{ fontWeight: 800 }}>
            Recent claims
          </h2>
          <div className="mt-3 flex flex-col gap-4">
            {claims.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[15px]" style={{ fontWeight: 700 }}>
                    {c.code}
                  </p>
                  <p className="truncate text-[13px]" style={{ color: 'var(--color-muted)' }}>
                    {c.item} · {c.who}
                  </p>
                </div>
                <StatusPill status={c.status} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
