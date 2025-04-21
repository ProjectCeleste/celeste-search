import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

import { Material } from "../../interfaces"
import { DbService } from "../../services"

@Component({
    selector: "cis-material",
    templateUrl: "./material.component.html",
    styleUrls: ["./material.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MaterialComponent {

  @Input() material: Material

  constructor(
    private db: DbService,
  ) { }
}
