import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-test-creator",
  templateUrl: "./test-creator.component.html",
  styleUrls: ["./test-creator.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestCreatorComponent implements OnInit {

  ngOnInit(): void {
  }

}
