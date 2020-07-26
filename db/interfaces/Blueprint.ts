import { MarketplaceQuery } from "./MarketplaceQuery"
import { Vendor } from "./Vendor"

export interface Blueprint {
  id: string
  name: string
  description: string | undefined
  icon: string
  rarity: string
  materials: Array<{ id: string, quantity: number }> | undefined
  vendors: Vendor[] | undefined
  search: string
  marketplace: MarketplaceQuery[],
  event?: {
    name: "halloween" | "winter" | "summer"
    year: 0 | 2018 | 2019 | 2020,
  } | undefined
  lootTable: string | undefined
}
