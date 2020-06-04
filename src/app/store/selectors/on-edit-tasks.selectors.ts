import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";

const selectOnEditTasks = (state: AppState) => state.onEditTasks;

export const selectTasks = createSelector(selectOnEditTasks, (state) => state.tasks);
