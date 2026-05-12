import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {

  nombre = '';
  email = '';
  password = '';
  confirmar = '';
  error = '';
  exito = '';
  cargando = false;

  constructor(private router: Router, private http: HttpClient) {}

  registrar() {
    this.error = '';
    this.exito = '';

    if (!this.nombre || !this.email || !this.password || !this.confirmar) {
      this.error = 'Por favor completa todos los campos.';
      return;
    }

    if (!this.email.includes('@')) {
      this.error = 'Ingresa un correo electrónico válido.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (this.password !== this.confirmar) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    this.cargando = true;

    this.http.post<any>('https://readflow-plataforma-de-mejora-de.onrender.com/api/usuarios/registro', {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.exito = '¡Cuenta creada exitosamente! Redirigiendo...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
        this.cargando = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al crear la cuenta.';
        this.cargando = false;
      }
    });
  }
}