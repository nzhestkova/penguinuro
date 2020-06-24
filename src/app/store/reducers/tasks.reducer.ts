import { createReducer, on } from "@ngrx/store";
import { removeTaskInfo, saveTaskInfo } from "../actions/tasks.actions";
import { initialOnEditTasksState } from "../state/tasks.state";

export const tasksReducer = createReducer(
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
