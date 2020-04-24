import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class CookiesService {
  constructor(private cookie: CookieService) {}

  saveLogin(login: string): void {
    this.cookie.set("login", login, new Date(2999, 1, 1));
  }

  savePassword(password: string): void {
    this.cookie.set("password", password, new Date(2999, 1, 1));
  }

  checkUser(): string {
    return this.cookie.get("login");
  }

  checkPassword(): string {
    return this.cookie.get("password");
  }

  deleteCookies(): void {
    this.cookie.delete("login");
    this.cookie.delete("password");
  }
}
