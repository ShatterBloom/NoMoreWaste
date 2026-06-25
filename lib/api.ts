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

// Simulate network latency so loading states behave like a real backend.
function delay<T>(value: T, ms = 220): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

// ----------------------------------------------------------------------------
// Discover
// ----------------------------------------------------------------------------
export async function getNearbyBoxes(): Promise<Box[]> {
  return delay(NEARBY_BOXES)
}
