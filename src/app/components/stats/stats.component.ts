import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Result, Student } from "../../model/user";
import { OnEditTasksService } from "../../services/on-edit-tasks-service/on-edit-tasks.service";
import { UserService } from "../../services/user-service/user.service";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent implements OnInit {
  constructor(private tasksService: OnEditTasksService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
  }

  testTitle: string;
  testQuestionCount: number;
  testPassScore: number;
  results: {
    student: object,
    score: number;
  }[];

  ngOnInit(): void {
    this.results = [];
    this.tasksService.loadTask(this.activatedRoute.snapshot.params.id).subscribe((task) => {
      this.testTitle = task.title;
      this.testQuestionCount = task.questions.length;
      this.testPassScore = task.passingScore;
      task.assigned.forEach((id) => {
        this.userService.userInfo(id).subscribe((info) => {
          const resultInfo = info["results"].find((result: Result) => result.taskID === task._id);
            this.results.push({
              student: info["username"],
              score: resultInfo ? resultInfo.point : undefined,
            });
        this.cdr.markForCheck();
          });
      });
    });
  }

}
