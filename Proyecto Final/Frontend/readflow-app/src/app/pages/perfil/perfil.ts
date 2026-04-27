import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReadingService } from '../../services/reading';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit {

  stats: any;
  historial: any[] = [];

  logros = [
    { nombre: 'Primer texto', desc: 'Lee tu primer texto', desbloqueado: true },
    { nombre: 'En racha', desc: '5 días seguidos leyendo', desbloqueado: true },
    { nombre: 'Velocista', desc: 'Lee 5 textos en un día', desbloqueado: false },
    { nombre: 'Experto', desc: 'Alcanza 500 puntos', desbloqueado: false },
    { nombre: 'Comprensión total', desc: '100% en 3 quizzes', desbloqueado: false },
    { nombre: 'Constante', desc: '30 días seguidos', desbloqueado: false }
  ];

  constructor(private readingService: ReadingService) {}

  ngOnInit() {
    this.stats = this.readingService.getStats();
    this.historial = this.readingService.getHistorial();
  }
}