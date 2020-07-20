import { Blueprint } from "../interfaces"
import { SearchBuilder } from "../shared/search-helpers"
import { searchByMaterial, searchByVendor } from "../shared/search-tags"

export async function buildSearchString(blueprint: Blueprint): Promise<string> {
  const builder = new SearchBuilder()

  builder.add("blueprints")

  builder.addStrict(blueprint.id)
  builder.add(blueprint.name)
  builder.add(blueprint.description || "")
  builder.add(blueprint.rarity)

  if (blueprint.lootTable) {
    builder.add(blueprint.lootTable)
    if (blueprint.lootTable == "skirmish hall") {
      builder.add("Skirmish-Exclusive")
    } else {
      builder.add(blueprint.lootTable + "-Exclusive")
    }
  }

  await searchByMaterial(builder, blueprint.materials)
  await searchByVendor(builder, blueprint.vendors)

  return builder.build()
}
