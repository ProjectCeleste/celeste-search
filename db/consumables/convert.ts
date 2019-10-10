import { downloadIcon } from "../download"
import { Consumable } from "../interfaces"
import { translateEn } from "../shared/convert-text"

import { buildSearchString } from "./search"

export async function convertConsumable(consumable: any): Promise<Consumable> {
  const name = await translateEn(consumable.displaynameid, consumable.name)
  const description = await translateEn(consumable.rollovertextid, "")

  // Mummy exception
  if(consumable.icon == 'Celeste\\HalloweenEvent\\Mummy\\ConMummyFighter_ua') {
    consumable.icon = 'Celeste\\HalloweenEvent\\Mummy\\Mummy64_ua'
  }
  const icon = await downloadIcon(`Art/${consumable.icon}`, "consumables")
  const rarity = consumable.rarity.replace("cRarity", "").toLowerCase()

  const result: Consumable = {
    id: consumable.name,
    name,
    description,
    icon,
    rarity,
    vendors: undefined,
    search: "",
    marketplace: [],
  }

  result.search = await buildSearchString(result)
  result.marketplace.push({ id: result.id })

  return result
}
