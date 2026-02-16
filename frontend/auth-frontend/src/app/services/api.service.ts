import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:8080/api/auth';

  //Register
  register(name: string, phone: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, { name, phone, email, password });
  }

  //Login
  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  //Home
  home(token: string) {
    return this.http.get(`${this.baseUrl}/home`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      responseType:'text'
    });
  }

}
