import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReadingService, Texto } from '../../services/reading';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {

  busqueda = '';
  resultados: Texto[] = [];
  mostrarResultados = false;
  nombreUsuario = 'Usuario';
  inicialesUsuario = 'U';
  tieneSesion = false;

  textos = [
    { titulo: 'El poder de los hábitos', desc: 'Cómo los pequeños cambios generan grandes transformaciones.', badge: 'Recomendado', tiempo: '5 min', nivel: 'Intermedio', color: 'linear-gradient(135deg, #4f1580, #1a3a8f)' },
    { titulo: 'Ciencia del aprendizaje', desc: 'Las técnicas que usan los mejores estudiantes del mundo.', badge: 'Popular', tiempo: '7 min', nivel: 'Avanzado', color: 'linear-gradient(135deg, #0f4c8a, #0d7377)' },
    { titulo: 'Mindfulness y concentración', desc: 'Técnicas para mantener el foco durante la lectura.', badge: 'Nuevo', tiempo: '4 min', nivel: 'Básico', color: 'linear-gradient(135deg, #7c3aed, #db2877)' },
    { titulo: 'Inteligencia emocional', desc: 'Comprende y gestiona tus emociones para mejores decisiones.', badge: 'Clásico', tiempo: '6 min', nivel: 'Intermedio', color: 'linear-gradient(135deg, #065f46, #1e40af)' }
  ];

  textos2 = [
    { titulo: 'Productividad extrema', desc: 'Métodos probados para hacer más en menos tiempo.', badge: 'Trending', tiempo: '8 min', nivel: 'Avanzado', color: 'linear-gradient(135deg, #92400e, #7c3aed)' },
    { titulo: 'Neuroplasticidad', desc: 'Cómo el cerebro cambia con el aprendizaje constante.', badge: 'Ciencia', tiempo: '9 min', nivel: 'Avanzado', color: 'linear-gradient(135deg, #1e3a5f, #0d7377)' },
    { titulo: 'El método Pomodoro', desc: 'Usa intervalos de tiempo para maximizar tu concentración.', badge: 'Enfoque', tiempo: '5 min', nivel: 'Básico', color: 'linear-gradient(135deg, #7c3aed, #1e40af)' },
    { titulo: 'Por qué leer ficción', desc: 'La ficción desarrolla empatía, creatividad y comprensión.', badge: 'Literatura', tiempo: '6 min', nivel: 'Intermedio', color: 'linear-gradient(135deg, #065f46, #db2877)' }
  ];

  constructor(
    private readingService: ReadingService,
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');
    this.tieneSesion = !!token;
    if (usuarioGuardado) {
      const u = JSON.parse(usuarioGuardado);
      this.nombreUsuario = u.nombre || 'Usuario';
      this.inicialesUsuario = this.nombreUsuario.charAt(0).toUpperCase();
    }
  }

  ngOnInit() {
    this.readingService.getTextos().subscribe({
      next: (data) => {
        this.resultados = data;
      }
    });
  }

  buscar() {
    if (this.busqueda.trim() === '') {
      this.mostrarResultados = false;
      return;
    }
    this.readingService.getTextos().subscribe({
      next: (data) => {
        this.resultados = data.filter(t =>
          t.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          t.desc.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          t.nivel.toLowerCase().includes(this.busqueda.toLowerCase())
        );
        this.mostrarResultados = true;
      }
    });
  }

  irALeer(id: string) {
    if (!this.tieneSesion) {
      this.router.navigate(['/login']);
      return;
    }
    this.mostrarResultados = false;
    this.busqueda = '';
    this.router.navigate(['/leer', id]);
  }

  cerrarResultados() {
    this.mostrarResultados = false;
    this.busqueda = '';
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.tieneSesion = false;
    this.router.navigate(['/login']);
  }
}