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
      await this.analizarConIA();
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

  async analizarConIA() {
    this.estado = 'analizando';
    this.cdr.detectChanges();

    const textoRecortado = this.textoExtraido.slice(0, 4000);

    const prompt = `Eres un asistente académico experto. Analiza el siguiente texto en detalle y responde ÚNICAMENTE con un JSON válido con esta estructura exacta, sin texto adicional antes o después:
{
  "resumen": "Escribe un resumen completo y detallado del texto en al menos 5 párrafos bien desarrollados. Explica los conceptos principales, el contexto, las ideas centrales y las conclusiones del documento.",
  "puntosClave": [
    "Punto clave 1 explicado con detalle suficiente para entenderlo",
    "Punto clave 2 explicado con detalle suficiente para entenderlo",
    "Punto clave 3 explicado con detalle suficiente para entenderlo",
    "Punto clave 4 explicado con detalle suficiente para entenderlo",
    "Punto clave 5 explicado con detalle suficiente para entenderlo",
    "Punto clave 6 explicado con detalle suficiente para entenderlo",
    "Punto clave 7 explicado con detalle suficiente para entenderlo"
  ]
}

TEXTO A ANALIZAR:
${textoRecortado}`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + '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'
        },
        body: JSON.stringify({
          model: 'nvidia/nemotron-super-49b-v1:free',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 2000
        })
      });

      const data = await response.json();
      const texto = data.choices?.[0]?.message?.content;

      if (!texto) {
        this.estado = 'error';
        this.cdr.detectChanges();
        return;
      }

      const jsonMatch = texto.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const resultado = JSON.parse(jsonMatch[0]);
        this.resumen = resultado.resumen;
        this.puntosClave = resultado.puntosClave || [];
        this.estado = 'listo';
      } else {
        this.estado = 'error';
      }
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