import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Standalone component
  imports: [RouterModule, CommonModule], // Importez CommonModule ici
})
export class AppComponent {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.clearToken();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
