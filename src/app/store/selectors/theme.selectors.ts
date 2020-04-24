import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { ThemeState } from "../state/theme.state";

const selectTheme = (appState: AppState) => appState.theme;

export const selectThemeInfo = createSelector(selectTheme, (state: ThemeState) => state.darkThemeEnable);
