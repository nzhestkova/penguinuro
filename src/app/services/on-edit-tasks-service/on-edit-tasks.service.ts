import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Test } from "../../model/test";

@Injectable({
  providedIn: "root"
})
export class OnEditTasksService {
  tasksURL = environment.url + "tasks/";
  constructor(private _http: HttpClient) { }

  saveTest(body: Test): Observable<number> {
    return this._http.post(this.tasksURL, body).pipe(
      map((response: { _id: string }) => +response._id),
      catchError((err) => throwError(err)),
    );
  }

  updateTest(body: Test): Observable<boolean> {
    return this._http.put(`${this.tasksURL}${body._id}`, body).pipe(
      map((response) => {
        return true; }),
    );
  }

  loadTask(id: number): Observable<Test> {
    return this._http.get(this.tasksURL + `${id}`).pipe(
      map((task: Test) => task),
    );
  }
}
