'use client'

import { MapPin } from 'lucide-react'
import { Wordmark } from './brand'
import { useNav, type Screen } from './navigation'

const NAV_LINKS: Array<{ label: string; screen: Screen }> = [
  { label: 'Discover', screen: 'discover' },
  { label: 'Daily Drop', screen: 'drop' },
  { label: 'My Claims', screen: 'myclaims' },
  { label: 'For Merchants', screen: 'merchant' },
]

export function SiteHeader() {
  const { screen, navigate } = useNav()

  // Discover stays active on detail + claim screens; For Merchants on create.
  function isActive(linkScreen: Screen) {
    if (linkScreen === 'discover')
      return screen === 'discover' || screen === 'detail' || screen === 'claim'
    if (linkScreen === 'merchant')
      return screen === 'merchant' || screen === 'create'
    return screen === linkScreen
  }

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: 'rgba(255,246,238,.82)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="mx-auto flex max-w-[1240px] items-center gap-6 px-7 py-[13px]">
        <Wordmark />

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.screen)
            return (
              <button
                key={link.screen}
                type="button"
                onClick={() => navigate(link.screen)}
                className="rounded-[11px] px-[15px] py-[9px] text-[15px] font-bold transition-colors"
                style={{
                  color: active ? 'var(--color-primary)' : 'var(--color-muted)',
                  backgroundColor: active ? '#ffffff' : 'transparent',
                  boxShadow: active ? '0 1px 2px rgba(0,0,0,.05)' : 'none',
                }}
              >
                {link.label}
              </button>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span
            className="hidden items-center gap-2 rounded-full bg-white px-[15px] py-[9px] text-[14px] font-bold sm:flex"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
          >
            <MapPin size={16} style={{ color: 'var(--color-primary)' }} strokeWidth={2} />
            Melbourne CBD
          </span>
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full text-[16px] font-bold text-white"
            style={{ backgroundColor: 'var(--color-teal)' }}
            aria-label="Account"
          >
            T
          </span>
        </div>
      </div>
    </header>
  )
}
