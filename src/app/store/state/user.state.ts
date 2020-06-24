import { Student, Teacher } from "../../model/user";

export interface UserState {
  userInfo: Student | Teacher;
}

export const initialUserState: UserState = {
  userInfo: undefined,
};
