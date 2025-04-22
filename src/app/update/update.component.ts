import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core"
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker"
import { filter } from "rxjs/operators"

import { enterLeft } from "../animations"

const order = ["idle", "available", "activating"] // as const
type SwState = typeof order[number]

@Component({
    selector: "cis-update",
    templateUrl: "./update.component.html",
    styleUrls: ["./update.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [enterLeft],
    standalone: false
})
export class UpdateComponent {

  state: SwState = "idle"

  readonly text = {
    idle: "",
    available: "Update available.<br>Click to reload",
    activating: "Reloading...",
  }
  readonly icon = {
    idle: "done",
    available: "reload",
    activating: "busy",
  }

  /**
   * https://angular.io/guide/service-worker-communications
   */
  constructor(
    private changeRef: ChangeDetectorRef,
    private swUpdate: SwUpdate,
  ) {
    if (!swUpdate.isEnabled) {
      return
    }
    
    // Subscribe to version updates
    this.swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => this.setState("available"))
  }

  setState(state: SwState) {
    if (state === "activating") {
      this.swUpdate.activateUpdate()
        .finally(() => window.location.reload())
    }
    this.state = state
    this.changeRef.detectChanges()
  }

  transition() {
    const current = order.indexOf(this.state)
    const next = (current + 1) % order.length

    this.setState(order[next])
  }
}
