import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../../../model/user";
import { markNotificationsAsChecked, userLogin, userLogout } from "../../actions/user.actions";
import { selectUserInfo } from "../../selectors/user.selectors";
import { AppState } from "../../state/app.state";

@Injectable({
  providedIn: "root"
})
export class UserStoreService {
  constructor(private store$: Store<AppState>) {}

  userID(): Observable<number> {
    return this.store$.pipe(
      select(selectUserInfo),
      map((user) => user._id),
    );
  }

  loadUserInfo(): Observable<User> {
    return this.store$.select(selectUserInfo);
  }

  markNotificationsAsChecked(): void {
    this.store$.dispatch(markNotificationsAsChecked());
  }

  loginUser(user: User): void {
    this.store$.dispatch(userLogin({ userInfo: user }));
  }

  logout(): void {
    this.store$.dispatch(userLogout());
  }
}
