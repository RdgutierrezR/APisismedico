const express = require("express");
const { crearHistorial, obtenerHistorialPorCedula } = require("../controller/historialController");

const router = express.Router();

// 📌 Endpoint para guardar historial
router.post("/", crearHistorial);

// 📌 Endpoint corregido para obtener historial por cédula
router.get("/cedula/:cedula", obtenerHistorialPorCedula);

module.exports = router;
