
import { Vendor } from "./Vendor"

export interface Material {
  id: string
  name: string
  description?: string
  icon: string
  rarity: string
  event?: {
    name: "halloween" | "winter" | "summer"
    year: 0 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2025,
  } | undefined
  lootTable?: string
  quest?: { 
      Region: string
      Quest: string
      Quest_Giver: string
      Quest_Starter: string
  } | undefined
  workshop?: string
  search?: string
  vendors?: Vendor[] | undefined
}

export interface Materials {
  [key: string]: Material
}
