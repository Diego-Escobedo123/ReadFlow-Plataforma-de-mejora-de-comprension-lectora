const Pregunta = require('../models/pregunta.model');

const getPreguntasPorTexto = async (req, res) => {
  try {
    const preguntas = await Pregunta.find({ textoId: req.params.textoId });
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo preguntas', error });
  }
};

const crearPregunta = async (req, res) => {
  try {
    const pregunta = new Pregunta(req.body);
    await pregunta.save();
    res.status(201).json(pregunta);
  } catch (error) {
    res.status(400).json({ message: 'Error creando pregunta', error });
  }
};

const eliminarPregunta = async (req, res) => {
  try {
    const pregunta = await Pregunta.findByIdAndDelete(req.params.id);
    if (!pregunta) return res.status(404).json({ message: 'Pregunta no encontrada' });
    res.json({ message: 'Pregunta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando pregunta', error });
  }
};

module.exports = { getPreguntasPorTexto, crearPregunta, eliminarPregunta };