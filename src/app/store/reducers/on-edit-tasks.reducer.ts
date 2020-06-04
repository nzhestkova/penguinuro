import { createReducer, on } from "@ngrx/store";
import { removeTaskInfo, saveTaskInfo } from "../actions/on-edit-tasks.actions";
import { initialOnEditTasksState } from "../state/on-edit-tasks.state";

export const onEditTasksReducer = createReducer(
  initialOnEditTasksState,
  on(saveTaskInfo, (state, action) => ({
    ...state,
    tasks: state.tasks.concat([action.taskInfo])
  })),
  on(removeTaskInfo, (state, action) => ({
    ...state,
    tasks: state.tasks.filter((task) => task._id !== action.taskID)
  })),
);
