import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

@Component({
    selector: "cis-icon",
    templateUrl: "./icon.component.html",
    styleUrls: ["./icon.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class IconComponent {

  @Input() icon:
    | "clear"
    | "close"
    | "up"
    | "menu"
    | "bug"
    | "precision"
    | "columns"
    | "search"
    | "busy"
    | "done"
    | "reload"
    | "everything"

}
