import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Assurez-vous que c'est importé

@Injectable({
  providedIn: 'root', // Fournit le service dans la racine
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api'; // URL du backend

  constructor(private http: HttpClient) {} // Injection de HttpClient

  login(credentials: { username: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  clearToken(): void {
    localStorage.removeItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
