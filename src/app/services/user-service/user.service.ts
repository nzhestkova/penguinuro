import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { User } from "../../model/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  usersURL = environment.url + "users/";
  constructor(private _http: HttpClient,
              private _cookie: CookieService) { }

  checkLogin(login: string): Observable<boolean> {
    return this._http.get(this.usersURL + login).pipe(
      map(() => true),
      catchError(err => throwError(err)),
    );
  }

  registerNewUser(user: User): Observable<User> {
    return this._http.post(this.usersURL, user).pipe(
      map((data: User[]) => data[0]),
    );
  }

  loginUser(login: string, password: string): Observable<User> {
    return this._http.get(this.usersURL + login, { params: { password: password } } ).pipe(
      map( (data: User) => data ),
    );
  }
}
