import { Trait } from "../../api-types"

import { quests } from "./quests"

import { API } from "../download"

const cyprusLegendaries = [
  "arrowoh_l001",
  "bow1h_l001",
  "staff2h_l002",
  "sword1h_l001",
  "shield1h_l001",
  "armorlgt_l001",
  "spear2h_l002_sr",
  "armormed_l002",
  "gear_l001",
  "armorplt_l001",
]

const allianceCouncilOfImhotep = [
  "armorbldg_lc01",
  "fishingnet1h_lc01",
  "gear_prst_lc01",
  "sword1h_lc02",
  "shield1h_lc01",
]

const allianceDelianLeague = [
  "tool1h_lc01",
  "gear_bldg_lc01",
  "armormed_lc01",
  "gear_vill_lc01",
  "gear_siege_lc01",
]

const allianceLegionOfCarthage = [
  "armorplt_lc01",
  "arrowoh_lc01",
  "gear_lc01",
  "gear_prst_lc02",
  "firethrower2h_lc01",
]

const rhakotis = [
  "bow1h_bom",
  "armorclth_rot",
  "sword1h_sck",
  "ballista2h_ssa",
]

const rome = [
  "armormed_aoa",
  "arrowoh_aog",
  "armorlgt_goa",
  "spear1h_lsoa",
  "bellybow1h_stb",
  "ramhead2h_srh",
  "shield1h_soa",
  "staff2h_soth",
  "armorclth_tor",
  "gear_trh",
]

const questRewards = [
  "spears2h_als",
  "bow1h_uasb",
  "arrowoh_ssa",
  "bow1h_ffb",
  "gear_l004",
  "gear_l005",
  "gear_l006",
  "gear_bldg_l004",
  "armorlgt_l003",
  "armorbldg_l004",
  "merchant2h_l002",
  "tool1h_l003",
  "gear_vill_l003",
]

const eventHalloween2018 = [
  "sword1h_r005_leg",
]

const eventHalloween2019 = [
  "spear1h_halloween2019",
  "spear2h_halloween2019",
  "gear_vill_halloween2019",
]

const eventHalloween2020 = [
  "gear_prst_halloween2020",
  "axe2h_halloween2020",
]

const eventHalloween2021 = [
  "bows1h_halloween2021",
]

const eventWinter = [
  "arrows_iceking_leg",
  "axe2h_iceking_leg",
  "staff2h_iceking_leg",
  "sling2h_iceking_leg",
  "gear_iceking_leg",
  "armorlgt_iceking_leg",
]

const eventWinter2018 = [
  "arrows_iceking_leg",
  "axe2h_iceking_leg",
  "staff2h_iceking_leg",
  "sling2h_iceking_leg",
]

const eventWinter2019 = [
  "gear_iceking_leg",
  "armorlgt_iceking_leg",
]

const eventSummer2019 = [
  "se2019_gear_bldg",
  "se2019_armormed",
  "se2019_shield1h",
  "se2019_gear_prst",
  "se2019_spear1h",
  "se2019_scepter2h",
]
/*
const persianStartingGear = [
  "armorbldg_u201", "armorclth_r201", "armorlgt_r201", "armormed_r201",
  "armorplt_u201", "arrowoh_u201_vr", "ballista2h_u201_vr", "bow1h_u201",
  "fishingnet1h_u201", "javalin2h_u201", "ramhead2h_u201", "scepter2h_u201",
  "shield1h_u201", "spear1h_u201", "spear2h_u201", "sword1h_u201", "tool1h_u201",
]

const babylonianStartingGear = [
  "armorbldg_u201", "armorclth_r201", "armorlgt_r201", "armormed_r201",
  "armorplt_u201", "arrowoh_u201_vr", "ballista2h_u201_vr", "bow1h_u201",
  "fishingnet1h_u201", "javalin2h_u201", "ramhead2h_u201", "scepter2h_u201",
  "shield1h_u201", "sling2h_u201", "spear1h_u201", "spear2h_u201",
  "sword1h_u201", "tool1h_u201",
]

const norseStartingGear = [
  "armorbldg_u201", "armorclth_r201", "armorlgt_r201", "armormed_r201",
  "armorplt_u201", "arrowoh_u201_vr", "axe2h_u201", "ballista2h_u201_vr",
  "bow1h_u201", "firethrower2h_u201", "fishingnet1h_u201", "javalin2h_u201",
  "ramhead2h_u201", "scepter2h_u201", "shield1h_u201", "spear1h_u201",
  "spear2h_u201", "sword1h_u201", "tool1h_u201",
]*/

