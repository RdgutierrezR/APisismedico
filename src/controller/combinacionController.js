const combinacionModel = require('../models/combinacion');

async function createCombinacion(req, res) {
    try {
        const { userId, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5 } = req.body;
        const combinacionId = await combinacionModel.createCombinacion(userId, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5);
        res.json({ message: 'Combinación creada', combinacionId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear combinación' });
    }
}

// Implementa los demás controladores

module.exports = {
    createCombinacion,
    // Exporta los demás controladores
};