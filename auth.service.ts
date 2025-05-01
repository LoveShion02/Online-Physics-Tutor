import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  Url = 'http://localhost:3000/api/auth';

  register(item: any) {
    return this.httpClient.post(`${this.Url}/register`, item);
  } //Inputs first time user data

  login(item: any) {
    return this.httpClient.post(`${this.Url}/login`, item)
      .pipe(tap((result) => {
        localStorage.setItem('authUser', JSON.stringify(result));
      }),
      catchError(error => {
        console.log(error);
        return throwError(() => error);
      })
    );
  } //Validates registered user information


  logout() {
    localStorage.removeItem('authUser');
  } 

  LogCheck() {
    return localStorage.getItem('authUser') !== null;
  } //Checks if user is logged in

  constructor() { }
}
