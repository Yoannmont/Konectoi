import { Injectable } from '@angular/core';
import { KonectoiService } from './konectoi.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { UserCard } from '../usercard/usercard.model';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'})
  }
  private readonly BASE_URL = "http://localhost:5000";

  constructor(private konectoiService : KonectoiService, private router : Router,  private readonly http : HttpClient, private tokenService : TokenService){}

  
  isAuthenticated() : Boolean {
    const token = localStorage.getItem('token');
    const isExpired = true;
    if (token) {
     try{
      const isExpired = !this.tokenService.isTokenValid(token)
      if (isExpired){
        this.tokenService.clearToken();
      }}
      catch(e){
        console.log("invalid token");
      }
    } else {
    }
    return !isExpired;
  }

  public signIn(username : String, password : String) : Observable<UserCard>{
    return this.http.post<any>(this.BASE_URL + "/signin", {username, password}, this.httpOptions)
    .pipe(
      catchError(this.handleError<UserCard>("signin"),
      ));
  }
  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }

}