import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Student, Teacher, User } from "../../model/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  usersURL = environment.url + "users";
  constructor(private _http: HttpClient) {}

  onlyStudents(): Observable<Student[] | Teacher[]> {
    return this._http.get(`${this.usersURL}/students`).pipe(
      map((students: Student[] | Teacher[]) => students),
    );
  }

  userInfo(userID: number): Observable<object> {
    return this._http.get(`${this.usersURL}/results/${userID}`).pipe(
      map((userInfo) => userInfo),
    );
  }

  saveUserInfo(user: Student| Teacher): Observable<Student | Teacher> {
    return this._http.put(`${this.usersURL}/${user._id}`, user).pipe(
      map((userUpdated: Student| Teacher) => userUpdated),
      catchError((err) => throwError(err)),
    );
  }

  forCheck(): Observable<boolean> {
    return this._http.get(`${this.usersURL}/natalia`).pipe(
      map(() => true),
      catchError((err) => throwError(err)),
    );
  }

  checkLogin(login: string): Observable<boolean> {
    return this._http.get(`${this.usersURL}/${login}`).pipe(
      map(() => true),
      catchError(err => throwError(err)),
    );
  }

  registerNewUser(user: object, login: string, pswHS: string): Observable<Student|Teacher> {
    return this._http.post(this.usersURL, {
      userInfo: user,
      login: login,
      pswHS: pswHS
    }).pipe(
      map((respondedUser: object) => respondedUser["type"] === "student"
        ? new Student(respondedUser["_id"], respondedUser["username"], respondedUser["since"],
          respondedUser["tasks"], respondedUser["results"])
        : new Teacher(respondedUser["_id"], respondedUser["username"], respondedUser["type"],
          respondedUser["since"], respondedUser["tasks"], respondedUser["results"])),
    );
  }

  loginUser(login: string, password: string): Observable<Student|Teacher> {
    return this._http.get(this.usersURL, {
      params: {
        login: login,
        pswHS: password
      }} ).pipe(
      map( (respondedUser: object) => respondedUser["type"] === "student"
        ? new Student(respondedUser["_id"], respondedUser["username"], respondedUser["since"],
          respondedUser["tasks"], respondedUser["results"])
        : new Teacher(respondedUser["_id"], respondedUser["username"], respondedUser["type"],
          respondedUser["since"], respondedUser["tasks"], respondedUser["results"])),
    );
  }

  refreshInfo(userID: number): Observable<Student | Teacher> {
    return this._http.get(`${this.usersURL}/${userID}`).pipe(
      map((respondedUser: object) => respondedUser["type"] === "student"
        ? new Student(respondedUser["_id"], respondedUser["username"], respondedUser["since"],
          respondedUser["tasks"], respondedUser["results"])
        : new Teacher(respondedUser["_id"], respondedUser["username"], respondedUser["type"],
          respondedUser["since"], respondedUser["tasks"], respondedUser["results"])));
  }

  deleteAccount(userID: number): Observable<User> {
    return this._http.delete(`${this.usersURL}/${userID}`).pipe(
      map((data: User) => data),
    );
  }
}
