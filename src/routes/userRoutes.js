const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
    console.log("📥 Datos recibidos en /register:", req.body); // 👈 Verifica qué llega en Postman

    const { cedula, userName, password, rolId } = req.body;

    // Validar que los datos sean correctos
    if (!cedula || !userName || !password || rolId === undefined) {
        return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
    }

    try {
        const response = await userController.registerUser(cedula, userName, password, rolId);
        
        // Responder según el éxito de la operación
        if (response.success) {
            res.status(201).json(response);
        } else {
            res.status(400).json(response);
        }
    } catch (error) {
        console.error("❌ Error en /register:", error);
        res.status(500).json({ success: false, message: "Error interno en el servidor" });
    }
});

// Ruta para el login de usuario
router.post('/login', async (req, res) => {
    console.log("📥 Datos recibidos en /login:", req.body); // 👈 Depuración

    const { cedula, password } = req.body;

    if (!cedula || !password) {
        return res.status(400).json({ success: false, message: "Cédula y contraseña son obligatorias" });
    }

    try {
        const response = await userController.login(cedula, password);

        if (response.success) {
            res.status(200).json(response);
        } else {
            res.status(401).json(response);
        }
    } catch (error) {
        console.error("❌ Error en /login:", error);
        res.status(500).json({ success: false, message: "Error interno en el servidor" });
    }
});

router.get('/', async (req, res) => {
    try {
        const response = await userController.getAllUsers();
        if (response.success) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.error("❌ Error en /users:", error);
        res.status(500).json({ success: false, message: "Error interno en el servidor" });
    }
});
module.exports = router;
