import { Consumable } from "../interfaces"
import { SearchBuilder } from "../shared/search-helpers"

export async function buildSearchString(consumable: Consumable): Promise<string> {
  const builder = new SearchBuilder()

  builder.add("consumables")

  builder.addStrict(consumable.id)
  builder.add(consumable.name)
  builder.add(consumable.rarity)

  return builder.build()
}
