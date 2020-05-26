import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-task-creator",
  templateUrl: "./task-creator.component.html",
  styleUrls: ["./task-creator.component.less"]
})
export class TaskCreatorComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  redirect(): void {
    this.router.navigate([this.router.url + "/test"]).then();
  }

  ngOnInit(): void {
    this.redirect();
  }
}
