import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from "@angular/core"
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"

import { noop } from "lodash"

@Component({
    selector: "cis-input-switch",
    templateUrl: "./switch.component.html",
    styleUrls: ["./switch.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputSwitchComponent),
            multi: true,
        },
    ],
    standalone: false
})
export class InputSwitchComponent implements ControlValueAccessor {

  @Input() on = "On"
  @Input() off = "Off"

  active = false
  hovering = false

  private propagateChange: any = noop

  toggle() {
    this.active = !this.active
    this.propagateChange(this.active)
  }

  /** @ControlValueAccessor */
  writeValue(value: boolean): void {
    this.active = value
  }

  /** @ControlValueAccessor */
  registerOnChange(fn) {
    this.propagateChange = fn
  }

  /** @ControlValueAccessor */
  registerOnTouched() {
    // empty
  }

}
