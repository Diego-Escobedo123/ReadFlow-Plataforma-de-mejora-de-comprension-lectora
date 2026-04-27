import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NivelColorPipe } from '../../pipes/nivel-color-pipe';

@Component({
  selector: 'app-textos',
  standalone: true,
  imports: [RouterLink, CommonModule, NivelColorPipe],
  templateUrl: './textos.html',
  styleUrl: './textos.css'
})
export class TextosComponent {

  filtroActivo = 'todos';

  textos = [
    { titulo: 'El poder de los hábitos', desc: 'Cómo los pequeños cambios generan grandes transformaciones en tu vida.', badge: '⭐ Recomendado', tiempo: '5 min', nivel: 'Intermedio', color: 'linear-gradient(135deg, #4f1580, #1a3a8f)' },
    { titulo: 'Ciencia del aprendizaje', desc: 'Las técnicas que usan los mejores estudiantes del mundo para aprender más.', badge: '🔥 Popular', tiempo: '7 min', nivel: 'Avanzado', color: 'linear-gradient(135deg, #0f4c8a, #0d7377)' },
    { titulo: 'Mindfulness y concentración', desc: 'Técnicas para mantener el foco durante tus sesiones de lectura diaria.', badge: '✨ Nuevo', tiempo: '4 min', nivel: 'Básico', color: 'linear-gradient(135deg, #7c3aed, #db2777)' },
    { titulo: 'Inteligencia emocional', desc: 'Comprende y gestiona tus emociones para tomar mejores decisiones.', badge: '📚 Clásico', tiempo: '6 min', nivel: 'Intermedio', color: 'linear-gradient(135deg, #065f46, #1e40af)' },
    { titulo: 'Productividad extrema', desc: 'Métodos probados para hacer más en menos tiempo sin perder calidad.', badge: '🚀 Trending', tiempo: '8 min', nivel: 'Avanzado', color: 'linear-gradient(135deg, #92400e, #7c3aed)' },
    { titulo: 'Neuroplasticidad', desc: 'Cómo el cerebro cambia con el aprendizaje constante y por qué importa.', badge: '🧠 Ciencia', tiempo: '9 min', nivel: 'Avanzado', color: 'linear-gradient(135deg, #1e3a5f, #0d7377)' },
    { titulo: 'El método Pomodoro', desc: 'Usa intervalos de tiempo para maximizar tu concentración y evitar el agotamiento.', badge: '🎯 Enfoque', tiempo: '5 min', nivel: 'Básico', color: 'linear-gradient(135deg, #7c3aed, #1e40af)' },
    { titulo: 'Por qué leer ficción', desc: 'La ficción desarrolla empatía, creatividad y comprensión del mundo.', badge: '📖 Literatura', tiempo: '6 min', nivel: 'Intermedio', color: 'linear-gradient(135deg, #065f46, #db2777)' },
    { titulo: 'Hábitos atómicos', desc: 'Pequeños cambios que generan resultados extraordinarios con el tiempo.', badge: '💡 Esencial', tiempo: '10 min', nivel: 'Básico', color: 'linear-gradient(135deg, #1e3a5f, #7c3aed)' },
  ];

  get textosFiltrados() {
    if (this.filtroActivo === 'todos') return this.textos;
    return this.textos.filter(t => t.nivel.toLowerCase() === this.filtroActivo);
  }

  filtrar(nivel: string) {
    this.filtroActivo = nivel;
  }
}