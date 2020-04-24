import { ThemeState } from "./theme.state";
import { UserState } from "./user.state";

export interface AppState {
  user: UserState;
  theme: ThemeState;
}
