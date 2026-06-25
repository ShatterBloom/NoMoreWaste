'use client'

import { ClaimSuccessScreen } from './claim-success-screen'
import { ClaimsProvider } from './claims-store'
import { CreateListingScreen } from './create-listing-screen'
import { DetailScreen } from './detail-screen'
import { DiscoverScreen } from './discover-screen'
import { DropScreen } from './drop-screen'
import { MerchantScreen } from './merchant-screen'
import { MyClaimsScreen } from './my-claims-screen'
import { NavProvider, useNav } from './navigation'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'
import { ToastProvider } from './toast'

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
      return <MyClaimsScreen />
    case 'merchant':
      return <MerchantScreen />
    case 'create':
      return <CreateListingScreen />
    default:
      return <DiscoverScreen />
  }
}

export function App() {
  return (
    <NavProvider>
      <ClaimsProvider>
        <ToastProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <ActiveScreen />
            <SiteFooter />
          </div>
        </ToastProvider>
      </ClaimsProvider>
    </NavProvider>
  )
}
