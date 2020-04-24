import { createReducer, on } from "@ngrx/store";
import { userLogin, userLogout } from "../actions/user.actions";
import { initialUserState } from "../state/user.state";

export const userReducer = createReducer(
  initialUserState,
  on(userLogin, (state, action) => ({ ...state, userInfo: action.userInfo })),
  on(userLogout, (state) => ({ ...state, userInfo: {} })),
);
