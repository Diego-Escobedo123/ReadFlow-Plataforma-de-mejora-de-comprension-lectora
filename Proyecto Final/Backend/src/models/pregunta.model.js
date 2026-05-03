const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
  textoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Texto',
    required: [true, 'El textoId es requerido']
  },
  pregunta: {
    type: String,
    required: [true, 'La pregunta es requerida']
  },
  opciones: {
    type: [String],
    required: [true, 'Las opciones son requeridas']
  },
  correcta: {
    type: String,
    required: [true, 'La respuesta correcta es requerida']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pregunta', preguntaSchema);