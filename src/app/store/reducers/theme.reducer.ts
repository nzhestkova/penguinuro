import { createReducer, on } from "@ngrx/store";
import { toggleTheme } from "../actions/theme.actions";
import { initialThemeState } from "../state/theme.state";

export const themeReducer = createReducer(
  initialThemeState,
  on(toggleTheme, (state) => ({ darkThemeEnable: !state.darkThemeEnable })),
);
