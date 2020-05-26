import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { messages } from "../../model/messages";
import { Question } from "../../model/question";

@Component({
  selector: "app-test-task",
  templateUrl: "./test-task.component.html",
  styleUrls: ["./test-task.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestTaskComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {
  }

  messages = messages.education.tasks.types;
  testStructure: Question[];
  selectedQuestion: Question;
  answers: string[];
  correctAnswers: string[];

  questionForm = new FormGroup({
    wording: new FormControl("", [
      Validators.required,
    ]),
    answers: new FormGroup({}),
    submit: new FormControl(this.messages.saveQuestion),
  });

  refreshControls(): void {
    const form = <FormGroup> this.questionForm.get("answers");
    this.answers = Object.keys(form.controls);
    this.cdr.markForCheck();
  }

  initAnswers(): void {
    this.questionForm.removeControl("answers");
    this.questionForm.addControl("answers", new FormGroup({}));

    const form = <FormGroup>this.questionForm.get("answers");
    this.selectedQuestion.answers.forEach(
      (answer, index) => form.addControl(`answer${index}`, new FormControl(answer, [Validators.required])));
    this.refreshControls();
  }

  addAnswer(): void {
    const form = <FormGroup> this.questionForm.get("answers");
    form.addControl(`answer${Object.keys(form.controls).length}`, new FormControl("", [Validators.required]));
    this.refreshControls();
  }

  removeAnswer(controlName: string, removingElementIndex: number): void {
    if (this.selectedQuestion.answers[removingElementIndex]) {
      this.selectedQuestion.answers.splice(removingElementIndex, 1);
    }

    const form = <FormGroup> this.questionForm.get("answers");
    form.removeControl(controlName);
    const answersCount = Object.keys(form.controls).length;
    this.initAnswers();

    const newForm = <FormGroup> this.questionForm.get("answers");
    const newAnswersCount = Object.keys(newForm.controls).length;
    for (let i = 0; i < (answersCount - newAnswersCount); i += 1) {
      this.addAnswer();
    }
  }

  addQuestion(type: string): void {
    this.testStructure.push(new Question(type));
  }

  selectQuestion(selectedQuestion: Question): void {
    this.selectedQuestion = selectedQuestion;
    this.questionForm.get("wording").setValue(this.selectedQuestion.wording);
    this.initAnswers();
  }

  saveAnswers(): void {
    const form = <FormGroup> this.questionForm.get("answers");
    this.selectedQuestion.answers = [];
    Object.keys(form.controls).forEach(
      (controlName) => {
        if (form.get(controlName).value) {
          this.selectedQuestion.answers.push(form.get(controlName).value);
        }
      });
  }

  saveWording(): void {
    const input = this.questionForm.get("wording");
    if (input.value) {
      this.selectedQuestion.setWording(input.value);
    }
  }

  removeQuestion(removingQuestion: Question): void {
    this.testStructure = this.testStructure.filter((question) => question !== removingQuestion);
    if (this.selectedQuestion === removingQuestion) {
      delete this.selectedQuestion;
    }
  }

  checkCorrectAnswers(): void {

  }

  ngOnInit(): void {
    this.testStructure = [
      new Question("simple", "Сколько планет в солнечной системе?"),
      new Question("simple", "Когда появились первые люди?"),
    ];
    this.testStructure[0].setAnswers(["7 планет", "8 планет", "9 планет"]);
    this.testStructure[0].setCorrectAnswers([this.testStructure[0].answers[0]]);
    this.selectQuestion(this.testStructure[0]);
  }
}
