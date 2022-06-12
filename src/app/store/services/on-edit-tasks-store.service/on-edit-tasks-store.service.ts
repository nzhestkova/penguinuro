import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Test } from "../../../common/models/test";
import { removeTaskInfo, saveTaskInfo } from "../../actions/tasks.actions";
import { selectTasks } from "../../selectors/tasks.selectors";
import { AppState } from "../../state/app.state";

@Injectable({
  providedIn: "root"
})
export class OnEditTasksStoreService {
  constructor(private store$: Store<AppState>) { }

  findTask(taskID: number): Observable<Test> {
    return this.store$.pipe(
      select(selectTasks),
      map((tasks: Test[]) => tasks.find((task) => task._id === taskID)),
    );
  }

  loadTasks(): Observable<Test[]> {
    return this.store$.select(selectTasks);
  }

  saveTaskInfo(task: Test): void {
    this.store$.dispatch(saveTaskInfo({ taskInfo: task }));
  }

  removeTask(taskID: number): void {
    this.store$.dispatch(removeTaskInfo({ taskID: taskID }));
  }
}
