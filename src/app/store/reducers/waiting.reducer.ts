import { createReducer, on } from "@ngrx/store";
import { activateWait, deactivateWait } from "../actions/waiting.actions";
import { initialWaitingState } from "../state/waiting.state";

export const waitingReducer = createReducer(
  initialWaitingState,
  on(activateWait, () => ({ waiting: true })),
  on(deactivateWait, () => ({ waiting: false })),
);
