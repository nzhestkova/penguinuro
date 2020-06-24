import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Question } from "../../model/question";
import { Test } from "../../model/test";
import { OnEditTasksService } from "../../services/on-edit-tasks-service/on-edit-tasks.service";
import { UserService } from "../../services/user-service/user.service";
import { UserStoreService } from "../../store/services/user-store.service/user-store.service";

@Component({
  selector: "app-passing",
  templateUrl: "./passing.component.html",
  styleUrls: ["./passing.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PassingComponent implements OnInit, OnDestroy {
  constructor(private tasksService: OnEditTasksService,
              private userService: UserService,
              private userStoreService: UserStoreService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
  }

  subscribers: Subscription[];
  task: Test;
  currentQuestion: Question;
  userAnswers: {
    questionNumber: number;
    answers: string[];
  }[];

  marked(answer: string): boolean {
    const questionNumber = this.task.questions.indexOf(this.currentQuestion);
    const currentUserAnswer = this.userAnswers.find(
      (userAnswer) => userAnswer.questionNumber === questionNumber);
    if (currentUserAnswer) {
      return currentUserAnswer.answers.includes(answer);
    }
    return false;
  }

  answerControl(answer: string): void {
    const questionNumber = this.task.questions.indexOf(this.currentQuestion);
    const currentUserAnswer = this.userAnswers.find(
      (userAnswer) => userAnswer.questionNumber === questionNumber);
    if (currentUserAnswer) {
      currentUserAnswer.answers.includes(answer)
        ? currentUserAnswer.answers = currentUserAnswer.answers.filter((userAnswer) => userAnswer !== answer)
        : currentUserAnswer.answers.push(answer);
      if (!currentUserAnswer.answers.length) {
        this.userAnswers.splice(this.userAnswers.indexOf(currentUserAnswer), 1);
      }
      return;
    }
    this.userAnswers.push({ questionNumber: questionNumber, answers: [answer]});
  }

  selectQuestion(question: Question): void {
    this.currentQuestion = question;
  }

  calculatePoint(): void {
    const totalPoint = this.task.questions.reduce(
      (total, current, index) =>
        this.isCorrectAnswer(current.correctAnswers, this.userAnswers[index].answers) ? total + 1 : total, 0);
    this.userStoreService.loadUserInfo().subscribe((user) => {
      const body = {
        ...user,
        results: user.results.concat([{
          taskID: this.task._id,
          point: totalPoint,
          attempt: 1,
          timeSpend: 0,
        }])
      };
      this.userService.saveUserInfo(body).subscribe(() => {
        this.router.navigate([`/results/${this.task._id}`], { queryParams: { total: totalPoint } }).then();
      });
    });
  }

  isCorrectAnswer(correctAnswers: string[], answers: string[]): boolean {
    if (correctAnswers.length !== answers.length) { return false; }
    for (const answer of answers) {
      if (!correctAnswers.find((correctAnswer) => correctAnswer === answer)) {
        return false;
      }
    }
    return true;
  }

  previousQuestion(): void {
    let index = this.task.questions.indexOf(this.currentQuestion) - 1;
    if (index === -1) {
      index = this.task.questions.length - 1;
    }
    this.currentQuestion = this.task.questions[index];
  }

  nextQuestion(): void {
    let index = this.task.questions.indexOf(this.currentQuestion) + 1;
    if (index === this.task.questions.length) {
      index = 0;
    }
    this.currentQuestion = this.task.questions[index];
  }

  ngOnInit(): void {
    this.userAnswers = [];
    this.subscribers = [];
    this.subscribers.push(this.tasksService.loadTask(this.activatedRoute.snapshot.params.id).subscribe((task) => {
      this.task = task;
      this.currentQuestion = this.task.questions[0];
      this.cdr.markForCheck();
    }));
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((subscriber) => subscriber.unsubscribe());
  }
}
