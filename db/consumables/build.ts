import { merge } from "lodash"

import { Consumable } from "../interfaces"
import { API, downloadIcon } from '../download'

import { translateEn, convertCivilization } from "../shared/convert-text"
import { includeConsumable } from "./filter"
import { compareConsumables } from "./sort"
import { buildSearchString } from "./search"
import { convertEvent } from "./convert-event"
import { findVendors } from "../vendors"
import { findPowers } from "../powers/find"
import { findDesigns } from "../designs/find"

export async function buildConsumables(): Promise<Consumable[]> {
  console.log("Build consumables...")

  const mergedByName: { [name: string]: Consumable } = {}
  const consumables = await API.getConsumables()
  for (const consumable of Object.values(consumables)) {
    const name = await translateEn(consumable.displaynameid, consumable.name)
    const description = await translateEn(consumable.rollovertextid, "")

    // Mummy exception
    if (consumable.icon == 'Celeste\\HalloweenEvent\\Mummy\\ConMummyFighter_ua') {
      consumable.icon = 'Celeste\\HalloweenEvent\\Mummy\\Mummy64_ua'
    }
    const icon = await downloadIcon(`Art/${consumable.icon}`, "consumables")
    const civilization = convertCivilization(consumable.civmatchingtype)

    const cooldowntime = await findPowers(consumable.power, "cooldowntime")
    const activetime = await findPowers(consumable.power, "activetime")
    const radius = await findPowers(consumable.power, "radius")
    const requiredage = await findPowers(consumable.power, "requiredage")
    const placement = await findPowers(consumable.power, "placement.text")
    const cooldownstackingclass = await findPowers(consumable.power, "cooldownstackingclass")
    const createdUnits = await findPowers(consumable.power, "createdUnits")
    const descriptionPowerID = await findPowers(consumable.power, "rolloverid")
    const exactUnits = await findPowers(consumable.power, "exactUnits")
      

    if (descriptionPowerID[0] === undefined){
      var descriptionPower = description
    } 
    else {
      var descriptionPower = await translateEn(parseInt(descriptionPowerID[0]), "")
    }
    if (consumable.name === "powernuclearconsumable1" || 
        consumable.name === "powernuclearconsumable4"  || 
        consumable.name === "powernuclearconsumable9" || 
        consumable.name === "consumablecivreinforcements" || 
        consumable.name === "consumablecelticmercs_e"
      ) {
      descriptionPower = descriptionPower + exactUnits
    }
    
    const design = await findDesigns(consumable.name)

    const rarity: Consumable["rarities"][string] = {
      id: consumable.name,
      icon,
      description: descriptionPower,
      cooldowntime: parseInt(cooldowntime[0]),
      activetime: parseInt(activetime[0]),
      radius: parseInt(radius[0]),
      requiredage: parseInt(requiredage[0]) +1,
      placement: placement[0],
      cooldownstackingclass: parseInt(cooldownstackingclass[0]),
      design: design[0],
      createdUnits: createdUnits[0] || "None",
      stacksize: consumable.stacksize === 0 ? 1 : consumable.stacksize
    }

    const rarities: Consumable["rarities"] = {
      [consumable.rarity.replace("cRarity", "").toLowerCase()]: rarity,
    }


    const result: Consumable = {
      id: rarity.id,
      name,
      vendors: [],
      rarities,
      civilization,
      search: "",
      marketplace: [],
      event: convertEvent(consumable),
      power: consumable.power
    }

    if (result.id == 'consumablescouteg' || consumable.name == 'consumablescout') {
      result.civilization = 'Greek or Egyptian'
    }

    const vendorData = await findVendors(result.id);

    (vendorData || []).forEach(vendor => {
      if (consumable.rarity === "cRarityLegendary") {
        vendor.rarity = "legendary"
      }
      if (consumable.rarity === "cRarityEpic") {
        vendor.rarity = "epic"
      }
      if (consumable.rarity === "cRarityRare") {
        vendor.rarity = "rare"
      }
      if (consumable.rarity === "cRarityUncommon") {
        vendor.rarity = "uncommon"
      }
      if (consumable.rarity === "cRarityCommon") {
        vendor.rarity = "common"
      }
    })

    

    const merged = merge(mergedByName[name], result)

    for (let i=0; i<vendorData.length;i++) {
      merged.vendors.push(vendorData[i])
    }

    merged.search = await buildSearchString(merged,consumable)

    merged.marketplace = Object.keys(merged.rarities).reduce((queries, key) => {
      queries.push({
        id: merged.rarities[key].id,
        rarity: key,
      })
      return queries
    }, [] as typeof result.marketplace)

    mergedByName[name] = merged
  }

  return Object.values(mergedByName)
    .filter(includeConsumable)
    .sort(compareConsumables)
}
