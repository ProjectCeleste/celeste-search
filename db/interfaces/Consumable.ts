
import { MarketplaceQuery } from "./MarketplaceQuery"
import { Vendor } from "./Vendor"

export interface ConsumableRarity {
  id: string
  description: string
  icon: string,
  cooldowntime: number | undefined
  activetime: number | undefined
  radius: number | undefined
  requiredage: number
  placement: string | undefined
  cooldownstackingclass: number | undefined
  design: string | undefined
  createdUnits: string
  stacksize: number
}

export interface Consumable {
  id: string
  name: string
  rarities: {
    [index: string]: ConsumableRarity,
  }
  civilization: string | undefined
  vendors: Vendor[] 
  search: string
  marketplace: MarketplaceQuery[],
  event?: {
    name: "halloween" | "winter" | "summer"
    year: 0 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2025,
  } | undefined
  power: string | undefined
}
