import { Injectable } from "@angular/core";
import { UserCard } from "../usercard/usercard.model";
import { HttpClient, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, last, map, of, tap } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class KonectoiService{

    private readonly BASE_URL = "http://localhost:5000"
    public constructor(private readonly http: HttpClient) {}
    private httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'})
    }


    public getAllUsers() : Observable<UserCard[]>{
        return this.http.get<UserCard[]>(this.BASE_URL + "/getAll")
        .pipe(catchError(this.handleError<UserCard[]>("getAll")));
    }

    public signIn(username : String, password : String) : Observable<UserCard>{
        return this.http.post<UserCard>(this.BASE_URL + "/signin", {username, password}, this.httpOptions)
        .pipe(catchError(this.handleError<UserCard>("signin")));
    }

    public signUp(formData : FormGroup) : Observable<any>{
      const data = formData.value;
      return this.http.post<any>(this.BASE_URL + "/signup", data, this.httpOptions);
  }



    private handleError<T>(
        request: string,
        result?: T
      ): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
          return of(result as T);
        };
      }
      
    public connected : boolean = false;

};