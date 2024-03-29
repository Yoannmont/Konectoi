import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = 'tokenTest';
  
  getToken(): string {
    return this.token;
  }
}