import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class MaterialService {
  url = environment.url + "materials/";
  constructor(private _http: HttpClient) { }

  upload(userID: number, body: FormData): Observable<boolean> {
    return this._http.post(this.url + `${userID}`, body).pipe(
      map(() => true),
      catchError((err) => throwError(err)));
  }
}