const proStartingGear = [
  "armorbldg_u201", "armorclth_r201", "armorlgt_r201", "armormed_r201",
  "armorplt_u201", "arrowoh_u201_vr", "axe2h_u201", "ballista2h_u201_vr",
  "bow1h_u201", "firethrower2h_u201", "fishingnet1h_u201", "javalin2h_u201",
  "ramhead2h_u201", "scepter2h_u201", "shield1h_u201", "spear1h_u201",
  "spear2h_u201", "sword1h_u201", "tool1h_u201", "clubh_u201",
]
/*
const level40StartingGear = [
  "arrowoh_r202", "axe2h_r202", "gear_siege_r202", "banner_r202", "warhorn_r202", 
  "bellybow1h_r202", "bow1h_r202", "armormed_r202", "club2h_r202", "firethrower2h_r202",
  "armorlgt_r202", "tool1h_r202", "spear2h_r202", "gear_r202", "scout1h_r202",
  "javalin2h_r202", "spear1h_r202", "gear_bldg_los_r202", "merchant2h_r202",
  "fishingnet1h_r202", "armorplt_r202", "ramhead2h_r202", "armorbldg_r202",
  "gear_boat_r202", "",
]*/

const eventReforgeIgnoreList = [
  "armorbldg_winter2021",
]

const otherEffectsRangeFalse = [
  "scout1h_r001",
]

/**
 * Starting at this ID, all items were created by the celeste team.
 */
const celesteLegendariesStart = 2259

export function isEventReforgeIgnoreList(trait: Trait) {
  return eventReforgeIgnoreList.includes(trait.name)
}

export function isSoldByCyprus(trait: Trait) {
  return cyprusLegendaries.includes(trait.name)
}

export function isSoldByCouncilOfImhotep(trait: Trait) {
  return allianceCouncilOfImhotep.includes(trait.name)
}

export function isSoldByDelianLeague(trait: Trait) {
  return allianceDelianLeague.includes(trait.name)
}

export function isSoldByLegionOfCarthage(trait: Trait) {
  return allianceLegionOfCarthage.includes(trait.name)
}

export function isSoldByRhakotis(trait: Trait) {
  return rhakotis.includes(trait.name)
}

export function isSoldByRome(trait: Trait) {
  return rome.includes(trait.name)
}

export function isSoldForCoin(trait: Trait) {
  return isSoldByCyprus(trait)
    || isSoldByCouncilOfImhotep(trait)
    || isSoldByDelianLeague(trait)
    || isSoldByLegionOfCarthage(trait)
    || isSoldByRhakotis(trait)
    || isSoldByRome(trait)
}

export function isQuestReward(trait: Trait) {
  /*return questRewards.includes(trait.name)*/
  return quests[trait.name]
}

export function getQuestName(trait: Trait) {
  return quests[trait.name]
}

export function isHalloween2018Reward(trait: Trait) {
  return eventHalloween2018.includes(trait.name)
}

export function isWinterReward(trait: Trait) {
  return eventWinter.includes(trait.name)
}

export function isWinter2018Reward(trait: Trait) {
  return eventWinter2018.includes(trait.name)
}
export function isWinter2019Reward(trait: Trait) {
  return eventWinter2019.includes(trait.name)
}

export function isSummer2019Reward(trait: Trait) {
  return eventSummer2019.includes(trait.name)
}

export function isSummer2020Reward(trait: Trait) {
  return trait.name.startsWith("se2020_")
}

export function isSummer2021Reward(trait: Trait) {
  return trait.name.startsWith("se2021_")
}

