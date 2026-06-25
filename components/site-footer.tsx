'use client'

import { Logo } from './brand'
import { useNav, type Screen } from './navigation'

const FOOTER_LINKS: Array<{ label: string; screen: Screen }> = [
  { label: 'Discover', screen: 'discover' },
  { label: 'Daily Drop', screen: 'drop' },
  { label: 'For Merchants', screen: 'merchant' },
  { label: 'About', screen: 'discover' },
]

export function SiteFooter() {
  const { navigate } = useNav()

  return (
    <footer
      className="mt-auto bg-white"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6 px-7 py-8">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <div>
            <div
              className="font-heading"
              style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.4px' }}
            >
              NoMoreWaste
            </div>
            <div className="text-[12px]" style={{ color: 'var(--color-muted)' }}>
              Rescue food. Save money. Waste nothing.
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-2 text-[14px] font-bold" style={{ color: 'var(--color-muted)' }}>
          {FOOTER_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">·</span>}
              <button type="button" onClick={() => navigate(link.screen)} className="hover:underline">
                {link.label}
              </button>
            </span>
          ))}
        </nav>

        <div className="text-[13px]" style={{ color: 'var(--color-muted)' }}>
          Melbourne, Australia
        </div>
      </div>
    </footer>
  )
}
