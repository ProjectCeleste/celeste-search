import { Consumable } from "../interfaces"
import { API } from '../download'

import { convertConsumable } from "./convert"
import { includeConsumable } from "./filter"
import { compareConsumables } from "./sort"

export async function buildConsumables(): Promise<Consumable[]> {
  console.log("Build consumables...")

  const consumables = await API.getConsumables()
  const conversions = Object.values(consumables).map(convertConsumable)
  const results = await Promise.all(conversions)

  return results
    .filter(includeConsumable)
    .sort(compareConsumables)
}
