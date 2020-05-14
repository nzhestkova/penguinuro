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
    tasks: any[]
  };
  notifications: Notification[];
}
