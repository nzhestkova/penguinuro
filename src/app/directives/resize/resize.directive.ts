import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";

@Directive({
  selector: "[appResize]"
})
export class ResizeDirective implements OnInit {
  constructor(private elementRef: ElementRef) { }
  fontWidth = 8.5;

  calculateRows(): number {
    const textLengthPX = this.elementRef.nativeElement.textLength * this.fontWidth;
    const areaWidth = this.elementRef.nativeElement.clientWidth;
    return Math.ceil(textLengthPX / areaWidth) ? Math.ceil(textLengthPX / areaWidth) : 1;
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.rows = this.calculateRows();
  }

  @HostListener("input") resize(): void {
    this.elementRef.nativeElement.rows = this.calculateRows();
  }
}
