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

import { NgScrollbar } from "ngx-scrollbar"
import { map, tap } from "rxjs/operators"

import { StateService } from "../services"

@Component({
  selector: "cis-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, AfterViewInit {

  @Input() scrollbarRef: NgScrollbar
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
      tap(() => this.scrollbarRef.scrollToTop()),
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

    const y = this.scrollbarRef.scrollable.measureScrollOffset("top")
    this.inputRef.nativeElement.focus()
    this.scrollbarRef.scrollYTo(y)
  }
}
