import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Material } from "../../../common/models/material";
import { messages } from "../../../common/models/messages";
import { MaterialService } from "../../../services/material-service/material.service";
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
              private materialService: MaterialService,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
    this.panelOptions = defaultOptions;
  }

  userMaterials: Material[];
  displayedInfo: Material[];
  subscriber: Subscription;
  file: File;

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

  upload(event: Event): void {
    const body = new FormData();
    body.set("file", event.target["files"][0]);
    this.materialService.upload(18, body).subscribe();
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
    this.displayAll();
    this.newestFirst();
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
