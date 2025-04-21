import { ChangeDetectionStrategy, Component } from "@angular/core"

@Component({
    selector: "cis-help",
    templateUrl: "./help.component.html",
    styleUrls: ["./help.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HelpComponent { }
