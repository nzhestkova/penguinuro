import { Student, Teacher } from "../../common/models/user";

export interface UserState {
  userInfo: Student | Teacher;
}

export const initialUserState: UserState = {
  userInfo: undefined,
};
