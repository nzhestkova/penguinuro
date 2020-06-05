import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Test } from "../../../model/test";
import { User } from "../../../model/user";
import { OnEditTasksService } from "../../../services/on-edit-tasks-service/on-edit-tasks.service";
import { UserService } from "../../../services/user-service/user.service";

@Component({
  selector: "app-test-assignment",
  templateUrl: "./test-assignment.component.html",
  styleUrls: ["./test-assignment.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TestAssignmentComponent implements OnInit, OnDestroy {
  constructor(private taskService: OnEditTasksService,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
  }

  task: Test;
  studentsList: User[];
  assignedList: User[];

  assign(id: number): void {
    const user = this.studentsList.find((student) => student._id === id);
    if (!this.assignedList.find((student) => student._id === id)) {
      this.assignedList.push(user);
    }
  }

  disAssign(id: number): void {
    this.assignedList = this.assignedList.filter((student) => student._id !== id);
  }

  complete(): void {
    this.task.assigned = this.assignedList.map((student) => student._id);
    this.taskService.updateTest(this.task).subscribe(((response) => {
      if (response) {
        this.router.navigate(["education/tasks"], { queryParams: { view: "tile" } }).then();
      }
    }));
  }

  ngOnInit(): void {
    this.studentsList = [];
    this.assignedList = [];
    this.taskService.loadTask(this.activatedRoute.snapshot.params.id).subscribe((loadedTask) => {
      this.task = loadedTask;
      this.cdr.markForCheck();
    });
    this.userService.onlyStudents().subscribe((students) => {
      this.studentsList = students;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
  }
}
