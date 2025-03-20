const DiagnosticoSintomas = require('../models/diagnostico');

// Guardar una nueva entrada (síntomas y diagnóstico)
async function guardarDiagnosticoSintomas(req, res) {
  try {
    let { UserID, Pregunta1, Pregunta2, Pregunta3, Pregunta4, Pregunta5, Descripcion } = req.body;

    // Convertir valores a número
    UserID = parseInt(UserID);
    Pregunta1 = parseInt(Pregunta1);
    Pregunta2 = parseInt(Pregunta2);
    Pregunta3 = parseInt(Pregunta3);
    Pregunta4 = parseInt(Pregunta4);
    Pregunta5 = parseInt(Pregunta5);

    // Validar datos
    if (isNaN(UserID) || isNaN(Pregunta1) || isNaN(Pregunta2) ||
        isNaN(Pregunta3) || isNaN(Pregunta4) || isNaN(Pregunta5) || !Descripcion) {
      return res.status(400).json({ error: 'Datos inválidos, asegúrese de enviar todos los valores correctamente' });
    }

    // Guardar en la base de datos
    const id = await DiagnosticoSintomas.guardarDiagnosticoSintomas(
      UserID, Pregunta1, Pregunta2, Pregunta3, Pregunta4, Pregunta5, Descripcion
    );

    res.status(201).json({ id, message: 'Diagnóstico y síntomas guardados exitosamente' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
  }
}

// Obtener un diagnóstico por síntomas
async function obtenerDiagnosticoPorSintomas(req, res) {
  try {
    // Se espera recibir los síntomas en `req.body` o `req.query`
    let { Pregunta1, Pregunta2, Pregunta3, Pregunta4, Pregunta5 } = req.body; 

    // Convertir a número
    Pregunta1 = parseInt(Pregunta1);
    Pregunta2 = parseInt(Pregunta2);
    Pregunta3 = parseInt(Pregunta3);
    Pregunta4 = parseInt(Pregunta4);
    Pregunta5 = parseInt(Pregunta5);

    // Validar datos
    if (isNaN(Pregunta1) || isNaN(Pregunta2) || isNaN(Pregunta3) || isNaN(Pregunta4) || isNaN(Pregunta5)) {
      return res.status(400).json({ error: 'Datos inválidos, asegúrese de enviar los síntomas correctamente' });
    }

    // Buscar en la base de datos
    const resultado = await DiagnosticoSintomas.obtenerDiagnosticoPorSintomas(
      Pregunta1, Pregunta2, Pregunta3, Pregunta4, Pregunta5
    );

    if (!resultado) {
      return res.status(404).json({ message: 'No se encontró diagnóstico para estos síntomas' });
    }

    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener diagnóstico:', error);
    res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
  }
}

// Obtener todos los registros de la tabla unificada
async function obtenerTodos(req, res) {
  try {
    const resultados = await DiagnosticoSintomas.obtenerTodos();
    res.json(resultados);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
  }
}

module.exports = {
  guardarDiagnosticoSintomas,
  obtenerDiagnosticoPorSintomas,
  obtenerTodos
};
