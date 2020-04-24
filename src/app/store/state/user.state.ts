import { User } from "../../model/user";

export interface UserState {
  userInfo: User | {};
}

export const initialUserState: UserState = {
  userInfo: {},
};
