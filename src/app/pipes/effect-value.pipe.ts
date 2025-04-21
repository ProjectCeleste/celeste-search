import { Pipe, PipeTransform } from "@angular/core"

import { ItemEffect } from "../interfaces"
import { SettingsService } from "../services/settings.service"

@Pipe({
    name: "effectValue",
    pure: false,
    standalone: false
})
export class EffectValuePipe implements PipeTransform {

  constructor(
    private settings: SettingsService,
  ) { }

  transform(effect: ItemEffect, level: number, modifier: number): string {
    const precision = +this.settings.precision.value
    let base = 0
    if (effect.name=== "Regen. Rate") {
      base = effect.scaling * (level + 3) + effect.amount
    }
    else if (effect.name=== "Ignore Armor")
    {
      base = (effect.amount) * 100 + effect.scaling * 100 * (level + 3) 
    }
    else {
      base = (effect.amount- 1) * 100 + effect.scaling * 100 * (level + 3) 
    } 
    const sign = base < 0 ? "-" : "+"
    const unit = effect.name === "Regen. Rate" ? " Health/s" : "%"

    const modified = base * modifier
    const absolute = Math.abs(modified)
    const rounded = absolute.toFixed(precision)

    return sign + rounded + unit
  }

}
