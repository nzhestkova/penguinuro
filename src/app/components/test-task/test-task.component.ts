import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Question } from "../../model/question";

@Component({
  selector: "app-test-task",
  templateUrl: "./test-task.component.html",
  styleUrls: ["./test-task.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestTaskComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) { }

  testStructure: Question[];

  addQuestion(type: string): void {
    this.testStructure.push(new Question(type));
  }

  removeQuestion(removingQuestion: Question): void {
    this.testStructure = this.testStructure.filter((question) => question !== removingQuestion);
  }

  ngOnInit(): void {
    this.testStructure = [];
  }
}
