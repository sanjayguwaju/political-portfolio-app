import type { LucideProps } from 'lucide-react'
import type { ExoticComponent } from 'react'

import {
  Blocks,
  ChartArea,
  Image,
  Palette,
  Settings,
  ShoppingCart,
  Tag,
  UserRound,
} from 'lucide-react'

const adminNavIconMap = {
  analytics: ChartArea,
  content: Image,
  customers: UserRound,
  design: Palette,
  orders: ShoppingCart,
  plugins: Blocks,
  products: Tag,
  settings: Settings,
}

type AdminNavIconSlug = keyof typeof adminNavIconMap

export const getAdminNavIcon = (
  slug: AdminNavIconSlug,
): ExoticComponent<LucideProps> | undefined => {
  return adminNavIconMap[slug]
}
