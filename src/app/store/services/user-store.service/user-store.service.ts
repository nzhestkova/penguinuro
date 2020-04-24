import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "../../../model/user";
import { userLogin, userLogout } from "../../actions/user.actions";
import { selectUserInfo } from "../../selectors/user.selectors";
import { AppState } from "../../state/app.state";

@Injectable({
  providedIn: "root"
})
export class UserStoreService {
  constructor(private store$: Store<AppState>) {}

  loadUserInfo(): Observable<User | {}> {
    return this.store$.select(selectUserInfo);
  }

  loginUser(user: User): void {
    this.store$.dispatch(userLogin({ userInfo: user }));
  }

  logout(): void {
    this.store$.dispatch(userLogout());
  }
}
