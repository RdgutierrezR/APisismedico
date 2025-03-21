const db = require('../config/db');

const Historial = {
    guardarHistorial: async (UserID, DiagnosticoID, Descripcion) => { // Eliminé callback y usé promesa
        try {
            const [result] = await db.execute(
                "INSERT INTO historial (UserID, DiagnosticoID, Descripcion) VALUES (?, ?, ?)",
                [UserID, DiagnosticoID, Descripcion]
            );
            return result; // Devuelvo el resultado en lugar de usar callback
        } catch (error) {
            throw error; // Lanzamos el error para que el controlador lo maneje
        }
    }
};

module.exports = Historial;
