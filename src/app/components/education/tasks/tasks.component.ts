import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { messages } from "../../../model/messages";
import { Test } from "../../../model/test";
import { OnEditTasksService } from "../../../services/on-edit-tasks-service/on-edit-tasks.service";
import { UserStoreService } from "../../../store/services/user-store.service/user-store.service";
import { strictDateTime } from "../../special/get-date-time";

const defaultOptions = {
  sort: "new",
  filter: "all",
  view: "table",
  search: "",
};

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit, OnDestroy {
  constructor(private userStore: UserStoreService,
              private taskService: OnEditTasksService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private cdr: ChangeDetectorRef) {
    this.panelOptions = defaultOptions;
    this.askingForType = false;
  }

  messages = messages.education.tasks;
  dateTimeDisplay = strictDateTime;
  userTasks: Test[];
  userID: number;
  displayedInfo: Test[];
  subscriber: Subscription;

  panelOptions: {
    sort: string,
    filter: string,
    view: string,
    search: string,
  };

  newTaskType: string;
  askingForType: boolean;
  description: string;

  setting(id: number): void {
    this.router.navigate([`/create/params/${id}`]).then();
  }

  assign(id: number): void {
    this.router.navigate([`/create/assign/${id}`]).then();
  }

  pass(id: number): void {
    this.router.navigate([`/pass/${id}`]).then();
  }

  focus(type: string): void {
    switch (type) {
      case "simple": {
        this.description = this.messages.types.simple.description;
        break;
      }
      case "test": {
        this.description = this.messages.types.test.description;
        break;
      }
      default: {
        this.description = this.messages.types.hint;
        break;
      }
    }
    this.cdr.markForCheck();
  }

  cancel(): void {
    this.askingForType = false;
    this.router.navigate(this.router.url.split(/[\/?]/).filter((item) => !item.match(/[=]/))).then();
  }

  ngOnInit(): void {
    this.userTasks = [];
    this.userStore.loadUserInfo().subscribe((user) => {
      if (user) {
        this.userID = user._id;
        user.education.createdTasks.forEach((task) => {
          this.taskService.loadTask(task).subscribe((test) => {
            this.userTasks.push(test);
            this.cdr.markForCheck();
          });
        });
        user.education.assignedTasks.forEach((task) => {
          this.taskService.loadTask(task).subscribe((test) => {
            this.userTasks.push(test);
            this.cdr.markForCheck();
          });
        });
      }
      });
    this.displayedInfo = this.userTasks;
    this.description = this.messages.types.hint;

    this.subscriber = this.activatedRoute.queryParams.subscribe((params) => {
      this.panelOptions.view = params["view"] ? params["view"] : defaultOptions.view;
      this.panelOptions.filter = params["filter"] ? params["filter"] : defaultOptions.filter;
      this.panelOptions.sort = params["sort"] ? params["sort"] : defaultOptions.sort;
      this.panelOptions.search = params["search"] ? params["search"] : defaultOptions.search;
      this.askingForType = !!params["create"];
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}