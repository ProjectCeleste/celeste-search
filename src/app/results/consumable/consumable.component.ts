import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core"

import { Consumable, ConsumableRarity } from "../../interfaces"

@Component({
    selector: "cis-consumable",
    templateUrl: "./consumable.component.html",
    styleUrls: ["./consumable.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ConsumableComponent {

  @Input() consumable: Consumable

  rarities: string[] = []
  rarity: ConsumableRarity & { id: string }

  mainURL = location.origin

  constructor(
    private changeRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.rarities = Object.keys(this.consumable.rarities)
    const rarity = this.rarities[this.rarities.length - 1]
    this.setRarity(rarity)
  }

  setRarity(rarity: string) {
    this.consumable = { ...this.consumable }
    this.rarity = { ...this.consumable.rarities[rarity], id: rarity }
    this.changeRef.detectChanges()
  }

}
