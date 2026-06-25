'use client'

import { Check } from 'lucide-react'
import { useClaims } from './claims-store'
import { useNav } from './navigation'

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex-1"
      style={{ border: '1px solid var(--color-border)', borderRadius: 14, padding: '12px 14px' }}
    >
      <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>
        {label}
      </div>
      <div className="mt-1 text-[15px] font-extrabold" style={{ color: 'var(--color-ink)' }}>
        {value}
      </div>
    </div>
  )
}

export function ClaimSuccessScreen() {
  const { navigate } = useNav()
  const { latest } = useClaims()

  if (!latest) {
    return (
      <main className="mx-auto w-full max-w-[560px] px-7 py-16 text-center">
        <h1 className="font-heading text-[28px]" style={{ fontWeight: 800 }}>
          No claim yet
        </h1>
        <p className="mt-2 text-[15px]" style={{ color: 'var(--color-muted)' }}>
          Browse the surplus boxes and claim one to see it here.
        </p>
        <button
          type="button"
          onClick={() => navigate('discover')}
          className="mt-5 rounded-full px-5 py-2.5 text-[14px] font-bold text-white"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          Start browsing
        </button>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-[560px]" style={{ padding: '48px 28px' }}>
      <div
        className="bg-white text-center"
        style={{ borderRadius: 28, padding: '42px 38px', boxShadow: '0 14px 40px rgba(42,33,27,.1)' }}
      >
        <div
          className="mx-auto flex items-center justify-center rounded-full"
          style={{ width: 74, height: 74, backgroundColor: 'var(--color-teal)' }}
        >
          <Check size={38} strokeWidth={3} color="#fff" />
        </div>

        <h1
          className="font-heading mt-5"
          style={{ fontWeight: 800, fontSize: 32, letterSpacing: '-0.6px' }}
        >
          You&apos;re all set
        </h1>
        <p className="mt-2 text-[16px]" style={{ color: 'var(--color-muted)' }}>
          {latest.item} from {latest.venue} is reserved for you.
        </p>

        {/* Pickup code */}
        <div
          className="mt-6"
          style={{
            border: '2px dashed #EFE2D4',
            borderRadius: 18,
            backgroundColor: 'var(--color-background)',
            padding: '20px 16px',
          }}
        >
          <div className="text-[12px] uppercase" style={{ letterSpacing: '1px', color: 'var(--color-muted)' }}>
            Your pickup code
          </div>
          <div
            className="font-mono mt-2"
            style={{ fontWeight: 700, fontSize: 42, letterSpacing: '4px', color: 'var(--color-ink)' }}
          >
            {latest.code}
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <InfoChip label="Pickup window" value={latest.window} />
          <InfoChip label="Type" value={latest.type} />
        </div>

        <p className="mt-5 text-[14px] leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          Show this code at the venue within the pickup window. Payment happens in
          person.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate('myclaims')}
            className="flex-1 rounded-[14px] py-3.5 text-[15px] font-bold text-white"
            style={{ backgroundColor: 'var(--color-ink)' }}
          >
            View my claims
          </button>
          <button
            type="button"
            onClick={() => navigate('discover')}
            className="flex-1 rounded-[14px] py-3.5 text-[15px] font-bold"
            style={{
              backgroundColor: '#fff',
              border: '1px solid var(--color-border)',
              color: 'var(--color-ink)',
            }}
          >
            Keep browsing
          </button>
        </div>
      </div>
    </main>
  )
}
