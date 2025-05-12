import { Trait } from "../../api-types"

import { downloadIcon } from "../download"
import { Item } from "../interfaces"
import { translateEn } from "../shared/convert-text"
import { findVendors } from "../vendors"

import { convertEffects } from "./convert-effects"
import { convertEvent } from "./convert-event"
import { findAndConvertRecipe } from "./convert-recipe"
import { convertLootTable } from "./convert-loot-table"
import { buildSearchString } from "./search"
import {
  getQuestName,
  isProStartingGear,
  isReforgeable,
  isStartingGear,
  isLevel40StartingGear,
  isOtherEffectsRangeFalse,
} from "./source"

/**
 * Converts items from their API format to the format
 * used by the search app.
 */
export async function convertItem(trait: Trait): Promise<Item> {
  const name = await translateEn(trait.displaynameid, trait.name)
  const type = await translateEn(trait.rollovertextid, "")
  const icon = await downloadIcon(`Art/${trait.icon}`, "items")
    

  var visualfactor_text = ''

  if (trait.traittype === "VanityHelm" || trait.traittype === "VanityShield" || trait.traittype === "VanityWeapon")  {
     visualfactor_text =   trait.visualfactor[0].type.concat(' ').concat(trait.visualfactor[0].factor.toString())
  }
    
  


  const item: Item = {
    id: trait.name,
    name,
    type,
    levels: trait.itemlevels.map(l => l - 3).filter(l => l > 0),
    icon,
    rarity: trait.rarity,
    effects: convertEffects(trait),
    effectsRange: undefined,
    recipe: undefined,
    vendors: undefined,
    marketplace: [],
    quest: getQuestName(trait),
    event: convertEvent(trait),
    lootTable: convertLootTable(trait),
    starting: [
      isProStartingGear(trait) && "persian",
      isProStartingGear(trait) && "babylonian",
      isProStartingGear(trait) && "norse",
      isProStartingGear(trait) && "indian",
      
      isLevel40StartingGear(trait) && "greek",
      isLevel40StartingGear(trait) && "egyptian",
      isLevel40StartingGear(trait) && "celtic",
      isLevel40StartingGear(trait) && "persian",
      isLevel40StartingGear(trait) && "roman",
      isLevel40StartingGear(trait) && "babylonian",
      isLevel40StartingGear(trait) && "norse",
      isLevel40StartingGear(trait) && "indian",
    ].filter(Boolean) as string[],
    visualfactor: visualfactor_text,
    search: "",
  }

  if (!item.levels.length) {
    if (trait.traittype.toLowerCase().startsWith("vanity")) {
      item.levels = [1]
    }
    if (trait.rarity.toLowerCase().startsWith("legendary")) {
      item.levels = [40]
      item.name = item.name.concat(' - Legacy Item') 
      item.type = item.type.concat(' - Legacy Item') 
    }
    /*if (isStartingGear(trait)) {
      item.levels = [20]
    }*/
  }

  if (!item.starting!.length) {
    delete item.starting
  }

  item.recipe = await findAndConvertRecipe(trait)
  item.vendors = await findVendors(item.id)

  if (trait.rarity === "legendary") {
    //addToLegendaryRotation(item, trait)
    if (item.effects) {
      item.effectsRange = isReforgeable(trait) || undefined
    }
  } else if (isProStartingGear(trait)) {
    if (item.effects) {
      item.effectsRange = !isProStartingGear(trait) || undefined
    }
  } else if (isLevel40StartingGear(trait)) {
    if (item.effects) {
      item.effectsRange = !isLevel40StartingGear(trait) || undefined
    }
  } else if (isOtherEffectsRangeFalse(trait)) {
    if (item.effects) {
      item.effectsRange = !isOtherEffectsRangeFalse(trait) || undefined
    }
  } else {
    if (item.effects) {
      item.effectsRange = !item.vendors
        || !item.vendors.length
        || item.levels.length > 1
        || undefined
    }
  }

  item.search = await buildSearchString(item, trait)
  item.marketplace = item.levels.map(level => ({ id: item.id, level }))
  return item
}
