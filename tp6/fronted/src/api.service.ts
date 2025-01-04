import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:3000/api'; // URL du backend

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`);
  }

  createClient(client: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, client);
  }

  updateClient(id: number, client: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/login${id}`, client);
  }
}
