// ============================================================================
// NoMoreWaste data layer
// ----------------------------------------------------------------------------
// EVERY data operation lives here as an exported async function returning mock
// data. UI components import and call these functions — they never inline mock
// data. To wire a real backend later, swap each function body to fetch('/api/..')
// with ZERO changes required in the UI components.
// ============================================================================

export type Cuisine =
  | 'Bakery'
  | 'Café'
  | 'Italian'
  | 'Vietnamese'
  | 'Thai'
  | 'Sushi'
  | 'Greek'
  | 'Indian'
  | 'Vegan'
  | 'Dumplings'
  | 'Pizza'
  | 'Dessert'

export interface Box {
  id: string
  venue: string
  dish: string
  cuisine: Cuisine
  discount: number // percentage off
  quantityLeft: number
  distance: string // e.g. "0.4 km"
  pickupWindow: string // e.g. "5pm to 7pm"
  salePrice: number
  originalPrice: number
}

// A flash-deal item that unlocks all at once during the Daily Drop.
export interface DropItem {
  id: string
  venue: string
  dish: string
  cuisine: Cuisine
  salePrice: number
  originalPrice: number
  quantity: number // current stock
  total: number // initial stock, used for the "X of Y left" label
}

export type ClaimStatus = 'Reserved' | 'Collected' | 'Expired'

// A reservation made by a user, surfaced on Claim Success and My Claims.
export interface Claim {
  id: string
  item: string
  venue: string
  cuisine: Cuisine
  window: string
  type: 'Daily Drop' | 'Mystery Box'
  code: string
  price: number
  claimedAt: number
  status: ClaimStatus
}

// A merchant's published listing, shown on the Merchant Dashboard.
export interface Listing {
  id: string
  item: string
  type: 'Daily Drop' | 'Surplus Box'
  cuisine: Cuisine
  left: number
  total: number
  claims: number
  price: number
}

// A claim as seen from the merchant side (who reserved what).
export interface MerchantClaim {
  id: string
  code: string
  item: string
  who: string
  status: ClaimStatus
}

// Payload sent from the Create Listing form.
export interface ListingPayload {
  type: 'Daily Drop' | 'Surplus Box'
  item: string
  description: string
  originalPrice: number
  salePrice: number
  quantity: number
}

// Per cuisine tile colors used for the striped placeholder image tiles.
export const CUISINE_COLORS: Record<Cuisine, string> = {
  Bakery: '#F2A03D',
  Café: '#C58552',
  Italian: '#E2533F',
  Vietnamese: '#54AE64',
  Thai: '#E5872B',
  Sushi: '#E96D6D',
  Greek: '#4C9FCF',
  Indian: '#DD9329',
  Vegan: '#67BA55',
  Dumplings: '#E69E36',
  Pizza: '#D9573B',
  Dessert: '#ED7EAA',
}

export const CATEGORIES: Array<'All' | Cuisine> = [
  'All',
  'Bakery',
  'Café',
  'Italian',
  'Vietnamese',
  'Thai',
  'Sushi',
  'Greek',
  'Indian',
  'Vegan',
  'Dumplings',
  'Pizza',
  'Dessert',
]

