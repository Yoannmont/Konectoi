import { Injectable } from "@angular/core";
import { UserCard } from "../usercard/usercard.model";
import { HttpClient, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, last, map, of, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class KonectoiService{

    private readonly BASE_URL = "http://localhost:5000"
    public constructor(private readonly http: HttpClient) {}
    private httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
      })
    }
    

    public getAllUsers() : Observable<UserCard[]>{
        return this.http.get<UserCard[]>(this.BASE_URL + "/users")
        .pipe(catchError(this.handleError<UserCard[]>("getUsers")));
    }

    public signIn(username : String, password : String) : Observable<number>{
        return this.http.post<number>(this.BASE_URL + "/signin", {username, password})
        .pipe(catchError(this.handleError<number>("signIn")));
    }

    public signUp(object : any) : Observable<number>{
      return this.http.post<any>(this.BASE_URL + "/signup", object, this.httpOptions)
      .pipe(catchError(this.handleError<number>("signUp")));
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