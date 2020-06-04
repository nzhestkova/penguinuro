import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { User } from "../../model/user";
import { UserStoreService } from "../../store/services/user-store.service/user-store.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  usersURL = environment.url + "users/";
  userInfo: User;
  constructor(private _http: HttpClient,
              private userStore: UserStoreService) {
    this.userStore.loadUserInfo().subscribe((user) => {
      this.userInfo = user;
    });
  }

  saveUserInfo(): Observable<boolean> {
    return this._http.put(this.usersURL + `${this.userInfo._id}`, this.userInfo).pipe(
      map(() => true),
      catchError((err) => throwError(err)),
    );
  }

  forCheck(): Observable<boolean> {
    return this._http.get(this.usersURL + `natalia`).pipe(
      map(() => true),
      catchError((err) => throwError(err)),
    );
  }

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

  deleteAccount(userID: number): Observable<User> {
    return this._http.delete(this.usersURL + `${userID}`).pipe(
      map((data: User) => data),
    );
  }
}