const NEARBY_BOXES: Box[] = [
  {
    id: 'box-1',
    venue: 'Crumb & Co',
    dish: 'Mixed Pastry Box',
    cuisine: 'Bakery',
    discount: 67,
    quantityLeft: 3,
    distance: '0.4 km',
    pickupWindow: '5pm to 7pm',
    salePrice: 5,
    originalPrice: 15,
  },
  {
    id: 'box-2',
    venue: 'Mornings Espresso',
    dish: 'Café Lunch Bag',
    cuisine: 'Café',
    discount: 55,
    quantityLeft: 5,
    distance: '0.7 km',
    pickupWindow: '2pm to 4pm',
    salePrice: 6.5,
    originalPrice: 14,
  },
  {
    id: 'box-3',
    venue: 'Trattoria Bella',
    dish: 'Pasta Surplus Box',
    cuisine: 'Italian',
    discount: 60,
    quantityLeft: 2,
    distance: '1.1 km',
    pickupWindow: '8pm to 9pm',
    salePrice: 8,
    originalPrice: 20,
  },
  {
    id: 'box-4',
    venue: 'Pho Saigon',
    dish: 'Banh Mi Bundle',
    cuisine: 'Vietnamese',
    discount: 50,
    quantityLeft: 6,
    distance: '0.9 km',
    pickupWindow: '4pm to 6pm',
    salePrice: 7,
    originalPrice: 14,
  },
  {
    id: 'box-5',
    venue: 'Bangkok Lane',
    dish: 'Thai Curry Box',
    cuisine: 'Thai',
    discount: 58,
    quantityLeft: 4,
    distance: '1.4 km',
    pickupWindow: '7pm to 9pm',
    salePrice: 9,
    originalPrice: 21,
  },
  {
    id: 'box-6',
    venue: 'Sakura Sushi',
    dish: 'Sushi Rescue Tray',
    cuisine: 'Sushi',
    discount: 65,
    quantityLeft: 2,
    distance: '0.6 km',
    pickupWindow: '6pm to 8pm',
    salePrice: 10,
    originalPrice: 28,
  },
  {
    id: 'box-7',
    venue: 'Olive & Vine',
    dish: 'Greek Mezze Box',
    cuisine: 'Greek',
    discount: 52,
    quantityLeft: 3,
    distance: '1.8 km',
    pickupWindow: '5pm to 7pm',
    salePrice: 11,
    originalPrice: 23,
  },
  {
    id: 'box-8',
    venue: 'Spice Route',
    dish: 'Curry Feast Bag',
    cuisine: 'Indian',
    discount: 63,
    quantityLeft: 5,
    distance: '2.1 km',
    pickupWindow: '8pm to 10pm',
    salePrice: 8.5,
    originalPrice: 23,
  },
  {
    id: 'box-9',
    venue: 'Green Earth Kitchen',
    dish: 'Vegan Power Box',
    cuisine: 'Vegan',
    discount: 48,
    quantityLeft: 4,
    distance: '0.5 km',
    pickupWindow: '3pm to 5pm',
    salePrice: 7.5,
    originalPrice: 15,
  },
  {
    id: 'box-10',
    venue: 'Lucky Dumpling House',
    dish: 'Dumpling Dozen Box',
    cuisine: 'Dumplings',
    discount: 57,
    quantityLeft: 6,
    distance: '1.2 km',
    pickupWindow: '7pm to 9pm',
    salePrice: 6,
    originalPrice: 14,
  },
]

// The four items that unlock together at 5pm. Stock mutates as users claim.
const DROP_ITEMS: DropItem[] = [
  {
    id: 'drop-1',
    venue: 'Dawn Bakehouse',
    dish: 'Almond Croissant',
    cuisine: 'Bakery',
    salePrice: 1.99,
    originalPrice: 6.5,
    quantity: 4,
    total: 4,
  },
  {
    id: 'drop-2',
    venue: 'Lune & Honey',
    dish: 'Flat White & Muffin',
    cuisine: 'Café',
    salePrice: 2.0,
    originalPrice: 9.0,
    quantity: 3,
    total: 3,
  },
  {
    id: 'drop-3',
    venue: 'Pearl Dumpling',
    dish: 'Six Pork Dumplings',
    cuisine: 'Dumplings',
    salePrice: 1.99,
    originalPrice: 9.8,
    quantity: 5,
    total: 5,
  },
  {
    id: 'drop-4',
    venue: 'Sugar & Sea',
    dish: 'Custard Tart',
    cuisine: 'Dessert',
    salePrice: 1.5,
    originalPrice: 5.5,
    quantity: 6,
    total: 6,
  },
]

// Simulate network latency so loading states behave like a real backend.
function delay<T>(value: T, ms = 220): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

