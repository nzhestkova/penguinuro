import { Directive, ElementRef, HostListener, Input, OnInit } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Directive({
  selector: "[appClearInputTips]"
})
export class ClearInputTipsDirective implements OnInit {
  @Input() appClearInputTips: { control: AbstractControl, message: string };
  constructor(private elementRef: ElementRef) {}

  empty(): void {
    this.appClearInputTips.control.setValue(this.appClearInputTips.message);
    this.appClearInputTips.control.markAsPristine();
    this.appClearInputTips.control.setErrors({ require: true });
    this.elementRef.nativeElement.style.fontStyle = "italic";
    this.elementRef.nativeElement.style.color = "#aeaeae";
  }

  ngOnInit(): void {
    this.empty();
  }

  @HostListener("focusin") clearField(): void {
    if (this.appClearInputTips.control.pristine) {
      this.appClearInputTips.control.setValue("");
      this.elementRef.nativeElement.style.fontStyle = "normal";
      this.elementRef.nativeElement.style.color = "#000000";
    }
  }

  @HostListener("focusout") setTip(): void {
    if (!this.appClearInputTips.control.value) {
      this.empty();
    }
  }
}
