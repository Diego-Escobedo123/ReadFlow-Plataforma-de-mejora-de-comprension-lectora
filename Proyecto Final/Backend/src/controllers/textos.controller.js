const Texto = require('../models/texto.model');

// Ontener todos los textos
const getTextos = async (req, res) => {
  try {
    const textos = await Texto.find();
    res.json(textos);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo textos', error });
  }
};

// Get texto por ID
const getTextoPorId = async (req, res) => {
  try {
    const texto = await Texto.findById(req.params.id);
    if (!texto) return res.status(404).json({ message: 'Texto no encontrado' });
    res.json(texto);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo texto', error });
  }
};

// Post crear texto
const crearTexto = async (req, res) => {
  try {
    const texto = new Texto(req.body);
    await texto.save();
    res.status(201).json(texto);
  } catch (error) {
    res.status(400).json({ message: 'Error creando texto', error });
  }
};

// Eliminar texto
const eliminarTexto = async (req, res) => {
  try {
    const texto = await Texto.findByIdAndDelete(req.params.id);
    if (!texto) return res.status(404).json({ message: 'Texto no encontrado' });
    res.json({ message: 'Texto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando texto', error });
  }
};

// Actualizar texto
const actualizarTexto = async (req, res) => {
  try {
    const texto = await Texto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!texto) return res.status(404).json({ message: 'Texto no encontrado' });
    res.json(texto);
  } catch (error) {
    res.status(400).json({ message: 'Error actualizando texto', error });
  }
};

module.exports = { getTextos, getTextoPorId, crearTexto, eliminarTexto, actualizarTexto };