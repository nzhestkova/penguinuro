import { Material } from "./material";
import { Notification } from "./notification";

export interface User {
  id: number;
  status: string;
  username: string;
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

export class Student {
  type: string;
  _id: number;
  registerSince: string;
  username: string;
  createdTasks?: number[];
  assignedTasks: number[];
  results: Result[];

  constructor(idNumber: number, username: string, since: string,
              assignedTasksIDS: number[], results: Result[]) {
    this._id = idNumber;
    this.type = "student";
    this.username = username;
    this.registerSince = since;
    this.assignedTasks = assignedTasksIDS.filter((task) => task);
    this.results = results.filter((result) => result);
  }
}

export class Teacher {
  type: string;
  _id: number;
  registerSince: string;
  username: string;
  createdTasks: number[];
  assignedTasks?: number[];
  results: Result[];

  constructor(idNumber: number, username: string, type: string, since: string,
              createdTasksIDS: number[], results: Result[]) {
    this._id = idNumber;
    this.username = username;
    this.type = type;
    this.registerSince = since;
    this.createdTasks = createdTasksIDS.filter((task) => task);
    this.results = results.filter((result) => result);
  }
}

export class Result {
  taskID: number;
  point: number;
  attempt: number;
  timeSpend: number;
}

export class UserInfo {
  _id: number;
  status: string;
  username: string;
}
