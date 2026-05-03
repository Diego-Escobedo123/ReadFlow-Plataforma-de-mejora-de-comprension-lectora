import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';
  cargando = false;

  // Credenciales simuladas
  private usuarios = [
    { email: 'diego@readflow.com', password: 'readflow123', nombre: 'Diego' }
  ];

  constructor(private router: Router) {}

  login() {
    this.error = '';
    this.cargando = true;

    setTimeout(() => {
      const usuario = this.usuarios.find(
        u => u.email === this.email && u.password === this.password
      );

      if (usuario) {
        // Guardar token simulado en localStorage
        const token = btoa(`${usuario.email}:${Date.now()}`);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.router.navigate(['/']);
      } else {
        this.error = 'Correo o contraseña incorrectos.';
      }

      this.cargando = false;
    }, 1000);
  }
}