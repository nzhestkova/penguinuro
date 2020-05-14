import { createReducer, on } from "@ngrx/store";
import { Notification } from "../../model/notification";
import { markNotificationsAsChecked, userLogin, userLogout } from "../actions/user.actions";
import { initialUserState } from "../state/user.state";

export const userReducer = createReducer(
  initialUserState,
  on(userLogin, (state, action) => ({ ...state, userInfo: action.userInfo })),
  on(userLogout, (state) => ({ ...state, userInfo: undefined })),
  on(markNotificationsAsChecked, (state) => ({
    ...state,
    userInfo: {
      ...state.userInfo,
      notifications: state.userInfo.notifications.map((notification: Notification) => ({ ...notification, checked: true }))
    }
  })),
);
