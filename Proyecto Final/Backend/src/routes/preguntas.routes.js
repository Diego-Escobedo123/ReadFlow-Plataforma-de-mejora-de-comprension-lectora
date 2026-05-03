const express = require('express');
const router = express.Router();
const { getPreguntasPorTexto, crearPregunta, eliminarPregunta } = require('../controllers/preguntas.controller');

router.get('/texto/:textoId', getPreguntasPorTexto);
router.post('/', crearPregunta);
router.delete('/:id', eliminarPregunta);

module.exports = router;