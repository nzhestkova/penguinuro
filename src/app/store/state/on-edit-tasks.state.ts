import { Test } from "../../model/test";

export interface OnEditTasksState {
  idCounter: number;
  tasks: Test[];
}

export const initialOnEditTasksState: OnEditTasksState = {
  idCounter: 0,
  tasks: [],
};
