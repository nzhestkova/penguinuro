import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { passwordMatch } from "../../custom-validators/password-match.validator";
import { messages } from "../../model/messages";
import { welcomeNotification } from "../../model/notification";
import { User } from "../../model/user";
import { CookiesService } from "../../services/cookies-service/cookies.service";
import { UserService } from "../../services/user-service/user.service";
import { ThemeStoreService } from "../../store/services/theme-store.service/theme-store.service";
import { UserStoreService } from "../../store/services/user-store.service/user-store.service";
import { WaitingStoreService } from "../../store/services/waiting-store.service/waiting-store.service";

@Component({
  selector: "app-sign-up-form",
  templateUrl: "./sign-up-form.component.html",
  styleUrls: ["./sign-up-form.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpFormComponent implements OnInit, DoCheck {
  constructor(private userService: UserService,
              private cookieService: CookiesService,
              private userStore: UserStoreService,
              private themeStore: ThemeStoreService,
              private waitingStore: WaitingStoreService,
              private cdr: ChangeDetectorRef,
              private router: Router) {
  }
  invalidError = messages.validation;
  darkThemeEnable: boolean;

  loginCheckStatus = {
    pending: false,
    exist: false,
    free: false,
  };
  registerForm = new FormGroup({
    login: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^\w*[A-Za-z]+[_]*\d*$/),
    ]),
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-Zа-яА-Я\s]+$/),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    passwordAgain: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    submitButton: new FormControl("Зарегистрироваться"),
  }, passwordMatch("password", "passwordAgain"));

  submitForm(): void {
    this.registerForm.get("submitButton").disable();
    this.registerForm.markAsUntouched();
    if (this.registerForm.invalid) { return; }
    const newUser: User = {
      _id: 0,
      status: "student",
      login: this.registerForm.get("login").value,
      username: this.registerForm.get("username").value,
      password: this.registerForm.get("password").value,
      education: {
        materials: [],
        createdTasks: [],
        assignedTasks: [],
      },
      notifications: [welcomeNotification],
    };
    this.waitingStore.activateLoading();
    this.userService.registerNewUser(newUser).subscribe(data => {
      this.cookieService.saveLogin(data.login);
      this.cookieService.savePassword(data.password);
      this.userStore.loginUser(data);
      this.waitingStore.deactivateLoading();
      this.router.navigate(["", "profile"]).then();
    },
      () => this.waitingStore.deactivateLoading(),
    );
  }

  controlStatus(control: AbstractControl, name: string): string {
    if (control.hasError("required")) {
      return "requireError";
    }
    if (control.hasError("pattern")) {
      return "patternError";
    }
    if (control.hasError("minlength")) {
      return name + "MinLengthError";
    }
    return "";
  }

  showLoading(): void {
    this.loginCheckStatus.pending = true;
    this.loginCheckStatus.exist = false;
    this.loginCheckStatus.free = false;
    this.cdr.markForCheck();
  }

  resetLoadSigns(): void {
    this.loginCheckStatus.pending = false;
    this.loginCheckStatus.exist = false;
    this.loginCheckStatus.free = false;
    this.cdr.markForCheck();
  }

  checkLogin(): void {
    if (this.registerForm.get("login").invalid) {
      return;
    }
    this.showLoading();
    this.userService.checkLogin(this.registerForm.get("login").value).subscribe(
      () => {
        {
          this.loginCheckStatus.pending = false;
          this.loginCheckStatus.exist = true;
          this.loginCheckStatus.free = false;
          this.cdr.markForCheck();
        }
      },
      () => {
        this.loginCheckStatus.pending = false;
        this.loginCheckStatus.exist = false;
        this.loginCheckStatus.free = true;
        this.cdr.markForCheck();
      },
    );
  }

  ngDoCheck(): void {
    if (this.registerForm.untouched) {
      this.registerForm.get("submitButton").disable();
      return;
    }
    this.registerForm.valid && this.loginCheckStatus.free
      ? this.registerForm.get("submitButton").enable()
      : this.registerForm.get("submitButton").disable();
  }

  ngOnInit(): void {
    this.themeStore.loadThemeInfo().subscribe(mode => {
      this.darkThemeEnable = mode;
      this.cdr.markForCheck();
    });
  }
}

// "\f06e"
