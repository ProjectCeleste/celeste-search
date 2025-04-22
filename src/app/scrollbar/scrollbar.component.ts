import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from "@angular/core"

@Component({
    selector: "cis-scrollbar",
    templateUrl: "./scrollbar.component.html",
    styleUrls: ["./scrollbar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ScrollbarComponent {
  @Input() theme: "light" | "dark" = "light"
  
  // Add a ref property that returns the component instance
  get ref(): ScrollbarComponent {
    return this;
  }

  constructor(public elementRef: ElementRef) {}
}
