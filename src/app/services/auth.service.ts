// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private url = 'User';
  
  constructor(private http: HttpClient, private router: Router) { }

  public login(user: User): Observable<string> {
    return this.http.post(
      `${environment.apiUrl}/Auth/login`,user,
      {responseType: 'text'});
  }

  public getMe(): Observable<string>{
    return this.http.get(`${environment.apiUrl}/Auth`, {
      responseType: 'text',
    });
  }
  
  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}