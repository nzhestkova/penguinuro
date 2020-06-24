import { TasksState } from "./tasks.state";
import { ThemeState } from "./theme.state";
import { UserState } from "./user.state";
import { WaitingState } from "./waiting.state";

export interface AppState {
  user: UserState;
  theme: ThemeState;
  pleaseWait: WaitingState;
  onEditTasks: TasksState;
}