// Pickup code = first 3 letters of the venue (uppercased) + a space + 4 digits.
function generatePickupCode(venue: string): string {
  const letters = venue.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase()
  const digits = Math.floor(1000 + Math.random() * 9000)
  return `${letters} ${digits}`
}

// ----------------------------------------------------------------------------
// Discover
// ----------------------------------------------------------------------------
export async function getNearbyBoxes(): Promise<Box[]> {
  return delay(NEARBY_BOXES)
}

export async function getBoxById(id: string): Promise<Box | undefined> {
  return delay(NEARBY_BOXES.find((b) => b.id === id))
}

// ----------------------------------------------------------------------------
// Daily Drop
// ----------------------------------------------------------------------------
export async function getDailyDrops(): Promise<DropItem[]> {
  // return copies so the UI holds its own snapshot it can re-fetch
  return delay(DROP_ITEMS.map((d) => ({ ...d })))
}

// Claim a Daily Drop item: decrement its stock, mint a code, return the claim
// plus the refreshed item list so the UI can reflect the new stock levels.
export async function claimItem(
  id: string,
  _userId: string,
): Promise<{ claim: Claim; items: DropItem[] }> {
  const item = DROP_ITEMS.find((d) => d.id === id)
  if (!item || item.quantity <= 0) {
    throw new Error('Item is no longer available')
  }
  item.quantity -= 1
  const claim: Claim = {
    id: `claim-${Date.now()}`,
    item: item.dish,
    venue: item.venue,
    cuisine: item.cuisine,
    window: 'Today, 5:00pm to 5:30pm',
    type: 'Daily Drop',
    code: generatePickupCode(item.venue),
    price: item.salePrice,
    claimedAt: Date.now(),
    status: 'Reserved',
  }
  return delay({ claim, items: DROP_ITEMS.map((d) => ({ ...d })) })
}

// True once every drop item is exhausted.
export async function isDropSoldOut(): Promise<boolean> {
  return delay(DROP_ITEMS.every((d) => d.quantity <= 0))
}

// ----------------------------------------------------------------------------
// Box claims
// ----------------------------------------------------------------------------
export async function claimBox(id: string, _userId: string): Promise<Claim> {
  const box = NEARBY_BOXES.find((b) => b.id === id)
  if (!box || box.quantityLeft <= 0) {
    throw new Error('Box is no longer available')
  }
  box.quantityLeft -= 1
  const claim: Claim = {
    id: `claim-${Date.now()}`,
    item: box.dish,
    venue: box.venue,
    cuisine: box.cuisine,
    window: box.pickupWindow,
    type: 'Mystery Box',
    code: generatePickupCode(box.venue),
    price: box.salePrice,
    claimedAt: Date.now(),
    status: 'Reserved',
  }
  return delay(claim)
}

// ----------------------------------------------------------------------------
// My Claims (consumer side)
// ----------------------------------------------------------------------------
const SEEDED_CLAIMS: Claim[] = [
  {
    id: 'seed-claim-1',
    item: 'Pasta Rescue Box',
    venue: 'Trevi Cucina',
    cuisine: 'Italian',
    window: 'Today, 6:00pm to 8:00pm',
    type: 'Mystery Box',
    code: 'TRV 8472',
    price: 7.5,
    claimedAt: Date.now() - 1000 * 60 * 30,
    status: 'Reserved',
  },
  {
    id: 'seed-claim-2',
    item: 'Almond Croissant',
    venue: 'Dawn Bakehouse',
    cuisine: 'Bakery',
    window: 'Today, 5:00pm to 5:30pm',
    type: 'Daily Drop',
    code: 'DWN 1190',
    price: 1.99,
    claimedAt: Date.now() - 1000 * 60 * 60,
    status: 'Reserved',
  },
  {
    id: 'seed-claim-3',
    item: 'Pho Surplus Bag',
    venue: 'Mekong Street',
    cuisine: 'Vietnamese',
    window: 'Yesterday, 7:00pm to 9:00pm',
    type: 'Mystery Box',
    code: 'MEK 3318',
    price: 8,
    claimedAt: Date.now() - 1000 * 60 * 60 * 26,
    status: 'Collected',
  },
  {
    id: 'seed-claim-4',
    item: 'Vegan Power Box',
    venue: 'Green Fork',
    cuisine: 'Vegan',
    window: 'Mon, 3:00pm to 5:00pm',
    type: 'Mystery Box',
    code: 'GRE 7045',
    price: 7.5,
    claimedAt: Date.now() - 1000 * 60 * 60 * 50,
    status: 'Collected',
  },
  {
    id: 'seed-claim-5',
    item: 'Sushi Rescue Tray',
    venue: 'Sakura Tokyo',
    cuisine: 'Sushi',
    window: 'Sun, 6:00pm to 8:00pm',
    type: 'Daily Drop',
    code: 'SAK 2290',
    price: 10,
    claimedAt: Date.now() - 1000 * 60 * 60 * 74,
    status: 'Expired',
  },
]

