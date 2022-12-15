import { Design as ApiDesign } from "../../api-types"

import { Design } from "../interfaces"
import { SearchBuilder } from "../shared/search-helpers"
import { searchByMaterial, searchByVendor } from "../shared/search-tags"

export async function buildSearchString(design: Design, apiDesign: ApiDesign): Promise<string> {
  const builder = new SearchBuilder()

  builder.add("designs")
  builder.add("Recipe: ")
  
  builder.add(design.id)
  builder.add(design.description)
  builder.add(design.rarity)
  builder.add(design.school)
  builder.addStrict(design.outputId)
  builder.add(design.outputName)

  if (design.lootTable) {
    builder.add(design.lootTable)
    builder.add(design.lootTable + "-Exclusive")
  }

  await searchByMaterial(builder, design.materials)
  await searchByVendor(builder, design.vendors)

  return builder.build()
}
