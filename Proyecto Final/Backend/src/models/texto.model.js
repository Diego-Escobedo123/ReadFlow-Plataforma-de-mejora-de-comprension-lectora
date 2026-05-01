const mongoose = require('mongoose');

const textoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true
  },
  desc: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true
  },
  nivel: {
    type: String,
    required: [true, 'El nivel es requerido'],
    enum: ['Básico', 'Intermedio', 'Avanzado']
  },
  tiempo: {
    type: String,
    required: [true, 'El tiempo es requerido']
  },
  badge: {
    type: String,
    default: '📖 Texto'
  },
  color: {
    type: String,
    default: 'linear-gradient(135deg, #4f1580, #1a3a8f)'
  },
  contenido: {
    type: [String],
    required: [true, 'El contenido es requerido']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Texto', textoSchema);