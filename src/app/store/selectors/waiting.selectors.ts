import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { WaitingState } from "../state/waiting.state";

const selectPleaseWait = (appState: AppState) => appState.pleaseWait;

export const selectWaiting = createSelector(selectPleaseWait, (state: WaitingState) => state.waiting);
