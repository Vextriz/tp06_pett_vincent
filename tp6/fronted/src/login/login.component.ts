import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../app/auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Déclaré standalone
  imports: [FormsModule], // Ajouter FormsModule ici
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe(
      (response: any) => {
        if (response?.token) {
          this.authService.saveToken(response.token);
          this.router.navigate(['/products']);
        } else {
          alert('No token received!');
        }
      },
      (error) => {
        alert('Login failed!');
      }
    );
  }
}
