import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { messages } from "../../model/messages";
import { SimpleTestUnit } from "../../model/test";

@Component({
  selector: "app-closed-test-create",
  templateUrl: "./closed-test-create.component.html",
  styleUrls: ["./closed-test-create.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClosedTestCreateComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) { }
  testUnits: SimpleTestUnit[];
  answerNames: string[];
  testMessages = messages.testCreator;

  openTestForm = new FormGroup({
    question: new FormControl(this.testMessages.questionTip, [
      Validators.required,
      Validators.minLength(10),
    ]),
    answerOptions: new FormGroup({
      answer1: new FormControl(this.testMessages.answerTip, [
        Validators.required,
        Validators.minLength(1),
      ]),
      answer2: new FormControl(this.testMessages.answerTip, [
        Validators.required,
        Validators.minLength(1),
      ]),
    }),
    addAnswer: new FormControl(`+ ${this.testMessages.addAnswerPhrase}`),
    correctAnswer: new FormControl("", [
    ]),
    complete: new FormControl(this.testMessages.completeCreatingAnswer),
  });

  setCorrectAnswer(controlName: string): void {
    if (this.openTestForm.get(controlName).invalid) { return; }
    if (this.openTestForm.get("correctAnswer").value !== controlName) {
      this.openTestForm.get("correctAnswer").setValue(controlName);
      console.log(this.openTestForm.get("correctAnswer").value);
    }
  }

  saveQuestion(): void {
    if (this.openTestForm.invalid || this.answerNames.length < 2) { return; }
    this.testUnits.push(new SimpleTestUnit(
      this.openTestForm.get("question").value,
      this.openTestForm.get("correctAnswer").value,
      this.answerNames.map((name) => this.openTestForm.get(`answerOptions.${name}`).value),
    ));
  }

  answerNumber(maxIndex: number): number {
    for (let i = 1; i < maxIndex + 1; i += 1) {
      if (!this.answerNames.find((item) => item.match(`${i}`))) {
        return i;
      }
    }
    return 0;
  }

  addAnswer(): void {
    if (this.answerNames.length === 4) {
      this.openTestForm.get("addAnswer").disable();
    }
    const form = <FormGroup>this.openTestForm.get("answerOptions");
    const missNumber = this.answerNumber(5);
    const newAnswerNumber = missNumber ? missNumber : Object.keys(form.controls).length + 1;

    form.addControl(`answer${newAnswerNumber}`,
      new FormControl(this.testMessages.answerTip, [Validators.required]));

    this.answerNames.push(`answer${newAnswerNumber}`);
    this.cdr.markForCheck();
  }

  removeAnswer(name: string): void {
    if (this.answerNames.length === 5) {
      this.openTestForm.get("addAnswer").enable();
    }
    const form = <FormGroup>this.openTestForm.get("answerOptions");
    form.removeControl(name);

    this.answerNames = this.answerNames.filter((item) => item !== name);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    const form = <FormGroup>this.openTestForm.get("answerOptions");
    this.answerNames = [];
    this.testUnits = [];

    Object.keys(form.controls).forEach((name) => {
      this.answerNames.push(`${name}`);
    });

  }
}
