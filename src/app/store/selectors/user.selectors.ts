import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { UserState } from "../state/user.state";

const selectUser = (appState: AppState) => appState.user;

export const selectUserInfo = createSelector(selectUser, (state: UserState ) => state.userInfo);
export const selectUserID = createSelector(selectUser, (state: UserState) => state.userInfo._id);
export const selectUserType = createSelector(selectUser, (state: UserState) => state.userInfo.type);
export const selectUserTasks = createSelector(selectUser,
  (state: UserState) => state.userInfo.type === "student"
    ? state.userInfo["assignedTasks"]
    : state.userInfo["createdTasks"]);
