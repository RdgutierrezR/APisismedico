const express = require("express");
const { crearHistorial } = require("../controller/historialController");

const router = express.Router();

// Endpoint para guardar historial
router.post("/", crearHistorial);

module.exports = router;
