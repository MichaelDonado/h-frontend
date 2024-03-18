import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  errorMessage!: string;

  constructor(private router: Router) {}

  login(): void {
    // Verifica las credenciales del usuario (en este caso, credenciales quemadas)
    if (this.username === 'admin' && this.password === 'admin') {
      // Redirecciona al usuario a la página de inicio después del inicio de sesión exitoso
      this.router.navigate(['/products']);
    } else {
      // Muestra un mensaje de error si las credenciales son incorrectas
      this.errorMessage = 'Credenciales incorrectas';
    }
  }
}
