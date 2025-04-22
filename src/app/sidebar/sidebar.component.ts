import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
} from "@angular/core"

import { enterLeaveRight } from "../animations"

@Component({
    selector: "cis-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [enterLeaveRight],
    standalone: false
})
export class SidebarComponent {

  isOpen = false
  tab = 0

  constructor(
    private changeRef: ChangeDetectorRef,
    private elementRef: ElementRef
  ) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  open() {
    this.isOpen = true
    this.changeRef.detectChanges()
  }

  close() {
    this.isOpen = false
    this.changeRef.detectChanges()
  }

}
