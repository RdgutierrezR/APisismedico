const db = require('../config/db');

const Historial = {
    // Guardar un historial
    guardarHistorial: async (UserID, DiagnosticoID, Descripcion) => {
        try {
            const [result] = await db.execute(
                "INSERT INTO historial (UserID, DiagnosticoID, Descripcion) VALUES (?, ?, ?)",
                [UserID, DiagnosticoID, Descripcion]
            );
            return { success: true, message: "Historial guardado con éxito", insertId: result.insertId };
        } catch (error) {
            throw new Error("Error al guardar historial: " + error.message);
        }
    },

    // Obtener historial por cédula
    obtenerHistorialPorCedula: async (cedula) => {
        try {
            const [rows] = await db.execute(
                `SELECT h.HistorialID, h.FechaDiagnostico, h.Descripcion, u.Cedula
                 FROM historial h
                 INNER JOIN user u ON h.UserID = u.UserID
                 WHERE u.Cedula = ?
                 ORDER BY h.FechaDiagnostico DESC`,
                [cedula]
            );
            return rows.length > 0
                ? { success: true, historial: rows }
                : { success: false, message: "No se encontraron historiales para esta cédula" };
        } catch (error) {
            throw new Error("Error al obtener historial: " + error.message);
        }
    }
};

module.exports = Historial;
