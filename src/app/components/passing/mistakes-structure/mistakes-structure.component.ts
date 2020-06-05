import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-mistakes-structure",
  templateUrl: "./mistakes-structure.component.html",
  styleUrls: ["./mistakes-structure.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MistakesStructureComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
}
