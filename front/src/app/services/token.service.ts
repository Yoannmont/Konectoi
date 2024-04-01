import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router : Router) { }

  getToken() : string | null {
    return localStorage.getItem("token");
  }

  saveToken(token : string) : void {
    try
    {localStorage.setItem('token', token);
    this.router.navigateByUrl('/usercards');}
    catch(error){
      console.error(error);
    }
  }

  isLogged() : boolean{
    try{
      const token = localStorage.getItem("token")
      return !! token;
    }
    catch(error){
      console.error(error);
      return false;
    }
  }

  clearToken() : void{
    try {
      localStorage.removeItem("token");
      this.router.navigateByUrl("/login");
    }
    catch(error){
      console.error(error);
    }
  }

  isTokenValid(token : string) : boolean{
    let decodedToken : any = jwtDecode(token);
    const expirationTS = Math.round(new Date(decodedToken.expires_at).getTime());
    const isValid = decodedToken && (expirationTS > Date.now());
    return isValid;
  }

  _getInfoFromToken(token : string | null) : any {
    if (token === null){
      return null;
    }
    let decodedToken : any = jwtDecode(token);
    return decodedToken
  }

  getInfoFromCurrentToken() : any{
    const token = this.getToken();
    return this._getInfoFromToken(token);
  }
}
