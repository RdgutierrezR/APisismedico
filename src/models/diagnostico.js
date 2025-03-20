const db = require('../config/db');

// Guardar un nuevo diagnóstico con síntomas
async function guardarDiagnosticoSintomas(UserID, Pregunta1, Pregunta2, Pregunta3, Pregunta4, Pregunta5, Descripcion) {
  try {
    // Validaciones
    if (!UserID || isNaN(UserID)) {
      throw new Error("El UserID debe ser un número válido.");
    }

    if (
      Pregunta1 === undefined ||
      Pregunta2 === undefined ||
      Pregunta3 === undefined ||
      Pregunta4 === undefined ||
      Pregunta5 === undefined ||
      Descripcion === undefined
    ) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const sql = `
      INSERT INTO diagnostico_sintomas (UserID, Pregunta1, Pregunta2, Pregunta3, Pregunta4, Pregunta5, Descripcion) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [UserID, Pregunta1, Pregunta2, Pregunta3, Pregunta4, Pregunta5, Descripcion]);

    return result.insertId || null; // Devolver el ID insertado o `null` si falla
  } catch (error) {
    console.error("Error al guardar diagnóstico:", error);
    throw error;
  }
}

// Obtener diagnóstico por síntomas específicos
async function obtenerDiagnosticoPorSintomas(Pregunta1, Pregunta2, Pregunta3, Pregunta4, Pregunta5) {
  try {
    const sql = `
      SELECT * FROM diagnostico_sintomas
      WHERE Pregunta1 = ? AND Pregunta2 = ? AND Pregunta3 = ? AND Pregunta4 = ? AND Pregunta5 = ?
    `;

    const [results] = await db.query(sql, [Pregunta1, Pregunta2, Pregunta3, Pregunta4, Pregunta5]);

    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error("Error al obtener diagnóstico:", error);
    throw error;
  }
}

// Obtener todos los registros de la tabla unificada
async function obtenerTodos() {
  try {
    const sql = 'SELECT * FROM diagnostico_sintomas';
    const [results] = await db.query(sql);
    return results;
  } catch (error) {
    console.error("Error al obtener registros:", error);
    throw error;
  }
}

module.exports = {
  guardarDiagnosticoSintomas,
  obtenerDiagnosticoPorSintomas,
  obtenerTodos
};
