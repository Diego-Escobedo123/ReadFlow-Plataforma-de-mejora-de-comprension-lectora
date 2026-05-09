const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const textosRoutes = require('./routes/textos.routes');
const preguntasRoutes = require('./routes/preguntas.routes');
const usuariosRoutes = require('./routes/usuarios.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/textos', textosRoutes);
app.use('/api/preguntas', preguntasRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.json({ message: 'ReadFlow API funcionando correctamente' });
});

// Conectar MongoDB
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Conectado a MongoDB');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });

  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
  }
};

conectarDB();