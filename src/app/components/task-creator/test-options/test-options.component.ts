import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Test } from "../../../model/test";
import { OnEditTasksService } from "../../../services/on-edit-tasks-service/on-edit-tasks.service";
import { OnEditTasksStoreService } from "../../../store/services/on-edit-tasks-store.service/on-edit-tasks-store.service";
import { converseDate, nextDate } from "../../special/get-date-time";

@Component({
  selector: "app-test-options",
  templateUrl: "./test-options.component.html",
  styleUrls: ["./test-options.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestOptionsComponent implements OnInit {
  formattedDate = converseDate;
  constructor(private taskStore: OnEditTasksStoreService,
              private taskService: OnEditTasksService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  defaultOptions = {
    attemptCount: 1,
    timeToPass: 60,
    lifetime: 7,
  };

  task: Test;
  optionsForm = new FormGroup({
    title: new FormControl("", [
      Validators.required,
    ]),
    passingScore: new FormControl(0, [
      Validators.required,
    ]),
    attemptNotLimited: new FormControl(true, [
      Validators.required,
    ]),
    attemptCount: new FormControl(this.defaultOptions.attemptCount),
    isOnTime: new FormControl(false, [
      Validators.required,
    ]),
    timeToPass: new FormControl(this.defaultOptions.timeToPass),
    isTemporary: new FormControl(false, [
      Validators.required,
    ]),
    openTime: new FormControl(this.formattedDate(new Date())),
    closeTime: new FormControl(this.formattedDate(nextDate(new Date(), 0, 0, 7, 0, 0, 0))),
  });

  changeAvailable(): void {
    this.optionsForm.get("attemptNotLimited").value
      ? this.optionsForm.get("attemptCount").disable()
      : this.optionsForm.get("attemptCount").enable();
    this.optionsForm.get("isOnTime").value
      ? this.optionsForm.get("timeToPass").enable()
      : this.optionsForm.get("timeToPass").disable();
    if (this.optionsForm.get("isTemporary").value) {
      this.optionsForm.get("openTime").enable();
      this.optionsForm.get("closeTime").enable();
    } else {
      this.optionsForm.get("openTime").disable();
      this.optionsForm.get("closeTime").disable();
    }
  }

  initOptions(task: Test): void {
    this.optionsForm.get("title").setValue(task.title);
    this.optionsForm.get("passingScore").setValue(task.passingScore);
    if (task.lifeCycle) {
      this.optionsForm.get("isTemporary").setValue(task.lifeCycle.isTemporary);
      if (task.lifeCycle.isTemporary) {
        this.optionsForm.get("openTime").setValue(task.lifeCycle.openTime);
        this.optionsForm.get("closeTime").setValue(task.lifeCycle.closeTime);
      }
    }
    if (task.passProcess) {
      this.optionsForm.get("isOnTime").setValue(task.passProcess.isOnTime);
      if (this.optionsForm.get("isOnTime").value) {
        this.optionsForm.get("timeToPass").setValue(task.passProcess.timeToPass);
      }
    }
    if (task.rePassAbility) {
      this.optionsForm.get("attemptNotLimited").setValue(task.rePassAbility.attemptNotLimited);
      if (!task.rePassAbility.attemptNotLimited) {
        this.optionsForm.get("attemptCount").setValue(task.rePassAbility.attemptCount);
      }
    }
  }

  save(): void {
    if (!this.optionsForm.valid) { return; }
    this.task.title = this.optionsForm.get("title").value;
    this.task.passingScore = +this.optionsForm.get("passingScore").value;
    this.task.rePassAbility = {
      attemptNotLimited: this.optionsForm.get("attemptNotLimited").value,
      attemptCount: this.optionsForm.get("attemptNotLimited").value
        ? null
        : +this.optionsForm.get("attemptCount").value,
    };
    this.task.passProcess = {
      isOnTime: this.optionsForm.get("isOnTime").value,
      timeToPass: this.optionsForm.get("isOnTime").value
        ? this.optionsForm.get("timeToPass").value
        : null,
    };
    this.task.lifeCycle = {
      isTemporary: this.optionsForm.get("isTemporary").value,
      openTime: this.optionsForm.get("isTemporary").value
        ? this.optionsForm.get("openTime").value
        : null,
      closeTime: this.optionsForm.get("isTemporary").value
        ? this.optionsForm.get("closeTime").value
        : null
    };
    this.task.ready = true;
    this.task.assigned = [];
    this.taskService.updateTest(this.task).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(["education/tasks"], { queryParams: { view: "tile" } }).then();
        }
      },
    );
  }

  ngOnInit(): void {
    this.changeAvailable();
    this.taskStore.loadTasks().subscribe(
      (tasks) => console.log(tasks),
    );
    this.taskService.loadTask(this.activatedRoute.snapshot.params.id).subscribe((loadedTask) => {
      this.task = loadedTask;
      this.initOptions(this.task);
      this.changeAvailable();
      this.cdr.markForCheck();
    });
  }

}
