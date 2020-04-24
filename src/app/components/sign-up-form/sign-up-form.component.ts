import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { messages } from "../../model/messages";
import { CookiesService } from "../../services/cookies-service/cookies.service";
import { UserService } from "../../services/user-service/user.service";
import { ThemeStoreService } from "../../store/services/theme-store.service/theme-store.service";
import { UserStoreService } from "../../store/services/user-store.service/user-store.service";

@Component({
  selector: "app-sign-up-form",
  templateUrl: "./sign-up-form.component.html",
  styleUrls: ["./sign-up-form.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpFormComponent implements OnInit {
  constructor(private userService: UserService,
              private cookieService: CookiesService,
              private userStore: UserStoreService,
              private themeStore: ThemeStoreService,
              private cdr: ChangeDetectorRef,
              private router: Router) {
  }
  invalidError = messages.validation;
  darkThemeEnable: boolean;

  registerForm = new FormGroup({
    login: new FormControl("", [
      Validators.required,
      Validators.pattern(/\w*[A-Za-z]+\d*/),
    ]),
    username: new FormControl("", [
      Validators.required,
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
    submitButton: new FormControl("Submit"),
  });

  submitForm(): void {
    console.log(this.registerForm.status);
    if (this.registerForm.get("password").value !== this.registerForm.get("passwordAgain").value) {
      return;
    }
    if (this.registerForm.invalid) { return; }
    const newUser = {
      _id: 0,
      teacher: false,
      login: this.registerForm.get("login").value,
      username: this.registerForm.get("username").value,
      password: this.registerForm.get("password").value
    };
    this.userService.registerNewUser(newUser).subscribe(data => {
      this.cookieService.saveLogin(data.login);
      this.cookieService.savePassword(data.password);
      this.userStore.loginUser(data);
      this.router.navigate([""]).then();
    });
  }

  checkLogin(): void {
    this.userService.checkLogin(this.registerForm.get("login").value).subscribe(
      () => console.log("login exist"),
      () => console.log("login doesn't exist"),
    );
  }

  ngOnInit(): void {
    this.themeStore.loadThemeInfo().subscribe(mode => {
      this.darkThemeEnable = mode;
      this.cdr.markForCheck();
    });
  }
}

// "\f06e"
