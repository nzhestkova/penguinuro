import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appShowPassword]"
})
export class ShowPasswordDirective {
  clickCount: number;
  constructor(private elementRef: ElementRef) {
    this.clickCount = 0;
  }

  @HostListener("click") showPassword(): void {
    this.clickCount += 1;
    this.clickCount % 2 === 0
      ? this.elementRef.nativeElement.parentNode.parentNode.childNodes[0].type = `password`
      : this.elementRef.nativeElement.parentNode.parentNode.childNodes[0].type = `text`;
  }
}
