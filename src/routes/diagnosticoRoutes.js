const express = require('express');
const router = express.Router();
const diagnosticoSintomasController = require('../controller/diagnosticoController');

// POST: Guardar un nuevo diagnóstico con síntomas
router.post('/', diagnosticoSintomasController.guardarDiagnosticoSintomas);

// GET: Obtener un diagnóstico basado en síntomas específicos
router.get('/buscar', diagnosticoSintomasController.obtenerDiagnosticoPorSintomas);

// GET: Obtener todos los registros de la tabla unificada
router.get('/', diagnosticoSintomasController.obtenerTodos);

module.exports = router;
