import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Material } from "../../../model/material";
import { messages } from "../../../model/messages";
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
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private cdr: ChangeDetectorRef) {
    this.panelOptions = defaultOptions;
    this.askingForType = false;
  }

  messages = messages.education.tasks;
  dateTimeDisplay = strictDateTime;
  userTasks: Material[];
  displayedInfo: Material[];
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
