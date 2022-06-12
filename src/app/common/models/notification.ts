import { messages } from "./messages";

export class Notification {
  notificationID: number;
  checked: boolean;
  message: string;
  owner: string;
  datetime: Date;
  lifetime: number;
  constructor(message: string, owner: string,
              lifetime: number) {
    this.message = message;
    this.owner = owner;
    this.datetime = new Date();
    this.lifetime = lifetime;
    this.checked = false;
  }

  markAsChecked(): void {
    this.checked = true;
  }
}

export const welcomeNotification: Notification = new Notification(messages.welcomeMessage, "welcome", 60 * 60 * 1000);

