import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';
  cargando = false;

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Por favor completa todos los campos.';
      return;
    }

    if (!this.email.includes('@')) {
      this.error = 'Ingresa un correo electrónico válido.';
      return;
    }

    this.cargando = true;

    this.http.post<any>('http://localhost:3000/api/usuarios/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.router.navigate(['/']);
        this.cargando = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Correo o contraseña incorrectos.';
        this.cargando = false;
      }
    });
  }
}