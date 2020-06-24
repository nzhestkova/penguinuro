import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { messages } from "../../model/messages";
import { Notification } from "../../model/notification";
import { User } from "../../model/user";
import { UserService } from "../../services/user-service/user.service";
import { UserStoreService } from "../../store/services/user-store.service/user-store.service";
import { stringDateTime } from "../special/get-date-time";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private userService: UserService,
              private userStore: UserStoreService,
              private cdr: ChangeDetectorRef) { }
  notificationList: Notification[];
  notificationMessages = messages.notification;
  seenTimer: number;

  dateTime(date: Date): string {
    return stringDateTime(date);
  }

  ngOnInit(): void {
    this.notificationList = [];
    this.userStore.loadUserInfo().subscribe((user) => {
      if (user) {

        // ??? какого черта
        // this.notificationList = user.notifications.filter((item) => item);
        // this.notificationList.reverse();

        this.cdr.markForCheck();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.notificationList.filter((notification) => !notification.checked).length) {
      this.seenTimer = setTimeout(() => {
        this.userStore.markNotificationsAsChecked();
        // this.userService.saveUserInfo().subscribe();
        this.cdr.markForCheck();
      }, 1.5 * 1000);
    }
  }

  ngOnDestroy(): void {
    if (this.seenTimer) { clearTimeout(this.seenTimer); }
  }
}
