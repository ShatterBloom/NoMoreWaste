'use client'

import { CUISINE_COLORS, type Cuisine } from '@/lib/api'
import type { ReactNode } from 'react'

export function FoodTile({
  cuisine,
  height = 152,
  radius,
  children,
}: {
  cuisine: Cuisine
  height?: number
  radius?: string
  children?: ReactNode
}) {
  const color = CUISINE_COLORS[cuisine]
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height, backgroundColor: color, borderRadius: radius }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,.16) 0 16px, rgba(255,255,255,0) 16px 32px)',
        }}
      />
      {children}
    </div>
  )
}
