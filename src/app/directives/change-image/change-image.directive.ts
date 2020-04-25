import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appChangeImage]"
})
export class ChangeImageDirective {
  @Input() appChangeImage: string[];
  click: number;
  constructor(private elementRef: ElementRef) {
    this.click = 0;
  }

  @HostListener("click") toggle(): void {
    this.elementRef.nativeElement.src = this.appChangeImage[this.click % 2];
    this.click += 1;
  }
}
