import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReadingService, Texto } from '../../services/reading';
import { NivelColorPipe } from '../../pipes/nivel-color-pipe';

@Component({
  selector: 'app-textos',
  standalone: true,
  imports: [RouterLink, CommonModule, NivelColorPipe],
  templateUrl: './textos.html',
  styleUrl: './textos.css'
})
export class TextosComponent implements OnInit {

  filtroActivo = 'todos';
  textos: Texto[] = [];
  cargando = true;
  nombreUsuario = 'Usuario';
  inicialesUsuario = 'U';

  constructor(
    private readingService: ReadingService,
    private router: Router
  ) {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const u = JSON.parse(usuarioGuardado);
      this.nombreUsuario = u.nombre || 'Usuario';
      this.inicialesUsuario = this.nombreUsuario.charAt(0).toUpperCase();
    }
  }

  ngOnInit() {
    this.readingService.getTextos().subscribe({
      next: (data) => {
        this.textos = data;
        setTimeout(() => {
          this.cargando = false;
        }, 100);
      },
      error: (err) => {
        console.error('Error cargando textos:', err);
        this.cargando = false;
      }
    });
  }

  get textosFiltrados() {
    if (this.filtroActivo === 'todos') return this.textos;
    return this.textos.filter(t => t.nivel.toLowerCase() === this.filtroActivo.toLowerCase());
  }

  filtrar(nivel: string) {
    this.filtroActivo = nivel;
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}