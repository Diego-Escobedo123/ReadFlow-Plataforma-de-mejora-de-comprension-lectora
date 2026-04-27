import { Injectable } from '@angular/core';

export interface Texto {
  id: number;
  titulo: string;
  desc: string;
  badge: string;
  tiempo: string;
  nivel: string;
  color: string;
  contenido: string[];
}

export interface SesionLectura {
  textoId: number;
  titulo: string;
  fecha: string;
  progreso: number;
  tiempo: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  private textos: Texto[] = [
    {
      id: 1,
      titulo: 'El poder de los hábitos',
      desc: 'Cómo los pequeños cambios generan grandes transformaciones en tu vida.',
      badge: 'Recomendado',
      tiempo: '5 min',
      nivel: 'Intermedio',
      color: 'linear-gradient(135deg, #4f1580, #1a3a8f)',
      contenido: [
        'Los hábitos son rutinas automáticas que el cerebro desarrolla para ahorrar energía.',
        'Charles Duhigg explica que todo hábito sigue un ciclo de tres pasos: señal, rutina y recompensa.',
        'Lo poderoso de este ciclo es que podemos usarlo a nuestro favor para crear nuevos hábitos.',
        'Los pequeños cambios son más efectivos que los grandes porque el cerebro resiste los cambios drásticos.',
        'Recuerda: no son los grandes momentos los que definen quién eres, sino los pequeños hábitos diarios.'
      ]
    },
    {
      id: 2,
      titulo: 'Ciencia del aprendizaje',
      desc: 'Las técnicas que usan los mejores estudiantes del mundo.',
      badge: 'Popular',
      tiempo: '7 min',
      nivel: 'Avanzado',
      color: 'linear-gradient(135deg, #0f4c8a, #0d7377)',
      contenido: [
        'El aprendizaje efectivo no depende de cuánto tiempo estudias sino de cómo lo haces.',
        'La práctica espaciada consiste en revisar el material en intervalos crecientes de tiempo.',
        'El recuerdo activo es más efectivo que releer: intenta recordar sin mirar tus notas.',
        'Enseñar lo que aprendes a otros es una de las formas más poderosas de consolidar conocimiento.',
        'Dormir bien después de estudiar es fundamental para que el cerebro consolide la memoria.'
      ]
    },
    {
      id: 3,
      titulo: 'Mindfulness y concentración',
      desc: 'Técnicas para mantener el foco durante la lectura.',
      badge: 'Nuevo',
      tiempo: '4 min',
      nivel: 'Básico',
      color: 'linear-gradient(135deg, #7c3aed, #db2777)',
      contenido: [
        'El mindfulness es la práctica de prestar atención plena al momento presente sin juzgar.',
        'Practicar 10 minutos de meditación al día puede mejorar significativamente tu concentración.',
        'Cuando leas, elimina todas las distracciones: silencia el teléfono y cierra pestañas innecesarias.',
        'Si tu mente se dispersa, vuelve suavemente al texto sin frustrarte. Es parte del proceso.',
        'La concentración es un músculo que se entrena con práctica constante y paciencia.'
      ]
    },
    {
      id: 4,
      titulo: 'Inteligencia emocional',
      desc: 'Comprende y gestiona tus emociones para mejores decisiones.',
      badge: 'Clásico',
      tiempo: '6 min',
      nivel: 'Intermedio',
      color: 'linear-gradient(135deg, #065f46, #1e40af)',
      contenido: [
        'La inteligencia emocional es la capacidad de reconocer y gestionar nuestras propias emociones.',
        'Daniel Goleman identificó cinco componentes: autoconciencia, autorregulación, motivación, empatía y habilidades sociales.',
        'Las personas con alta inteligencia emocional toman mejores decisiones bajo presión.',
        'La empatía nos permite entender las perspectivas de otros y construir relaciones más sólidas.',
        'La buena noticia es que la inteligencia emocional se puede desarrollar con práctica deliberada.'
      ]
    },
    {
      id: 5,
      titulo: 'Productividad extrema',
      desc: 'Métodos probados para hacer más en menos tiempo.',
      badge: 'Trending',
      tiempo: '8 min',
      nivel: 'Avanzado',
      color: 'linear-gradient(135deg, #92400e, #7c3aed)',
      contenido: [
        'La productividad real no es hacer más cosas sino hacer las cosas correctas.',
        'El método GTD de David Allen propone capturar todas las tareas fuera de tu cabeza.',
        'Identifica tus tres tareas más importantes del día y complétalas antes que todo lo demás.',
        'Las interrupciones destruyen el trabajo profundo. Protege bloques de tiempo sin distracciones.',
        'Descansar es parte de ser productivo. Sin recuperación, el rendimiento cae drásticamente.'
      ]
    },
    {
      id: 6,
      titulo: 'Neuroplasticidad',
      desc: 'Cómo el cerebro cambia con el aprendizaje constante.',
      badge: 'Ciencia',
      tiempo: '9 min',
      nivel: 'Avanzado',
      color: 'linear-gradient(135deg, #1e3a5f, #0d7377)',
      contenido: [
        'La neuroplasticidad es la capacidad del cerebro para reorganizarse formando nuevas conexiones.',
        'Durante mucho tiempo se creyó que el cerebro adulto era fijo e inmutable. Hoy sabemos que no.',
        'Aprender algo nuevo, leer y practicar instrumentos musicales estimulan la neuroplasticidad.',
        'El ejercicio físico también promueve el crecimiento de nuevas células cerebrales.',
        'Nunca es tarde para aprender. El cerebro humano mantiene su plasticidad durante toda la vida.'
      ]
    }
  ];

  private historial: SesionLectura[] = [
    { textoId: 1, titulo: 'El poder de los hábitos', fecha: '26 Apr 2026', progreso: 100, tiempo: '5 min', color: 'linear-gradient(135deg, #4f1580, #1a3a8f)' },
    { textoId: 3, titulo: 'Mindfulness y concentración', fecha: '25 Apr 2026', progreso: 100, tiempo: '4 min', color: 'linear-gradient(135deg, #7c3aed, #db2777)' },
    { textoId: 2, titulo: 'Ciencia del aprendizaje', fecha: '24 Apr 2026', progreso: 60, tiempo: '7 min', color: 'linear-gradient(135deg, #0f4c8a, #0d7377)' }
  ];

  getTextos(): Texto[] {
    return this.textos;
  }

  getTextoPorNivel(nivel: string): Texto[] {
    return this.textos.filter(t => t.nivel.toLowerCase() === nivel.toLowerCase());
  }

  getTextoPorId(id: number): Texto | undefined {
    return this.textos.find(t => t.id === id);
  }

  getHistorial(): SesionLectura[] {
    return this.historial;
  }

  getStats() {
    return {
      textosLeidos: this.historial.filter(h => h.progreso === 100).length,
      minutosLeidos: 42,
      puntosTotal: 150,
      racha: 5
    };
  }
}