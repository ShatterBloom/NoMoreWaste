import type { ClaimStatus } from '@/lib/api'

const STYLES: Record<ClaimStatus, { bg: string; color: string }> = {
  Reserved: { bg: 'var(--color-orange-bg)', color: 'var(--color-primary)' },
  Collected: { bg: 'var(--color-success-bg)', color: 'var(--color-success)' },
  Expired: { bg: 'var(--color-expired-bg)', color: 'var(--color-expired)' },
}

export function StatusPill({ status }: { status: ClaimStatus }) {
  const s = STYLES[status]
  return (
    <span
      className="inline-block whitespace-nowrap text-[12px]"
      style={{
        backgroundColor: s.bg,
        color: s.color,
        borderRadius: 999,
        padding: '5px 12px',
        fontWeight: 800,
      }}
    >
      {status}
    </span>
  )
}
