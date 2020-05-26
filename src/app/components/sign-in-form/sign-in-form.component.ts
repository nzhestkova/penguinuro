import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { messages } from "../../model/messages";
import { CookiesService } from "../../services/cookies-service/cookies.service";
import { UserService } from "../../services/user-service/user.service";
import { ThemeStoreService } from "../../store/services/theme-store.service/theme-store.service";
import { UserStoreService } from "../../store/services/user-store.service/user-store.service";
import { WaitingStoreService } from "../../store/services/waiting-store.service/waiting-store.service";

@Component({
  selector: "app-sign-in-form",
  templateUrl: "./sign-in-form.component.html",
  styleUrls: ["./sign-in-form.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInFormComponent implements OnInit, DoCheck {
  constructor(private userService: UserService,
              private userStore: UserStoreService,
              private themeStore: ThemeStoreService,
              private waitingStore: WaitingStoreService,
              private cookieService: CookiesService,
              private cdr: ChangeDetectorRef,
              private router: Router) {
  }

  darkThemeEnable: boolean;
  authErrorMessages = messages.authentication;
  authErrors = {
    getError: false,
    loginDoesntExist: false,
    passwordDoesntMatch: false,
  };

  loginForm = new FormGroup({
    login: new FormControl("", [
      Validators.required,
      Validators.pattern(/\w*[A-Za-z]+\d*/),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    submitButton: new FormControl("Войти"),
  });

  resetErrorSigns(): void {
    this.authErrors = {
      getError: false,
      loginDoesntExist: false,
      passwordDoesntMatch: false,
    };
    this.cdr.markForCheck();
  }

  submitForm(): void {
    if (this.loginForm.invalid) { return; }

    this.loginForm.get("submitButton").disable();
    this.loginForm.markAsUntouched();
    this.resetErrorSigns();

    const login = this.loginForm.get("login").value;
    const password = this.loginForm.get("password").value;
    this.waitingStore.activateLoading();
    this.userService.loginUser(login, password).subscribe(
      data => {
        this.userStore.loginUser(data);
        this.cookieService.saveLogin(data.login);
        this.cookieService.savePassword(data.password);
        this.waitingStore.deactivateLoading();
        this.router.navigate(["", "profile"]).then();
      },
      (error) => {
        this.authErrors.getError = true;
        if (error.status === 404) {
          this.authErrors.loginDoesntExist = true;
          this.authErrors.passwordDoesntMatch = false;
        }
        if (error.status === 502) {
          this.authErrors.loginDoesntExist = false;
          this.authErrors.passwordDoesntMatch = true;
        }
        this.waitingStore.deactivateLoading();
        this.cdr.markForCheck();
      },
    );
  }

  ngDoCheck(): void {
    if (this.loginForm.untouched) {
      this.loginForm.get("submitButton").disable();
      return;
    }

    this.loginForm.valid
      ? this.loginForm.get("submitButton").enable()
      : this.loginForm.get("submitButton").disable();
  }

  ngOnInit(): void {
    this.themeStore.loadThemeInfo().subscribe(mode => {
      this.darkThemeEnable = mode;
      this.cdr.markForCheck();
    });
  }
}
