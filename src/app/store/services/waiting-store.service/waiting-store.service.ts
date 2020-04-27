import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { activateWait, deactivateWait } from "../../actions/waiting.actions";
import { selectWaiting } from "../../selectors/waiting.selectors";
import { AppState } from "../../state/app.state";

@Injectable({
  providedIn: "root"
})
export class WaitingStoreService {
  constructor(private store$: Store<AppState>) { }

  loadInfo(): Observable<boolean> {
    return this.store$.select(selectWaiting);
  }

  activateLoading(): void {
    this.store$.dispatch(activateWait());
  }

  deactivateLoading(): void {
    this.store$.dispatch(deactivateWait());
  }
}
