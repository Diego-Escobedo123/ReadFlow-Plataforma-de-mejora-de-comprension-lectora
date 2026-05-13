# ReadFlow — Plataforma de Mejora de Comprensión Lectora
Descripción:
ReadFlow es una plataforma web diseñada para mejorar la comprensión lectora de sus usuarios. Permite leer textos con temporizador, responder cuestionarios de comprensión, analizar documentos PDF y llevar un seguimiento del progreso personal.

URLs:
Frontend (Vercel): https://read-flow-plataforma-de-mejora-de-c.vercel.app

Backend (Render): https://readflow-plataforma-de-mejora-de.onrender.com

Repositorio: https://github.com/Diego-Escobedo123/ReadFlow-Plataforma-de-mejora-de-comprension-lectora

Tecnologías utilizadas:
Frontend

Angular
- TypeScript
- Bootstrap 5
- pdfjs-dist (lectura de PDFs)

Backend

- Node.js + Express
- MongoDB Atlas
- Mongoose

Estructura del proyecto:
El proyecto está dividido en tres partes principales. La primera es una landing page en la raíz del repositorio, construida con HTML, CSS y JavaScript puro con Bootstrap 5, que presenta la plataforma al público general. La segunda es el backend, ubicado en la carpeta Proyecto Final/Backend, desarrollado con Node.js y Express corriendo en el puerto 3000, conectado a una base de datos MongoDB Atlas que contiene los textos, preguntas y usuarios. La tercera es el frontend, ubicado en Proyecto Final/Frontend/readflow-app, desarrollado con Angular usando componentes standalone, que es la aplicación principal con la que interactúa el usuario.

Funcionalidades principales:

Login y Registro — Autenticación de usuarios conectada a MongoDB
Biblioteca de textos — Grid de textos con filtros por nivel (Básico, Intermedio, Avanzado)
Sesión de lectura — Timer en tiempo real, barra de progreso y quiz de comprensión con puntaje
Analizar documento — Sube un PDF y obtén un resumen automático con puntos clave
Perfil — Estadísticas personales, historial de lecturas y logros

Instalación y ejecución local:
Backend
bashcd "Proyecto Final/Backend"
npm install
node src/index.js
Frontend
bashcd "Proyecto Final/Frontend/readflow-app"
npm install
ng serve
Variables de entorno del Backend
PORT=3000
MONGODB_URI=mongodb+srv://readflow:readflow123@cluster0.ekvvhzz.mongodb.net/readflow?appName=Cluster0
