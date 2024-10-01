// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private url = 'User';


  
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/Auth/login`, { username, password });
  }

  isLoggedIn(): boolean {
    return true;
  }
  
  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}