export async function getMyClaims(_userId: string): Promise<Claim[]> {
  return delay(SEEDED_CLAIMS.map((c) => ({ ...c })))
}

// ----------------------------------------------------------------------------
// Merchant dashboard
// ----------------------------------------------------------------------------
const MERCHANT_LISTINGS: Listing[] = [
  {
    id: 'listing-1',
    item: 'Almond Croissant',
    type: 'Daily Drop',
    cuisine: 'Bakery',
    left: 4,
    total: 8,
    claims: 4,
    price: 1.99,
  },
  {
    id: 'listing-2',
    item: 'Mystery Pastry Box',
    type: 'Surplus Box',
    cuisine: 'Bakery',
    left: 3,
    total: 6,
    claims: 3,
    price: 5.99,
  },
  {
    id: 'listing-3',
    item: 'Sourdough Loaf Bag',
    type: 'Surplus Box',
    cuisine: 'Bakery',
    left: 0,
    total: 5,
    claims: 5,
    price: 4.5,
  },
]

const MERCHANT_CLAIMS: MerchantClaim[] = [
  { id: 'mc-1', code: 'DWN 1190', item: 'Almond Croissant', who: 'Ava M.', status: 'Reserved' },
  { id: 'mc-2', code: 'DWN 7732', item: 'Mystery Pastry Box', who: 'Liam K.', status: 'Reserved' },
  { id: 'mc-3', code: 'DWN 5510', item: 'Sourdough Loaf Bag', who: 'Noah P.', status: 'Collected' },
  { id: 'mc-4', code: 'DWN 4408', item: 'Almond Croissant', who: 'Mia R.', status: 'Collected' },
  { id: 'mc-5', code: 'DWN 1276', item: 'Sourdough Loaf Bag', who: 'Ethan W.', status: 'Expired' },
]

export interface MerchantImpact {
  mealsRescued: number
  revenueRecovered: number
  newCustomers: number
  wasteSavedKg: number
}

export async function getMerchantImpact(_venueId: string): Promise<MerchantImpact> {
  return delay({
    mealsRescued: 142,
    revenueRecovered: 880,
    newCustomers: 64,
    wasteSavedKg: 38,
  })
}

export async function getMerchantListings(_venueId: string): Promise<Listing[]> {
  return delay(MERCHANT_LISTINGS.map((l) => ({ ...l })))
}

export async function getMerchantClaims(_venueId: string): Promise<MerchantClaim[]> {
  return delay(MERCHANT_CLAIMS.map((c) => ({ ...c })))
}

// Create a new listing: prepend it to the merchant's active listings.
export async function createListing(payload: ListingPayload): Promise<Listing> {
  const listing: Listing = {
    id: `listing-${Date.now()}`,
    item: payload.item.trim() || 'Untitled listing',
    type: payload.type,
    cuisine: 'Bakery',
    left: payload.quantity,
    total: payload.quantity,
    claims: 0,
    price: payload.salePrice,
  }
  MERCHANT_LISTINGS.unshift(listing)
  return delay(listing)
}
