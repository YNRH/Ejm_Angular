import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4000/api/auth';
  loggedIn: boolean = false; 

  constructor(private http: HttpClient, private cookieService:CookieService) { }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  
  login(userData: any) {
    return this.http.post(`${this.apiUrl}/login`, userData);
    
  }

  logout() {
    localStorage.removeItem('token'); 
    this.loggedIn = false; 
  }
  
}

