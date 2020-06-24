import { createAction, props } from "@ngrx/store";
import { Test } from "../../model/test";

const SAVE_TASK_INFO = "[OnEditTask] saved info";
const REMOVE_TASK_INFO = "[OnEditTask] removed info";

export const saveTaskInfo = createAction(
  SAVE_TASK_INFO,
  props<{ taskInfo: Test }>(),
);

export const removeTaskInfo = createAction(
  REMOVE_TASK_INFO,
  props<{ taskID: number }>(),
);
