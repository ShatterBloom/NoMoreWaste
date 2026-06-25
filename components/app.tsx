'use client'

import { ClaimSuccessScreen } from './claim-success-screen'
import { ClaimsProvider } from './claims-store'
import { DetailScreen } from './detail-screen'
import { DiscoverScreen } from './discover-screen'
import { DropScreen } from './drop-screen'
import { NavProvider, useNav } from './navigation'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

function ComingSoon({ title }: { title: string }) {
  return (
    <main className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col items-center justify-center px-7 py-24 text-center">
      <h2 className="font-heading text-[30px]" style={{ fontWeight: 800, letterSpacing: '-0.8px' }}>
        {title}
      </h2>
      <p className="mt-2 text-[15px]" style={{ color: 'var(--color-muted)' }}>
        This screen is coming in a later step.
      </p>
    </main>
  )
}

function ActiveScreen() {
  const { screen } = useNav()
  switch (screen) {
    case 'discover':
      return <DiscoverScreen />
    case 'drop':
      return <DropScreen />
    case 'detail':
      return <DetailScreen />
    case 'claim':
      return <ClaimSuccessScreen />
    case 'myclaims':
      return <ComingSoon title="My Claims" />
    case 'merchant':
      return <ComingSoon title="For Merchants" />
    case 'create':
      return <ComingSoon title="Create a listing" />
    default:
      return <DiscoverScreen />
  }
}

export function App() {
  return (
    <NavProvider>
      <ClaimsProvider>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <ActiveScreen />
          <SiteFooter />
        </div>
      </ClaimsProvider>
    </NavProvider>
  )
}
