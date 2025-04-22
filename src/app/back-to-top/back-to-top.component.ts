import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core"

import { Observable, fromEvent } from "rxjs"
import { map } from "rxjs/operators"

import { ScrollbarComponent } from "../scrollbar/scrollbar.component"

@Component({
    selector: "cis-back-to-top",
    templateUrl: "./back-to-top.component.html",
    styleUrls: ["./back-to-top.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class BackToTopComponent implements OnInit {

  @Input() scrollbarRef: ScrollbarComponent
  shown: Observable<boolean>

  ngOnInit() {
    const container = this.scrollbarRef.elementRef.nativeElement.querySelector('.scrollbar-container');
    if (container) {
      this.shown = fromEvent(container, 'scroll').pipe(
        map(() => container.scrollTop > 0)
      );
    }
  }

  scrollToTop() {
    const container = this.scrollbarRef.elementRef.nativeElement.querySelector('.scrollbar-container');
    if (container) {
      container.scrollTop = 0;
    }
  }
}
