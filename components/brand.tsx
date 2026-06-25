'use client'

import { useNav } from './navigation'

export function Logo({ size = 36 }: { size?: number }) {
  const dot = Math.round(size * 0.39)
  return (
    <span
      className="inline-flex items-center justify-center rounded-[12px]"
      style={{
        width: size,
        height: size,
        backgroundColor: 'var(--color-primary)',
        boxShadow: '0 4px 12px rgba(255,106,43,.32)',
      }}
      aria-hidden="true"
    >
      <span
        className="rounded-full"
        style={{
          width: dot,
          height: dot,
          backgroundColor: 'var(--color-yellow)',
        }}
      />
    </span>
  )
}

export function Wordmark({ size = 22 }: { size?: number }) {
  const { navigate } = useNav()
  return (
    <button
      type="button"
      onClick={() => navigate('discover')}
      className="flex items-center gap-2.5"
    >
      <Logo size={size >= 20 ? 36 : 32} />
      <span
        className="font-heading"
        style={{
          fontWeight: 800,
          fontSize: size,
          letterSpacing: '-0.6px',
          color: 'var(--color-ink)',
        }}
      >
        NoMoreWaste
      </span>
    </button>
  )
}
