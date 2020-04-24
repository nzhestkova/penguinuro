import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { toggleTheme } from "../../actions/theme.actions";
import { selectThemeInfo } from "../../selectors/theme.selectors";
import { AppState } from "../../state/app.state";

@Injectable({
  providedIn: "root"
})
export class ThemeStoreService {
  constructor(private store$: Store<AppState>) { }

  loadThemeInfo(): Observable<boolean> {
    return this.store$.select(selectThemeInfo);
  }

  toggleTheme(): void {
    this.store$.dispatch(toggleTheme());
  }
}
