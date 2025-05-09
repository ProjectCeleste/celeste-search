import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core"
import { UntypedFormControl } from "@angular/forms"

import { map, tap } from "rxjs/operators"

import { StateService } from "../services"
import { ScrollbarComponent } from "../scrollbar/scrollbar.component"

@Component({
    selector: "cis-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SearchComponent implements OnInit, AfterViewInit {

  @Input() scrollbarRef: ScrollbarComponent
  @ViewChild("inputRef", { static: true }) inputRef: ElementRef

  readonly inputModel = new UntypedFormControl()

  input = ""
  isEmpty = this.inputModel.valueChanges.pipe(map(input => !input))

  constructor(
    private state: StateService,
  ) {
    this.state.searchChange.subscribe(search => {
      this.inputModel.setValue(search)
    })
  }

  ngOnInit() {
    this.inputModel.valueChanges.pipe(
      tap(() => {
        const container = this.scrollbarRef.elementRef.nativeElement.querySelector('.scrollbar-container');
        if (container) {
          container.scrollTop = 0;
        }
      }),
      tap(input => this.state.search = input),
    ).subscribe()
  }

  ngAfterViewInit() {
    if (!this.input) {
      this.inputRef.nativeElement.focus()
    }
  }

  clear() {
    this.inputModel.setValue("")
    this.inputRef.nativeElement.focus()
  }

  keepInputFocused() {
    const elem = document.activeElement
    if (elem === this.inputRef.nativeElement || elem === document.body || (elem && elem.classList.contains("__rarity"))) {
      return
    }

    const selection = window.getSelection()

    if (!selection || !selection.isCollapsed) {
      return
    }

    const container = this.scrollbarRef.elementRef.nativeElement.querySelector('.scrollbar-container');
    const y = container ? container.scrollTop : 0;
    this.inputRef.nativeElement.focus()
    if (container) {
      container.scrollTop = y;
    }
  }
}
