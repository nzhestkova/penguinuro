import { Material } from "./material";
import { Notification } from "./notification";

export class User {
  _id: number;
  status: string;
  login: string;
  username: string;
  password: string;
  education: {
    materials: Material[];
    createdTasks: number[];
    assignedTasks: number[];
  };
  results: {
    taskID: number;
    point: number;
    attempt: number;
    timeSpend: number;
  }[];
  notifications: Notification[];
}

export class UserInfo {
  _id: number;
  status: string;
  username: string;
}
