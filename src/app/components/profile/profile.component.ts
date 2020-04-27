import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "../../model/user";
import { ThemeStoreService } from "../../store/services/theme-store.service/theme-store.service";
import { UserStoreService } from "../../store/services/user-store.service/user-store.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, DoCheck, OnDestroy {
  constructor(private userStore: UserStoreService,
              private themeStore: ThemeStoreService,
              private router: Router,
              private cdr: ChangeDetectorRef) { }
  userExist: boolean;
  subscriber: Subscription;
  user: User;
  darkTheme: boolean;

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.themeStore.loadThemeInfo().subscribe((theme) => this.darkTheme = theme);
    this.subscriber = this.userStore.loadUserInfo().subscribe(
      (user) => {
        this.userExist = !!Object.keys(user).length;
        this.user = <User>user;
        this.cdr.markForCheck();
      },
    );
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
