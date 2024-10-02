// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated() {
    throw new Error('Method not implemented.');
  }

  //private url = 'User';
  
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/Auth/login`, { username, password });
  }
  
  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}