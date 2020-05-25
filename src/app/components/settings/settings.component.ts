import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { passwordMatch } from "../../custom-validators/password-match.validator";
import { UserService } from "../../services/user-service/user.service";
import { UserStoreService } from "../../store/services/user-store.service/user-store.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.less"]
})
export class SettingsComponent implements OnInit {
  constructor(private userService: UserService,
              private userStore: UserStoreService) { }

  settingsForm = new FormGroup({
    passwordChange: new FormGroup({
      oldPassword: new FormControl("", [
        Validators.required,
      ]),
      newPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      newPasswordConfirm: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      submit: new FormControl("Сохранить"),
      cancel: new FormControl("Отменить")
    }, passwordMatch("newPassword", "newPasswordConfirm"))
  });

  ngOnInit(): void {
  }

}
