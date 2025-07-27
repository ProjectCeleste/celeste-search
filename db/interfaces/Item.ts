import { ItemEffect } from "./ItemEffect"
import { MarketplaceQuery } from "./MarketplaceQuery"
import { Recipe } from "./Recipe"
import { Vendor } from "./Vendor"

export interface Item {
  id: string
  name: string
  type: string
  levels: number[]
  icon: string
  rarity: string
  effects: ItemEffect[] | undefined
  effectsRange: boolean | undefined
  recipe: Recipe | undefined
  vendors: Vendor[] | undefined
  quest?: { 
      Region: string
      Quest: string
      Quest_Giver: string
      Quest_Starter: string
  } | undefined
  event: {
    name: "halloween" | "winter" | "summer"
    year: 0 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2025,
  } | undefined
  starting: string[] | undefined
  visualfactor: string,
  search: string
  marketplace: MarketplaceQuery[],
  lootTable: string | undefined
}
