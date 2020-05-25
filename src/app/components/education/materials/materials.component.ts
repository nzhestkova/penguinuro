import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Material } from "../../../model/material";
import { messages } from "../../../model/messages";
import { UserStoreService } from "../../../store/services/user-store.service/user-store.service";
import { strictDateTime } from "../../special/get-date-time";
import { newestSort, oldestSort } from "../../special/sort";

const defaultOptions = {
  sort: "new",
  filter: "all",
  view: "table",
  search: "",
};

@Component({
  selector: "app-materials",
  templateUrl: "./materials.component.html",
  styleUrls: ["./materials.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsComponent implements OnInit, OnDestroy {
  constructor(private userStore: UserStoreService,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
    this.panelOptions = defaultOptions;
  }

  userMaterials: Material[];
  displayedInfo: Material[];
  subscriber: Subscription;

  dateTimeDisplay = strictDateTime;
  panelOptions: {
    sort: string,
    filter: string,
    view: string,
    search: string,
  };

  messages = messages.education.materials;

  // sort(): void {
  //   this.panelOptions.sortOnNewest
  //     ? this.oldestFirst()
  //     : this.newestFirst();
  // }

  newestFirst(): void {
    newestSort(this.displayedInfo);
  }

  oldestFirst(): void {
    oldestSort(this.displayedInfo);
  }

  displayAll(): void {
    this.displayedInfo = this.userMaterials;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.panelOptions.view = params["view"] ? params["view"] : defaultOptions.view;
      this.panelOptions.filter = params["filter"] ? params["filter"] : defaultOptions.filter;
      this.panelOptions.sort = params["sort"] ? params["sort"] : defaultOptions.sort;
      this.panelOptions.search = params["search"] ? params["search"] : defaultOptions.search;
      this.cdr.markForCheck();
    });

    this.userMaterials = []; //
    this.subscriber = this.userStore.loadUserInfo().subscribe(
      (user) => {
        if (user) {
          // this.userMaterials = user.education.materials;
        }
      });
    this.userMaterials.push( //
      {
        authorID: 18,
        title: "Лекция по электродинамике",
        path: "[href://localhost:4200/here].docx",
        addDate: new Date("2019-12-05"),
      },
      {
        authorID: 13,
        title: "Лекция по математике",
        path: "[href://localhost:4200/here].mp3",
        addDate: new Date(),
      },
      {
        authorID: 18,
        title: "Лекция по электронике",
        path: "[href://localhost:4200/here].json",
        addDate: new Date("2019-11-03 12:01"),
      },
      {
        authorID: 12,
        title: "Методичка 'Программирование'",
        path: "[href://localhost:4200/here].docx",
        addDate: new Date("2014-07-15 0:0"),
      },
    );
    this.displayAll();
    this.newestFirst();
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
