import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Test } from "../../model/test";
import { OnEditTasksService } from "../../services/on-edit-tasks-service/on-edit-tasks.service";

@Component({
  selector: "app-passing",
  templateUrl: "./passing.component.html",
  styleUrls: ["./passing.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PassingComponent implements OnInit, OnDestroy {
  constructor(private tasksService: OnEditTasksService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
  }

  subscribers: Subscription[];
  task: Test;
  userAnswers: {
    answers: string[];
  }[];

  calculatePoint(): void {
    console.log(this.task.questions.reduce(
      (total, current, index) =>
        this.isCorrectAnswer(current.correctAnswers, this.userAnswers[index].answers) ? total + 1 : total, 0));
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

  ngOnInit(): void {
    this.subscribers = [];
    this.subscribers.push(this.tasksService.loadTask(this.activatedRoute.snapshot.params.id).subscribe((task) => {
      this.task = task;
      this.cdr.markForCheck();
    }));
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((subscriber) => subscriber.unsubscribe());
  }
}
