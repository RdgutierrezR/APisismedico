const db = require("../config/db"); // Asegúrate de importar la conexión a la BD
const Historial = require("../models/historial");

const crearHistorial = async (req, res) => {
    try {
        const { UserID, DiagnosticoID, Descripcion } = req.body;

        if (!UserID || !DiagnosticoID || !Descripcion) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const result = await Historial.guardarHistorial(UserID, DiagnosticoID, Descripcion);

        return res.status(201).json({ 
            mensaje: "Historial guardado correctamente", 
            id: result.insertId 
        });

    } catch (err) {
        console.error("❌ Error al guardar historial:", err.message);
        return res.status(500).json({ 
            error: "Error interno del servidor al guardar el historial", 
            detalle: err.message 
        });
    }
};


const obtenerHistorialPorCedula = async (req, res) => {
    try {
        const { cedula } = req.params;

        if (!cedula) {
            return res.status(400).json({ error: "La cédula es obligatoria" });
        }

        // Buscar el UserID basado en la cédula
        const [usuario] = await db.execute("SELECT UserID FROM user WHERE Cedula = ?", [cedula]);

        if (usuario.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const UserID = usuario[0].UserID;

        // Buscar los historiales asociados a ese UserID
        const [historiales] = await db.execute("SELECT * FROM historial WHERE UserID = ?", [UserID]);

        return res.status(200).json(historiales);
    } catch (error) {
        console.error("❌ Error al obtener historial:", error.message);
        return res.status(500).json({ error: "Error interno del servidor al obtener el historial", detalle: error.message });
    }
};

// ✅ Exportamos ambas funciones correctamente
module.exports = { crearHistorial, obtenerHistorialPorCedula };
