import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { UserState } from "../state/user.state";

const selectUser = (appState: AppState) => appState.user;

export const selectUserInfo = createSelector(selectUser, (state: UserState) => state.userInfo);
