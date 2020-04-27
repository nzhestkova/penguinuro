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

  saveInfo(cookieName: string, value: string, timeout?: Date): void {
    this.cookie.set(cookieName, value, timeout ? timeout : new Date(2999, 1, 1));
  }

  checkInfo(cookieName: string): string {
    return this.cookie.get(cookieName);
  }
  deleteCookies(): void {
    this.cookie.delete("login");
    this.cookie.delete("password");
  }
  deleteCookie(cookieName: string): void {
    this.cookie.delete(cookieName);
  }
}
