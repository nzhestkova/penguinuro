import { Test } from "../../model/test";

export interface TasksState {
  idCounter: number;
  tasks: Test[];
}

export const initialOnEditTasksState: TasksState = {
  idCounter: 0,
  tasks: [],
};
