import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nivelColor',
  standalone: true
})
export class NivelColorPipe implements PipeTransform {
  transform(nivel: string): string {
    switch (nivel.toLowerCase()) {
      case 'básico': return '#34d399';
      case 'intermedio': return '#fbbf24';
      case 'avanzado': return '#f87171';
      default: return '#ffffff';
    }
  }
}