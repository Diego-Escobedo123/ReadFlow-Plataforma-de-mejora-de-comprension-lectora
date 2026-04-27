import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent {

  stats = {
    textosLeidos: 3,
    minutosLeidos: 42,
    puntosTotal: 150,
    racha: 5
  };

  historial = [
    {
      titulo: 'El poder de los hábitos',
      tiempo: '5 min',
      fecha: '26 Apr 2026',
      progreso: 100,
      color: 'linear-gradient(135deg, #4f1580, #1a3a8f)'
    },
    {
      titulo: 'Mindfulness y concentración',
      tiempo: '4 min',
      fecha: '25 Apr 2026',
      progreso: 100,
      color: 'linear-gradient(135deg, #7c3aed, #db2777)'
    },
    {
      titulo: 'Ciencia del aprendizaje',
      tiempo: '7 min',
      fecha: '24 Apr 2026',
      progreso: 60,
      color: 'linear-gradient(135deg, #0f4c8a, #0d7377)'
    }
  ];

  logros = [
    { nombre: 'Primer texto', desc: 'Lee tu primer texto', desbloqueado: true },
    { nombre: 'En racha', desc: '5 días seguidos leyendo', desbloqueado: true },
    { nombre: 'Velocista', desc: 'Lee 5 textos en un día', desbloqueado: false },
    { nombre: 'Experto', desc: 'Alcanza 500 puntos', desbloqueado: false },
    { nombre: 'Comprensión total', desc: '100% en 3 quizzes', desbloqueado: false },
    { nombre: 'Constante', desc: '30 días seguidos', desbloqueado: false }
  ];
}