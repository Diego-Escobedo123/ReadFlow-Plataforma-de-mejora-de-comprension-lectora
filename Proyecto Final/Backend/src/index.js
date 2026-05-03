process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const textosRoutes = require('./routes/textos.routes');
const preguntasRoutes = require('./routes/preguntas.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/textos', textosRoutes);
app.use('/api/preguntas', preguntasRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.json({ message: 'ReadFlow API funcionando correctamente' });
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err);
  });