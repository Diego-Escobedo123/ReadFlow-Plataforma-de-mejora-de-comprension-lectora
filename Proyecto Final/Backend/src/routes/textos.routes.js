const express = require('express');
const router = express.Router();
const {
  getTextos,
  getTextoPorId,
  crearTexto,
  eliminarTexto,
  actualizarTexto
} = require('../controllers/textos.controller');

router.get('/', getTextos);
router.get('/:id', getTextoPorId);
router.post('/', crearTexto);
router.delete('/:id', eliminarTexto);
router.patch('/:id', actualizarTexto);

module.exports = router;