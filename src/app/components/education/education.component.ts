import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Material } from "../../model/material";
import { messages } from "../../model/messages";
import { User } from "../../model/user";
import { MaterialService } from "../../services/material-service/material.service";
import { UserStoreService } from "../../store/services/user-store.service/user-store.service";
import { strictDateTime } from "../special/get-date-time";
import { newestSort, oldestSort } from "../special/sort";

@Component({
  selector: "app-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationComponent implements OnInit {
  constructor(private userStore: UserStoreService,
              private materialService: MaterialService,
              private cdr: ChangeDetectorRef) { }

  userEducationInfo: { materials: Material[] };
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

  sections: { number: number, title: string }[];
  chosenSection: { number: number, title: string };
  educationMessages = messages.education;

  dateTimeDisplay = strictDateTime;

  fileUploadForm = new FormGroup({
    file: new FormControl(""),
    submit: new FormControl("Загрузить")
  });

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

  choseSection(sectionNumber: number): void {
    this.chosenSection = this.sections[sectionNumber];
  }

  sort(): void {
    this.sortOnNewest
      ? this.oldestFirst()
      : this.newestFirst();
    this.sortOnNewest = !this.sortOnNewest;
  }

  newestFirst(): void {
    newestSort(this.userEducationInfoDisplay[this.chosenSection.title]);
  }

  oldestFirst(): void {
    oldestSort(this.userEducationInfoDisplay[this.chosenSection.title]);
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

  toTable(): void {
    this.tableView = true;
  }

  toTile(): void {
    this.tableView = false;
  }

  ngOnInit(): void {
    this.userStore.loadUserInfo().subscribe((user) => {
      if (user) {
        const userExisted = <User>user;
        this.userEducationInfo = userExisted.education;
        this.cdr.markForCheck();
      }
    });
    this.sections = [
      { number: 0, title: "materials" },
      { number: 1, title: "tasks" },
    ];
    this.chosenSection = this.sections[0];
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
      });

    this.displayMode = 0;
    this.sortOnNewest = true;
    this.tableView = false;
    this.displayAll();
    this.newestFirst();
  }
}
