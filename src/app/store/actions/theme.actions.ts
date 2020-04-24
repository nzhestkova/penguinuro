import { createAction } from "@ngrx/store";

const TOGGLE = "[Theme] theme toggled";

export const toggleTheme = createAction(TOGGLE);
