import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Material } from "../../model/material";
import { messages } from "../../model/messages";
import { User } from "../../model/user";
import { MaterialService } from "../../services/material-service/material.service";
import { UserStoreService } from "../../store/services/user-store.service/user-store.service";
import { newestSort, oldestSort } from "../special/sort";

@Component({
  selector: "app-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EducationComponent implements OnInit, OnDestroy {
  routerSubscriber: Subscription;
  constructor(private userStore: UserStoreService,
              private materialService: MaterialService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
    if (!this.activateRoute.children.length) {
      this.router.navigate([`${this.router.url}/tasks`]).then();
    }
    this.routerSubscriber = this.router.events.subscribe(object => {
      if (object instanceof NavigationEnd) {
        const path = object.url.match(/\/[A-z]+($|[?]+)/)[0];
        this.section = path.match(/[A-z]+/)[0];
      }
    });
  }

  userEducationInfo: { materials: Material[] };
  section: string;
  userEducationInfoNative = {
    materials: [],
    tasks: []
  };

  userEducationInfoDisplay = {
    materials: [],
    tasks: []
  };

  tableView: boolean;
  sortOnNewest: boolean;
  displayMode: number;
  searchRequest: string;

  queryParams: object;
  options = {
    sortOnOld: false,
    filterMode: "all",
    view: "tile",
    searchRequest: "",
  };

  educationMessages = messages.education;

  fileUploadForm = new FormGroup({
    file: new FormControl(""),
    submit: new FormControl("Загрузить")
  });

  compareQuery(): void {
    this.queryParams = { view: this.options.view };
  }

  create(): void {
    this.router.navigate(this.router.url.split(/[\/?]/).filter((item) => !item.match(/[=]/)),
      { queryParams: {
        create: true,
        } }).then();
  }

  fileUpload(event: Event): void {
    const file = event.target["files"][0];
    this.fileUploadForm.get("file").setValue(file);
    if (file) { console.log(file.name.match(/.[a-zA-Z]+$/)[0]); }

    const formData = new FormData();
    formData.append("material", file, file.name);

    // this.materialService.upload(18, formData).subscribe(
    //   (data) => console.log(data),
    // );
  }

  add(sectionNumber: number): void {
    if (sectionNumber === 1) {
      this.router.navigate(["", "create_task"]).then();
    }
  }

  sort(): void {
    this.sortOnNewest
      ? this.oldestFirst()
      : this.newestFirst();
    this.sortOnNewest = !this.sortOnNewest;
    this.options.sortOnOld = !this.sortOnNewest;
  }

  newestFirst(): void {
    newestSort(this.userEducationInfoDisplay[this.section]);
  }

  oldestFirst(): void {
    oldestSort(this.userEducationInfoDisplay[this.section]);
  }

  filter(): void {
    switch (this.displayMode) {
      case 0: {
        this.displayMode += 1;
        this.displayUpload();
        break;
      }
      case 1: {
        this.displayMode += 1;
        this.displaySaved();
        break;
      }
      case 2: {
        this.displayMode = 0;
        this.displayAll();
        break;
      }
    }
    if (this.searchRequest) { this.search(); }
  }

  displaySaved(): void {
    this.userEducationInfoDisplay.materials = this.userEducationInfoNative.materials.filter(
      (item: Material) => item.authorID !== 18,
    );
  }

  displayUpload(): void {
    this.userEducationInfoDisplay.materials = this.userEducationInfoNative.materials.filter(
      (item: Material) => item.authorID === 18,
    );
  }

  displayAll(): void {
    this.userEducationInfoDisplay.materials = this.userEducationInfoNative.materials;
  }

  search(): void {
    switch (this.displayMode) {
      case 0: {
        this.displayAll();
        break;
      }
      case 1: {
        this.displayUpload();
        break;
      }
      case 2: {
        this.displaySaved();
        break;
      }
    }
    this.userEducationInfoDisplay.materials = this.userEducationInfoDisplay.materials.filter(
      (item: Material) => item.title.toLowerCase().includes(this.searchRequest.toLowerCase()));
  }

  clear(): void {
    this.searchRequest = "";
    this.displayMode = 0;
    this.sortOnNewest = true;
    this.displayAll();
    this.newestFirst();
  }

  refresh(): void {
    const urlSegments = (this.router.url.split(/[\/?]/).filter((item) => !item.match(/[=]/)));
    this.compareQuery();
    this.router.navigate(urlSegments, { queryParams: this.queryParams }).then();
  }

  toTable(): void {
    this.options.view = "table";
    this.refresh();
    this.check();
  }

  toTile(): void {
    this.options.view = "tile";
    this.refresh();
    this.check();
  }

  check(): void {
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    if (Object.keys(this.activateRoute.snapshot.queryParams)) {
      const params = this.activateRoute.snapshot.queryParams;
      if (params["view"]) {
        this.options.view = params["view"];
        this.compareQuery();
      }
    }
    this.userStore.loadUserInfo().subscribe((user) => {
      if (user) {
        const userExisted = <User>user;
        this.userEducationInfo = userExisted.education;
        this.cdr.markForCheck();
      }
    });
    this.userEducationInfoNative.materials.push(
      {
        authorID: 18,
        title: "Лекция по электродинамике",
        link: "[href://localhost:4200/here].docx",
        addDate: new Date("2019-12-05"),
      },
      {
        authorID: 13,
        title: "Лекция по математике",
        link: "[href://localhost:4200/here].mp3",
        addDate: new Date(),
      },
      {
        authorID: 18,
        title: "Лекция по электронике",
        link: "[href://localhost:4200/here].json",
        addDate: new Date("2019-11-03 12:01"),
      },
      {
        authorID: 12,
        title: "Методичка 'Программирование'",
        link: "[href://localhost:4200/here].docx",
        addDate: new Date("2014-07-15 0:0"),
      },
      {
        authorID: 12,
        title: "Методичка",
        link: "[href://localhost:4200/here].docx",
        addDate: new Date("2014-07-15 0:0"),
      },
      {
        authorID: 12,
        title: "Методичка 'Программирование'",
        link: "[href://localhost:4200/here].docx",
        addDate: new Date("2014-07-15 0:0"),
      });

    this.displayMode = 0;
    this.sortOnNewest = true;
    this.tableView = false;
    this.displayAll();
    this.newestFirst();
  }

  ngOnDestroy(): void {
    this.routerSubscriber.unsubscribe();
  }
}
