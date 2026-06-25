'use client'

import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { CUISINE_COLORS, type Box } from '@/lib/api'
import { FoodTile } from './food-tile'
import { useNav } from './navigation'

export function BoxCard({ box }: { box: Box }) {
  const { navigate } = useNav()
  const cuisineColor = CUISINE_COLORS[box.cuisine]

  return (
    <button
      type="button"
      onClick={() => navigate('detail', box.id)}
      className="group block overflow-hidden bg-white text-left transition-all duration-150 ease-out hover:-translate-y-1"
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: 22,
        boxShadow: '0 1px 2px rgba(0,0,0,.04)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 16px 34px rgba(42,33,27,.13)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,.04)'
      }}
    >
      <FoodTile cuisine={box.cuisine}>
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[12px] font-extrabold"
          style={{ backgroundColor: 'var(--color-yellow)', color: 'var(--color-ink)' }}
        >
          {box.discount}% off
        </span>
        <span
          className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[12px] font-bold text-white"
          style={{ backgroundColor: 'rgba(255,255,255,.22)', backdropFilter: 'blur(4px)' }}
        >
          {box.quantityLeft} left
        </span>
        <span
          className="font-heading absolute bottom-3 left-3 right-3 text-[19px] leading-tight text-white"
          style={{ fontWeight: 800, textShadow: '0 1px 8px rgba(0,0,0,.32)' }}
        >
          {box.dish}
        </span>
      </FoodTile>

      <div className="px-4 pb-[17px] pt-[15px]">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[16px] font-extrabold">{box.venue}</span>
          <span
            className="flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-bold"
            style={{ backgroundColor: 'var(--color-warm-chip)', color: 'var(--color-ink)' }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: cuisineColor }}
            />
            {box.cuisine}
          </span>
        </div>

        <div
          className="mt-2 flex items-center gap-3 text-[13px]"
          style={{ color: 'var(--color-muted)' }}
        >
          <span className="flex items-center gap-1">
            <MapPin size={14} strokeWidth={2} /> {box.distance}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} strokeWidth={2} /> {box.pickupWindow}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span
              className="font-heading text-[22px]"
              style={{ fontWeight: 800, color: 'var(--color-primary)' }}
            >
              ${box.salePrice.toFixed(2)}
            </span>
            <span
              className="text-[14px] line-through"
              style={{ color: 'var(--color-muted)' }}
            >
              ${box.originalPrice.toFixed(2)}
            </span>
          </div>
          <span
            className="flex h-[38px] w-[38px] items-center justify-center rounded-[11px] text-white transition-transform group-hover:translate-x-0.5"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <ArrowRight size={18} strokeWidth={2.4} />
          </span>
        </div>
      </div>
    </button>
  )
}
