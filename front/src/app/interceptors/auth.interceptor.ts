
import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "../services/token.service";


export const TokenInterceptor : HttpInterceptorFn = (req, next) => {
    let router = inject(Router);
    let tokenService = inject(TokenService)


    const token = tokenService.getToken();
    if (token !== null){
      let newReq = req.clone({
        headers : req.headers.set('Authorization', 'Bearer ' + token)
      })
      return next(newReq).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {      
              console.error('Unauthorized request:', err);
              tokenService.clearToken();
            } else {
              console.error('HTTP error:', err);
            }
          } else {
            console.error('An error occurred:', err);
          }
          return throwError(() => err); 
        })
      );
    }
    return next(req).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {      
            console.error('Unauthorized request:', err);
          } else {
            console.error('HTTP error:', err);
          }
        } else {
          console.error('An error occurred:', err);
        }
        return throwError(() => err); 
      })
    );
  };
