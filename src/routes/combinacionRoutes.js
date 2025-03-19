const express = require('express');
const router = express.Router();
const combinacionController = require('../controller/combinacionController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, combinacionController.createCombinacion);

// Implementa las demás rutas

module.exports = router;