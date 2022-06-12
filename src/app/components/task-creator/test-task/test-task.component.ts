import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { messages } from "../../../common/models/messages";
import { Question } from "../../../common/models/question";
import { Test } from "../../../common/models/test";
import { OnEditTasksService } from "../../../services/on-edit-tasks-service/on-edit-tasks.service";
import { UserService } from "../../../services/user-service/user.service";
import { OnEditTasksStoreService } from "../../../store/services/on-edit-tasks-store.service/on-edit-tasks-store.service";
import { UserStoreService } from "../../../store/services/user-store.service/user-store.service";

@Component({
  selector: "app-test-task",
  templateUrl: "./test-task.component.html",
  styleUrls: ["./test-task.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestTaskComponent implements OnInit, DoCheck {
  constructor(private userStore: UserStoreService,
              private userService: UserService,
              private taskStore: OnEditTasksStoreService,
              private taskService: OnEditTasksService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  messages = messages.education.tasks.types;
  testStructure: Question[];
  selectedQuestion: Question;
  answers: string[];

  questionForm = new FormGroup({
    wording: new FormControl("", [
      Validators.required,
    ]),
    answers: new FormGroup({}),
    submit: new FormControl(this.messages.nextStep),
  });

  buttonAble(): void {
    this.questionForm.get("submit").disable();
    if (!this.testStructure.length) { return; }
    const check = this.testStructure.filter((question) => !question.wording || !question.answers.length || !question.correctAnswers.length).length;
    if (check) { return; }
    this.questionForm.get("submit").enable();
  }

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
    const answer = this.selectedQuestion.answers[removingElementIndex];
    if (answer) {
      this.selectedQuestion.correctAnswers = this.selectedQuestion.correctAnswers.filter((correctAnswer) => correctAnswer !== answer);
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
    const indexes = [];
    this.selectedQuestion.correctAnswers.forEach(
      (correctAnswer) => indexes.push(this.selectedQuestion.answers.indexOf(correctAnswer)));

    const form = <FormGroup> this.questionForm.get("answers");
    this.selectedQuestion.answers = [];
    Object.keys(form.controls).forEach(
      (controlName) => {
        if (form.get(controlName).value) {
          this.selectedQuestion.answers.push(form.get(controlName).value);
        }
      });

    this.selectedQuestion.correctAnswers = [];
    indexes.forEach((i) => this.selectedQuestion.correctAnswers.push(this.selectedQuestion.answers[i]));
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

  checkCorrectAnswers(index: number): boolean {
    const element = this.selectedQuestion.answers[index];
    return this.selectedQuestion.correctAnswers.includes(element);
  }

  markAs(index: number): void {
    const element = this.selectedQuestion.answers[index];
    if (!element) { return; }

    if (this.selectedQuestion.correctAnswers.includes(element)) {
      this.selectedQuestion.correctAnswers = this.selectedQuestion.correctAnswers.filter(
        (correctAnswer) => correctAnswer !== element);
      return;
    }
    this.selectedQuestion.correctAnswers.push(element);
  }

  nextStep(): void {
    this.userStore.userID().subscribe((id) => {
      const task = new Test(this.testStructure, id);
      this.taskService.saveTest(task).subscribe((taskID) => {
        this.userService.refreshInfo(id).subscribe((userInfo) => {
          this.userStore.loginUser(userInfo);
          this.cdr.markForCheck();
        });
        this.router.navigate([`create/params/${taskID}`] ).then();
      });
    });
  }

  ngOnInit(): void {
    this.testStructure = [];
  }

  ngDoCheck(): void {
    this.buttonAble();
  }
}
