import { createAction, props } from "@ngrx/store";
import { User } from "../../model/user";

const LOGIN = "[User] logged in";
const LOGOUT = "[User] logged out";

export const userLogin = createAction(
  LOGIN,
  props<{ userInfo: User }>(),
);
export const userLogout = createAction(LOGOUT);
