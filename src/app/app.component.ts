import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { User } from "./model/user";
import { CookiesService } from "./services/cookies-service/cookies.service";
import { UserService } from "./services/user-service/user.service";
import { ThemeStoreService } from "./store/services/theme-store.service/theme-store.service";
import { UserStoreService } from "./store/services/user-store.service/user-store.service";
import { WaitingStoreService } from "./store/services/waiting-store.service/waiting-store.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, DoCheck {
  constructor(private userStore: UserStoreService,
              private userService: UserService,
              private cookieService: CookiesService,
              private themeStore: ThemeStoreService,
              private waitingStore: WaitingStoreService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  requestCount: number = 0;
  specialSign: string = environment.versionSign;
  user: User | {};
  showSign: boolean;
  darkThemeEnable: boolean;
  loading: Observable<boolean>;

  logout(): void {
    this.cookieService.deleteCookies();
    this.userStore.logout();
    this.cdr.markForCheck();
  }

  toggleTheme(): void {
    this.themeStore.toggleTheme();

    const now = new Date();
    const cookieLife = new Date(
      now.getFullYear(), now.getMonth(), now.getDate(),
      now.getHours() + 1, now.getMinutes(), now.getSeconds());
    this.cookieService.saveInfo("theme", `${this.darkThemeEnable}`, cookieLife);
  }

  ngOnInit(): void {
    setInterval(() => {
      const subs = this.userService.forCheck().subscribe((data) => {
        if (data) {
          this.requestCount += 1;
          this.cdr.markForCheck();
          subs.unsubscribe();
        }
      });
    }, 300000);

    this.loading = this.waitingStore.loadInfo();
    const savedLogin = this.cookieService.checkInfo("login");
    const savedPassword = this.cookieService.checkInfo("password");
    if (savedLogin && savedPassword) {
      this.waitingStore.activateLoading();
      this.userService.loginUser(savedLogin, savedPassword).subscribe(
        data => {
          this.userStore.loginUser(data);
          this.waitingStore.deactivateLoading();
          // this.router.navigate(["", "profile"]).then();
        },
        () => {
          this.cookieService.deleteCookie("login");
          this.cookieService.deleteCookie("password");
          this.waitingStore.deactivateLoading();
        },
      );
    }
    // if (this.cookieService.checkInfo("theme")) {
    //   if (this.cookieService.checkInfo("theme") === "true") {
    //     console.log(this.cookieService.checkInfo("theme"));
    //     this.themeStore.toggleTheme();
    //   }
    //   return;
    // }
    // const currentHour = new Date().getHours();
    // if ((currentHour >= 20 && currentHour < 24) || (0 <= currentHour && currentHour <= 7)) {
    //   this.themeStore.toggleTheme();
    // }
  }

  ngDoCheck(): void {

    this.themeStore.loadThemeInfo().subscribe(mode => this.darkThemeEnable = mode);

    this.userStore.loadUserInfo().subscribe(
      user => {
        this.user = user;
        this.showSign = !user;
        this.cdr.markForCheck();
      },
    );
  }
}
