'use client'

import { ArrowLeft, Clock, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { claimBox, CUISINE_COLORS, getBoxById, type Box } from '@/lib/api'
import { useClaims } from './claims-store'
import { FoodTile } from './food-tile'
import { useNav } from './navigation'

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div
      className="flex-1 bg-white"
      style={{ border: '1px solid var(--color-border)', borderRadius: 16, padding: '14px 16px' }}
    >
      <div className="flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
        {icon}
        <span className="text-[12px] font-bold uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>
          {label}
        </span>
      </div>
      <div className="mt-1.5 text-[16px] font-extrabold" style={{ color: 'var(--color-ink)' }}>
        {value}
      </div>
    </div>
  )
}

export function DetailScreen() {
  const { activeBoxId, navigate } = useNav()
  const { addClaim } = useClaims()
  const [box, setBox] = useState<Box | null>(null)
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)

  useEffect(() => {
    let mounted = true
    if (!activeBoxId) {
      setLoading(false)
      return
    }
    getBoxById(activeBoxId).then((data) => {
      if (mounted) {
        setBox(data ?? null)
        setLoading(false)
      }
    })
    return () => {
      mounted = false
    }
  }, [activeBoxId])

  async function handleClaim() {
    if (!box || claiming) return
    setClaiming(true)
    const claim = await claimBox(box.id, 'me')
    addClaim(claim)
    navigate('claim')
  }

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-[1080px] px-7 py-10">
        <div
          className="h-[420px] w-full animate-pulse"
          style={{ backgroundColor: 'var(--color-track)', borderRadius: 26 }}
        />
      </main>
    )
  }

  if (!box) {
    return (
      <main className="mx-auto w-full max-w-[1080px] px-7 py-16 text-center">
        <h1 className="font-heading text-[28px]" style={{ fontWeight: 800 }}>
          Box not found
        </h1>
        <button
          type="button"
          onClick={() => navigate('discover')}
          className="mt-4 rounded-full px-5 py-2.5 text-[14px] font-bold text-white"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          Back to discover
        </button>
      </main>
    )
  }

  const cuisineColor = CUISINE_COLORS[box.cuisine]
  const soldOut = box.quantityLeft <= 0

  return (
    <main className="mx-auto w-full max-w-[1080px] px-7 py-8">
      <button
        type="button"
        onClick={() => navigate('discover')}
        className="flex items-center gap-1.5 text-[14px]"
        style={{ color: '#897B6D', fontWeight: 700 }}
      >
        <ArrowLeft size={17} strokeWidth={2.4} />
        Back to discover
      </button>

      <div className="mt-5 grid grid-cols-1 items-start gap-[30px] md:grid-cols-2">
        {/* Left: photo tile */}
        <div
          className="relative overflow-hidden"
          style={{ borderRadius: 26, boxShadow: '0 10px 30px rgba(42,33,27,.1)' }}
        >
          <FoodTile cuisine={box.cuisine} height={420} radius="26px">
            <span
              className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-[13px] font-extrabold"
              style={{ backgroundColor: 'var(--color-yellow)', color: 'var(--color-ink)' }}
            >
              {box.discount}% off
            </span>
            <span
              className="font-mono absolute bottom-4 right-4 rounded-full px-2.5 py-1 text-[11px] uppercase tracking-widest text-white"
              style={{ backgroundColor: 'rgba(0,0,0,.28)', backdropFilter: 'blur(4px)' }}
            >
              Food Photo
            </span>
          </FoodTile>
        </div>

        {/* Right: details */}
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-bold"
            style={{ backgroundColor: 'var(--color-warm-chip)', color: 'var(--color-ink)' }}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cuisineColor }} />
            {box.cuisine}
          </span>

          <h1
            className="font-heading mt-3 leading-[1.05]"
            style={{ fontWeight: 800, fontSize: 34, letterSpacing: '-0.8px' }}
          >
            {box.dish}
          </h1>
          <p className="mt-1.5 text-[17px]" style={{ color: '#897B6D', fontWeight: 700 }}>
            {box.venue}
          </p>

          <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            A surprise mystery box of fresh surplus from today&apos;s kitchen. Expect
            a generous mix of {box.cuisine.toLowerCase()}{' '}favourites the team
            couldn&apos;t sell before close, packed up at a fraction of the price.
            Exact contents are a delicious surprise.
          </p>

          <div className="mt-5 flex gap-3">
            <InfoCard
              icon={<Clock size={16} strokeWidth={2.2} />}
              label="Pickup window"
              value={box.pickupWindow}
            />
            <InfoCard
              icon={<MapPin size={16} strokeWidth={2.2} />}
              label="Distance"
              value={box.distance}
            />
          </div>

          <div className="mt-4 flex items-center gap-2 text-[14px] font-bold">
            <span
              className="nmw-pulse inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: 'var(--color-teal)' }}
              aria-hidden="true"
            />
            <span style={{ color: 'var(--color-ink)' }}>
              {soldOut ? 'Sold out right now' : `${box.quantityLeft} left right now`}
            </span>
          </div>

          {/* Price block */}
          <div
            className="mt-5 flex items-center justify-between gap-4 bg-white"
            style={{ border: '1px solid var(--color-border)', borderRadius: 20, padding: '18px 20px' }}
          >
            <div className="flex items-baseline gap-2.5">
              <span
                className="font-heading text-[32px]"
                style={{ fontWeight: 800, color: 'var(--color-primary)' }}
              >
                ${box.salePrice.toFixed(2)}
              </span>
              <span className="text-[16px] line-through" style={{ color: 'var(--color-muted)' }}>
                ${box.originalPrice.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              disabled={soldOut || claiming}
              onClick={handleClaim}
              className="rounded-[14px] px-6 py-3.5 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: soldOut ? '#EFE4D8' : 'var(--color-primary)',
                color: soldOut ? '#A89A8C' : '#fff',
                cursor: soldOut || claiming ? 'not-allowed' : 'pointer',
                boxShadow: soldOut ? 'none' : '0 10px 22px rgba(255,106,43,.34)',
              }}
            >
              {soldOut ? 'Sold out' : claiming ? 'Claiming…' : 'Claim this box'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
