import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CookiesService } from "../../services/cookies-service/cookies.service";
import { UserService } from "../../services/user-service/user.service";
import { UserStoreService } from "../../store/services/user-store.service/user-store.service";

@Component({
  selector: "app-sign-in-form",
  templateUrl: "./sign-in-form.component.html",
  styleUrls: ["./sign-in-form.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInFormComponent implements OnInit {
  constructor(private userService: UserService,
              private userStore: UserStoreService,
              private cookieService: CookiesService,
              private router: Router) { }

  loginForm = new FormGroup({
    login: new FormControl("", [
      Validators.required,
      Validators.pattern(/\w*[A-Za-z]+\d*/),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    submitButton: new FormControl("Submit"),
  });

  submitForm(): void {
    console.log(this.loginForm.status);
    if (this.loginForm.invalid) { return; }
    const login = this.loginForm.get("login").value;
    const password = this.loginForm.get("password").value;
    this.userService.loginUser(login, password).subscribe(
      data => {
        this.userStore.loginUser(data);
        this.cookieService.saveLogin(data.login);
        this.cookieService.savePassword(data.password);
        this.router.navigate([""]).then();
        },
    );
  }

  ngOnInit(): void {
  }
}
