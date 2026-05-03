import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReadingService } from '../../services/reading';

@Component({
  selector: 'app-leer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './leer.html',
  styleUrl: './leer.css'
})
export class LeerComponent implements OnInit, OnDestroy {

  progreso = 0;
  terminado = false;
  resultados = false;
  respuestas: string[] = [];
  puntaje = 0;
  tiempoTranscurrido = '0:00';
  segundos = 0;
  timer: any;
  texto: any = null;
  preguntas: any[] = [];
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private readingService: ReadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.readingService.getTextoPorId(id).subscribe({
      next: (data) => {
        this.texto = data;
        this.readingService.getPreguntasPorTexto(id).subscribe({
          next: (preguntas) => {
            this.preguntas = preguntas;
            this.respuestas = new Array(this.preguntas.length).fill('');
            this.cargando = false;
            this.cdr.detectChanges();
            this.iniciarTimer();
          },
          error: (err) => {
            console.error('Error preguntas:', err);
            this.cargando = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: (err) => {
        console.error('Error texto:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  iniciarTimer() {
    this.timer = setInterval(() => {
      this.segundos++;
      const m = Math.floor(this.segundos / 60);
      const s = (this.segundos % 60).toString().padStart(2, '0');
      this.tiempoTranscurrido = `${m}:${s}`;
      if (!this.terminado) {
        this.progreso = Math.min(Math.floor(this.segundos / 1.8), 100);
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  terminar() {
    this.terminado = true;
    this.progreso = 100;
    clearInterval(this.timer);
  }

  responder(index: number, opcion: string) {
    this.respuestas[index] = opcion;
  }

  todasRespondidas() {
    return this.respuestas.every(r => r !== '');
  }

  verificar() {
    this.puntaje = this.preguntas.filter(
      (p, i) => this.respuestas[i] === p.correcta
    ).length;
    this.resultados = true;
  }

  reiniciar() {
    this.terminado = false;
    this.resultados = false;
    this.respuestas = new Array(this.preguntas.length).fill('');
    this.puntaje = 0;
    this.progreso = 0;
    this.segundos = 0;
    this.tiempoTranscurrido = '0:00';
    this.iniciarTimer();
  }
}