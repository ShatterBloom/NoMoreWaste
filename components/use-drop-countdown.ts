'use client'

import { useEffect, useMemo, useState } from 'react'

// Counts down to the next 5pm — shared by the Discover spotlight and Daily Drop.
export function useDropCountdown() {
  const [now, setNow] = useState(() => new Date())
  // Avoid a hydration mismatch: the server and client compute time-to-5pm at
  // different instants, so we only reveal real values after the client mounts.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const target = useMemo(() => {
    const d = new Date(now)
    d.setHours(17, 0, 0, 0)
    if (d.getTime() <= now.getTime()) d.setDate(d.getDate() + 1)
    return d
  }, [now])

  const diff = Math.max(0, target.getTime() - now.getTime())
  const hrs = Math.floor(diff / 3_600_000)
  const min = Math.floor((diff % 3_600_000) / 60_000)
  const sec = Math.floor((diff % 60_000) / 1000)

  if (!mounted) {
    return { hrs: '--', min: '--', sec: '--' }
  }

  return {
    hrs: String(hrs).padStart(2, '0'),
    min: String(min).padStart(2, '0'),
    sec: String(sec).padStart(2, '0'),
  }
}
