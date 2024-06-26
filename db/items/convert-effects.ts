import { Trait } from "../../api-types"
import { uniqBy } from "lodash"
import yn from "yn"

import { ItemEffect } from "../interfaces"

import { convertEffectName } from "./convert-effect-name"

/**
 * Converts item effects from their API format to the format
 * used by the Search app.
 */
export function convertEffects(trait: Trait): ItemEffect[] | undefined {
  if (!trait.effects) {
    return
  }

  const converted = trait.effects.effect
    // Some effects are not displayed ingame.
    .filter(effect => {/*
      if (effect.subtype === "CarryCapacity") {
        return false
      }*/
      if (effect.action === "AreaHeal") {
        return false
      }
      if (effect.action === "BurningAttack") {
        return false
      }
      // if (effect.subtype === "WorkRate" && effect.action === "SelfHeal") {
      //   return false
      // }
      return true
    })
    .map(effect => {
      // This is the "Snare" effect that gets displayed as a positive effect ingame.
      if (effect.subtype === "TargetSpeedBoost") {
        effect.amount = 1 + (1 - effect.amount)
        effect.scaling = -effect.scaling
      }
/*
      if (effect.subtype === "ArmorVulnerability") {
        effect.amount = 1 + effect.amount
        effect.scaling = effect.scaling
      }
*/
      // The egyptian empower effects scale differently.
      if (effect.action === "Empower") {
        effect.amount = (effect.amount - 1) * 11 + 1
        effect.scaling *= 11
      }

      effect.amount = round(effect.amount, 5)
      effect.scaling = round(effect.scaling, 5)

      const itemEffect: ItemEffect = {
        name: convertEffectName(effect),
        amount: effect.amount,
        scaling: effect.scaling,
        beneficial: !!yn(effect.bonus) || undefined,
        action: effect.subtype.startsWith("ActionEnable") || undefined,
      }

      return itemEffect
    })
  
  if (trait.name === "gear_gauntlet_bahram" || trait.name === "gear_boot_bahram") {
    converted[4] = (converted[0])
    converted[0] = (converted[1])
    converted[1] = (converted[2])
    converted[2] = (converted[3])
    converted[3] = (converted[4])
  }

  if (trait.name === "gear_mag" || trait.name === "se2021_gear" || trait.name === "gear_l004" || trait.name === "gear_l006" || trait.name === "gear_l005" || trait.name === "gear_boat_hrh"
     || trait.name === "se2022_gear" || trait.name === "armorlgt_fbg" || trait.name === "gear_iceking_leg") {
    converted[3] = (converted[0])
    converted[0] = (converted[1])
    converted[1] = (converted[2])
    converted[2] = (converted[3])
  }
  if(trait.traittype === "Tools") {
    /*console.log(converted.length)*/
    if (converted[0].name === "Food Carry Capacity") {
      converted[converted.length] = converted[0]
      converted[converted.length] = converted[2]
      converted[converted.length] = converted[3]
      converted[converted.length] = converted[1]

      for (var i = 0; i<converted.length-4; i++) {
        converted[i] = (converted[i+4])
      }

    }

    //Health 3rd place so goes first and gets pushed up

    var HealthArrayNumber = 0
    for (var i = 0; i<converted.length; i++) {
      if (converted[i].name === "Health") {
        HealthArrayNumber = i
      }
    }

    if (converted[HealthArrayNumber].name === "Health") {

      converted[converted.length] = converted[HealthArrayNumber]
      for (var i = converted.length; i>0; i--) {
        converted[i] = (converted[i-1])
      }
      converted[0] = converted[converted.length-1]
    }    

    //Damage second so goes next and gets pushed up

    var DamageArrayNumber = 0
    for (var i = 0; i<converted.length; i++) {
      if (converted[i].name === "Damage") {
        DamageArrayNumber = i
      }
    }

    if (converted[DamageArrayNumber].name === "Damage") {

      converted[converted.length] = converted[DamageArrayNumber]
      for (var i = converted.length; i>0; i--) {
        converted[i] = (converted[i-1])
      }
      converted[0] = converted[converted.length-1]
    }    


    //Movement Speed first place so last to put in place

    var MovementSpeedArrayNumber = 0
    for (var i = 0; i<converted.length; i++) {
      if (converted[i].name === "Movement Speed") {
        MovementSpeedArrayNumber = i
      }
    }

    if (converted[MovementSpeedArrayNumber].name === "Movement Speed") {

      converted[converted.length] = converted[MovementSpeedArrayNumber]
      for (var i = converted.length; i>0; i--) {
        converted[i] = (converted[i-1])
      }
      converted[0] = converted[converted.length-1]
    }    

  }

  return uniqBy(converted, effect => effect.name)
}

/**
 * A Math.round wrapper that allows specifiying the desired
 * number of decimal places.
 */
function round(value: number, decimalPlaces: number) {
  const mult = Math.pow(10, decimalPlaces)
  return Math.round(value * mult) / mult
}
