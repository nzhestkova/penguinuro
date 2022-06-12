import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { messages } from "../../common/models/messages";
import { Student, Teacher, User } from "../../common/models/user";
import { CookiesService } from "../../services/cookies-service/cookies.service";
import { UserService } from "../../services/user-service/user.service";
import { ThemeStoreService } from "../../store/services/theme-store.service/theme-store.service";
import { UserStoreService } from "../../store/services/user-store.service/user-store.service";
import { registerDate, strictDateTime, stringDateTime } from "../special/get-date-time";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, DoCheck, OnDestroy {
  constructor(private userService: UserService,
              private cookieService: CookiesService,
              private userStore: UserStoreService,
              private themeStore: ThemeStoreService,
              private router: Router,
              private cdr: ChangeDetectorRef) { }
  userExist: boolean;
  unreadNotification: number;
  subscriber: Subscription;
  user: Student | Teacher;
  darkTheme: boolean;

  askConfirm: boolean;
  confirmMessages = messages.confirmation;

  since(): string {
    return registerDate(new Date(this.user.registerSince));
  }

  logout(): void {
    this.userStore.logout();
    this.cookieService.deleteCookies();
    this.router.navigate([""]).then();
  }

  showPopup(): void {
    this.askConfirm = true;
  }

  hidePopup(): void {
    this.askConfirm = false;
  }

  deleteUser(value: boolean): void {
    if (!value) {
      this.hidePopup();
      return;
    }

    this.userService.deleteAccount(this.user._id).subscribe(
      (answer) => {
        if (answer) {
          this.userStore.logout();
          this.router.navigate([""]).then();
        }
      },
    );
  }

  ngOnInit(): void {
    this.askConfirm = false;
  }

  ngDoCheck(): void {
    this.themeStore.loadThemeInfo().subscribe((theme) => this.darkTheme = theme);
    this.subscriber = this.userStore.loadUserInfo().subscribe(
      (user) => {
        this.userExist = !!user;
        this.user = user;
        console.log(user);

        // let count: number = 0;
        // if (user && this.user.notifications) {
        //   this.user.notifications.forEach((item) => {
        //     if (!item.checked) { count += 1; }
        //   });
        //   this.unreadNotification = count;
        // }

        this.cdr.markForCheck();
      },
    );
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
