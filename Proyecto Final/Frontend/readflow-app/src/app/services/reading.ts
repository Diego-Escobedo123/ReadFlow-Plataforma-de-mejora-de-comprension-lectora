import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';

export interface Texto {
  _id: string;
  titulo: string;
  desc: string;
  badge: string;
  tiempo: string;
  nivel: string;
  color: string;
  contenido: string[];
}

export interface SesionLectura {
  textoId: string;
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

  private apiUrl = 'http://localhost:3000/api';
  private textosCache: Texto[] | null = null;

  constructor(private http: HttpClient) {
    const cached = sessionStorage.getItem('textos');
    if (cached) {
      this.textosCache = JSON.parse(cached);
    }
  }

  getTextos(): Observable<Texto[]> {
    if (this.textosCache) {
      return of(this.textosCache);
    }
    return this.http.get<Texto[]>(`${this.apiUrl}/textos`).pipe(
      tap(data => {
        this.textosCache = data;
        sessionStorage.setItem('textos', JSON.stringify(data));
      })
    );
  }

  getTextoPorId(id: string): Observable<Texto> {
    return this.http.get<Texto>(`${this.apiUrl}/textos/${id}`);
  }

  getHistorial(): SesionLectura[] {
    return [
      { textoId: '1', titulo: 'El poder de los hábitos', fecha: '26 Apr 2026', progreso: 100, tiempo: '5 min', color: 'linear-gradient(135deg, #4f1580, #1a3a8f)' },
      { textoId: '2', titulo: 'Mindfulness y concentración', fecha: '25 Apr 2026', progreso: 100, tiempo: '4 min', color: 'linear-gradient(135deg, #7c3aed, #db2777)' },
      { textoId: '3', titulo: 'Ciencia del aprendizaje', fecha: '24 Apr 2026', progreso: 60, tiempo: '7 min', color: 'linear-gradient(135deg, #0f4c8a, #0d7377)' }
    ];
  }

  getStats() {
    return {
      textosLeidos: 3,
      minutosLeidos: 42,
      puntosTotal: 150,
      racha: 5
    };
  }
}