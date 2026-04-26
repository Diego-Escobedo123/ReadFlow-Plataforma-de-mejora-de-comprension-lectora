import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  texto = {
    titulo: 'El poder de los hábitos',
    tiempo: '5 min',
    nivel: 'Intermedio',
    contenido: [
      'Los hábitos son rutinas automáticas que el cerebro desarrolla para ahorrar energía. Cada vez que repetimos una acción, el cerebro la va registrando hasta convertirla en algo automático, como manejar un auto o lavarse los dientes.',
      'Charles Duhigg, autor de "El poder de los hábitos", explica que todo hábito sigue un ciclo de tres pasos: la señal, la rutina y la recompensa. La señal es el disparador que activa el comportamiento. La rutina es la acción en sí. Y la recompensa es lo que el cerebro obtiene al final.',
      'Lo poderoso de entender este ciclo es que podemos usarlo a nuestro favor. Si queremos crear un nuevo hábito, necesitamos identificar una señal clara, definir una rutina simple y conectarla con una recompensa satisfactoria.',
      'Los pequeños cambios son más efectivos que los grandes. Intentar cambiar todo de golpe suele fracasar porque el cerebro resiste los cambios drásticos. En cambio, modificar apenas un 1% cada día genera resultados extraordinarios con el paso del tiempo.',
      'Recuerda: no son los grandes momentos los que definen quién eres, sino los pequeños hábitos que repites cada día. Empieza pequeño, sé constante y deja que el tiempo haga el resto.'
    ],
    preguntas: [
      {
        pregunta: '¿Cuál es el primer paso del ciclo del hábito según Duhigg?',
        opciones: ['La recompensa', 'La señal', 'La rutina', 'La motivación'],
        correcta: 'La señal'
      },
      {
        pregunta: '¿Por qué los pequeños cambios son más efectivos?',
        opciones: ['Porque son más fáciles de olvidar', 'Porque el cerebro resiste los cambios drásticos', 'Porque no requieren esfuerzo', 'Porque duran menos tiempo'],
        correcta: 'Porque el cerebro resiste los cambios drásticos'
      },
      {
        pregunta: '¿Para qué desarrolla el cerebro hábitos automáticos?',
        opciones: ['Para divertirse', 'Para ahorrar energía', 'Para aprender más rápido', 'Para dormir mejor'],
        correcta: 'Para ahorrar energía'
      }
    ]
  };

  ngOnInit() {
    this.respuestas = new Array(this.texto.preguntas.length).fill('');
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
    this.puntaje = this.texto.preguntas.filter(
      (p, i) => this.respuestas[i] === p.correcta
    ).length;
    this.resultados = true;
  }

  reiniciar() {
    this.terminado = false;
    this.resultados = false;
    this.respuestas = new Array(this.texto.preguntas.length).fill('');
    this.puntaje = 0;
    this.progreso = 0;
    this.segundos = 0;
    this.tiempoTranscurrido = '0:00';
    this.timer = setInterval(() => {
      this.segundos++;
      const m = Math.floor(this.segundos / 60);
      const s = (this.segundos % 60).toString().padStart(2, '0');
      this.tiempoTranscurrido = `${m}:${s}`;
      this.progreso = Math.min(Math.floor(this.segundos / 1.8), 100);
    }, 1000);
  }
}