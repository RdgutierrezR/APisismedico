const pool = require('../config/db');

async function createCombinacion(userId, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5) {
    const [result] = await pool.query('INSERT INTO combinacion (UserID, Pregunta1, Pregunta2, Pregunta3, Pregunta4, Pregunta5) VALUES (?, ?, ?, ?, ?, ?)', [userId, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5]);
    return result.insertId;
}

// Implementa las demás funciones (obtener, actualizar, eliminar)

module.exports = {
    createCombinacion,
    // Exporta las demás funciones
};