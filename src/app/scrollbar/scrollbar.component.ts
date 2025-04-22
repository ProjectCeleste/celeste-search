import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from "@angular/core"

@Component({
    selector: "cis-scrollbar",
    templateUrl: "./scrollbar.component.html",
    styleUrls: ["./scrollbar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ScrollbarComponent {
  @Input() theme: "light" | "dark" = "light"
}
