import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Student, Teacher } from "../../../common/models/user";
import { markNotificationsAsChecked, userLogin, userLogout } from "../../actions/user.actions";
import { selectUserInfo, selectUserTasks } from "../../selectors/user.selectors";
import { AppState } from "../../state/app.state";

@Injectable({
  providedIn: "root"
})
export class UserStoreService {
  constructor(private store$: Store<AppState>,
              private _http: HttpClient) {
  }

  userID(): Observable<number> {
    return this.store$.pipe(
      select(selectUserInfo),
      map((user) => user._id),
    );
  }

  loadUserInfo(): Observable<Student|Teacher> {
    return this.store$.select(selectUserInfo);
  }

  loadTasks(): Observable<number[]> {
    return this.store$.select(selectUserTasks);
  }

  markNotificationsAsChecked(): void {
    this.store$.dispatch(markNotificationsAsChecked());
  }

  loginUser(user: Student | Teacher): void {
    this.store$.dispatch(userLogin({userInfo: user}));
  }

  logout(): void {
    this.store$.dispatch(userLogout());
  }
}
