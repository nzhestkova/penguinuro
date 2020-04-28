import { AfterViewChecked, Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[appSetStatus]"
})
export class SetStatusDirective implements AfterViewChecked {
  @Input() appSetStatus: { status: string, darkTheme: boolean };
  background = {
    white: "#f9f9f9",
    violet: "#5f508d",
    green: "#478d41",
    yellow: "#8d8d43",
  };

  color = {
    white: "#ffffff",
    violet: "#532478",
    green: "#3f7e3a",
    yellow: "#707034",
    black: "#000000",
  };

  constructor(private elementRef: ElementRef) {
  }

  setColors(): void {
    const changingProperty = this.appSetStatus.darkTheme ? "color" : "background";
    const constantProperty = !this.appSetStatus.darkTheme ? "color" : "background";

    this.elementRef.nativeElement.style[constantProperty] = this[constantProperty].white;
    switch (this.appSetStatus.status) {
      case "student": {
        this.elementRef.nativeElement.style[changingProperty] = this[changingProperty].yellow;
        break;
      }
      case "teacher": {
        this.elementRef.nativeElement.style[changingProperty] = this[changingProperty].green;
        break;
      }
      case "developer": {
        this.elementRef.nativeElement.style[changingProperty] = this[changingProperty].violet;
        break;
      }
      default: {
        this.elementRef.nativeElement.style[changingProperty] = this[changingProperty].white;
        this.elementRef.nativeElement.style.color = this.color.black;
        break;
      }
    }
  }

  ngAfterViewChecked(): void {
    this.setColors();
  }
}
