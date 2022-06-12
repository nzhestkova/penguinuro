import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Test } from "../../../common/models/test";
import { OnEditTasksService } from "../../../services/on-edit-tasks-service/on-edit-tasks.service";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnInit {
  constructor(private tasksService: OnEditTasksService,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
  }

  totalScore: number;
  task: Test;

  ngOnInit(): void {
    this.totalScore = this.activatedRoute.snapshot.queryParams.total;
    this.tasksService.loadTask(this.activatedRoute.snapshot.params.id).subscribe((task) => {
      this.task = task;
      this.cdr.markForCheck();
    });
  }
}