export function isSummer2022Reward(trait: Trait) {
  return trait.name.startsWith("se2022_")
}

export function isWinter2020Reward(trait: Trait) {
  return trait.name.endsWith("_winter2020")
}

export function isWinter2021Reward(trait: Trait) {
  return trait.name.endsWith("_winter2021") 
}

export function isWinter2022Reward(trait: Trait) {
  return trait.name.endsWith("_winter2022") 
}

export function isHalloween2019Reward(trait: Trait) {
  return eventHalloween2019.includes(trait.name)
}

export function isHalloween2020Reward(trait: Trait) {
  return eventHalloween2020.includes(trait.name)
}

export function isHalloween2021Reward(trait: Trait) {
  return eventHalloween2021.includes(trait.name)
}

export function isHalloween2022Reward(trait: Trait) {
  return trait.name.endsWith("_halloween2022")
}

export function isHalloween2023Reward(trait: Trait) {
  return trait.name.endsWith("_halloween2023")
}

export function isWinter2023Reward(trait: Trait) {
  return trait.name.endsWith("_winter2023")
}

export function isSummer2025Reward(trait: Trait) {
  return trait.name.startsWith("se2025_")
}

export function isHalloween2025Reward(trait: Trait) {
  return trait.name.endsWith("_halloween2025")
}

export function isWinter2025Reward(trait: Trait) {
  return trait.name.endsWith("_winter2025")
}


export function isEventReward(trait: Trait) {
  return isHalloween2018Reward(trait)
    //|| isWinterReward(trait)
    || isWinter2018Reward(trait)
    || isSummer2019Reward(trait)
    || isHalloween2019Reward(trait)
    || isWinter2019Reward(trait)
    || isSummer2020Reward(trait)
    || isHalloween2020Reward(trait)
    || isWinter2020Reward(trait)
    || isSummer2021Reward(trait)
    || isHalloween2021Reward(trait)
    || isWinter2021Reward(trait)
    || isSummer2022Reward(trait)
    || isHalloween2022Reward(trait)
    || isWinter2022Reward(trait)
    //no new summer 2023
    || isHalloween2023Reward(trait)
    || isWinter2023Reward(trait)
    || isSummer2025Reward(trait)
    || isHalloween2025Reward(trait)
    || isWinter2025Reward(trait)
}

export function isBahramReward(trait: Trait) {
  return trait.name.endsWith("_bahram")
}

export function isMoesReward(trait: Trait) {
  return trait.name.endsWith("_moes")
}
 
export function isOtherEffectsRangeFalse(trait: Trait) {
  return otherEffectsRangeFalse.includes(trait.name)
}

export function isLevel40StartingGear(trait: Trait) {
  return trait.name.endsWith("_r202")
}

export async function isReforgeItemBlacklist(trait: Trait) {
  const reforgeItemBlacklist = await API.getReforgeItemBlacklist()
  return reforgeItemBlacklist.includes(trait.name)
}

/**
 * Only legendaries are reforgeable, so we only need to look
 * at a few items.
 */
export function isReforgeable(trait: Trait) {
  return trait.rarity === "legendary" 
    && !isSoldForCoin(trait)
    && !isQuestReward(trait)
    && (!isEventReward(trait) || isEventReforgeIgnoreList(trait))
    && !isBahramReward(trait)
 //   && !isReforgeItemBlacklist(trait)
}

export function isClassicItem(trait: Trait) {
  return trait.dbid < celesteLegendariesStart
}
/*
export function isPersianStartingGear(trait: Trait) {
  return persianStartingGear.includes(trait.name)
}

export function isBabylonianStartingGear(trait: Trait) {
  return trait.name.startsWith("_bahram")
}

export function isNorseStartingGear(trait: Trait) {
  return proStartingGear.includes(trait.name)
}*/

export function isProStartingGear(trait: Trait) {
  return proStartingGear.includes(trait.name)
}
export function isStartingGear(trait: Trait) {
  return isProStartingGear(trait)
  && isLevel40StartingGear(trait)
}
