const Historial = require("../models/historial");

const crearHistorial = async (req, res) => {
    try {
        const { UserID, DiagnosticoID, Descripcion } = req.body; // Cambio aquí

        if (!UserID || !DiagnosticoID || !Descripcion) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const result = await Historial.guardarHistorial(UserID, DiagnosticoID, Descripcion); // Uso de await

        res.status(201).json({ 
            mensaje: "Historial guardado correctamente", 
            id: result.insertId 
        });

    } catch (err) {
        console.error("Error al guardar historial:", err);
        res.status(500).json({ 
            error: "Error al guardar el historial", 
            detalle: err.message 
        });
    }
};

module.exports = { crearHistorial };
