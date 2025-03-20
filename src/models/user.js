const pool = require('../config/db');

// Función para crear un usuario
async function createUser(cedula, userName, password, rolId) {
    try {
        const [result] = await pool.query(
            'INSERT INTO user (Cedula, UserName, Password, RolID) VALUES (?, ?, ?, ?)',
            [cedula, userName, password, rolId]
        );
        console.log("✅ Usuario insertado con ID:", result.insertId);
        return result.insertId;
    } catch (error) {
        console.error("❌ Error al crear usuario:", error);
        throw error; // Lanza el error para que el controlador lo maneje
    }
}

// Función para obtener un usuario por cédula
async function getUserByCedula(cedula) {
    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE Cedula = ?', [cedula]);
        if (rows.length === 0) {
            console.log("⚠️ Usuario no encontrado con cédula:", cedula);
            return null; // Mejor retornar `null` en vez de `undefined`
        }
        console.log("✅ Usuario encontrado:", rows[0]);
        return rows[0];
    } catch (error) {
        console.error("❌ Error al buscar usuario:", error);
        throw error;
    }
}

module.exports = {
    createUser,
    getUserByCedula
};
