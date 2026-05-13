import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-analizar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './analizar.html',
  styleUrl: './analizar.css'
})
export class AnalizarComponent {

  nombreUsuario = 'Usuario';
  inicialesUsuario = 'U';

  estado: 'idle' | 'leyendo' | 'analizando' | 'listo' | 'error' = 'idle';
  nombreArchivo = '';
  textoExtraido = '';
  resumen = '';
  puntosClave: string[] = [];
  arrastrandoSobre = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const u = JSON.parse(usuarioGuardado);
      this.nombreUsuario = u.nombre || 'Usuario';
      this.inicialesUsuario = this.nombreUsuario.charAt(0).toUpperCase();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.arrastrandoSobre = true;
  }

  onDragLeave() {
    this.arrastrandoSobre = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.arrastrandoSobre = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.procesarArchivo(file);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.procesarArchivo(file);
  }

  async procesarArchivo(file: File) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'pdf') {
      alert('Solo se permiten archivos PDF');
      return;
    }

    this.nombreArchivo = file.name;
    this.estado = 'leyendo';
    this.resumen = '';
    this.puntosClave = [];
    this.cdr.detectChanges();

    try {
      this.textoExtraido = await this.leerPDF(file);
      await this.analizarTexto();
    } catch (err) {
      console.error(err);
      this.estado = 'error';
      this.cdr.detectChanges();
    }
  }

  async leerPDF(file: File): Promise<string> {
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let texto = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      texto += content.items.map((item: any) => item.str).join(' ') + '\n';
    }

    return texto;
  }

  async analizarTexto() {
    this.estado = 'analizando';
    this.cdr.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const oraciones = this.textoExtraido
        .replace(/\n+/g, ' ')
        .split(/[.!?]+/)
        .map(s => s.trim())
        .filter(s => s.length > 40);

      // Generar resumen con las primeras oraciones significativas
      const primerasOraciones = oraciones.slice(0, 8);
      this.resumen = primerasOraciones.join('. ') + '.';

      // Generar puntos clave distribuidos del documento
      const total = oraciones.length;
      const indices = [
        Math.floor(total * 0.05),
        Math.floor(total * 0.15),
        Math.floor(total * 0.25),
        Math.floor(total * 0.40),
        Math.floor(total * 0.55),
        Math.floor(total * 0.70),
        Math.floor(total * 0.85),
      ];

      this.puntosClave = indices
        .map(i => oraciones[i])
        .filter(s => s && s.length > 30)
        .slice(0, 7);

      if (this.puntosClave.length < 3) {
        this.puntosClave = oraciones.slice(0, 7);
      }

      this.estado = 'listo';
    } catch (err) {
      console.error(err);
      this.estado = 'error';
    }

    this.cdr.detectChanges();
  }

  reiniciar() {
    this.estado = 'idle';
    this.nombreArchivo = '';
    this.textoExtraido = '';
    this.resumen = '';
    this.puntosClave = [];
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}