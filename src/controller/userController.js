const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Importa la conexión a la base de datos

async function registerUser(cedula, userName, password, rolId) {
    try {
        // ✅ Verificar si los datos están bien definidos
        if (!cedula || !userName || !password || rolId === undefined) {
            return { success: false, message: "Todos los campos son obligatorios" };
        }

        // ✅ Verificar si el usuario ya existe
        const [existingUser] = await pool.query('SELECT * FROM user WHERE Cedula = ?', [cedula]);
        if (existingUser.length > 0) {
            return { success: false, message: 'El usuario ya existe' };
        }

        // ✅ Hashear la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Insertar el usuario en la base de datos
        const [result] = await pool.query(
            'INSERT INTO user (Cedula, UserName, Password, RolID) VALUES (?, ?, ?, ?)', 
            [cedula, userName, hashedPassword, rolId]
        );

        return { success: true, message: 'Usuario registrado con éxito', userId: result.insertId };
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return { success: false, message: 'Error en el registro' };
    }
}

// Obtener todos los usuarios
async function getAllUsers() {
    try {
        const [users] = await pool.query('SELECT * FROM user');
        return { success: true, users };
    } catch (error) {
        console.error('❌ Error al obtener usuarios:', error);
        return { success: false, message: 'Error al obtener usuarios' };
    }
}



async function login(cedula, password) {
    try {
        const [users] = await pool.query(`
            SELECT user.UserID, user.UserName, user.Password, roles.NombreRol 
            FROM user 
            JOIN roles ON user.RolID = roles.RolID 
            WHERE user.Cedula = ?`, 
            [cedula]
        );

        if (users.length === 0) {
            return { success: false, message: 'Usuario no encontrado' };
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.Password);
        if (!passwordMatch) {
            return { success: false, message: 'Contraseña incorrecta' };
        }

        // Generar token JWT
        const token = jwt.sign({ id: user.UserID, rol: user.NombreRol }, 'tu_secreto', { expiresIn: '1h' });

        // ✅ Enviar el nombre del rol en lugar del ID
        return { 
            success: true, 
            message: 'Inicio de sesión exitoso', 
            token,
            user: {
                UserID: user.UserID,
                UserName: user.UserName,
                Rol: user.NombreRol // Ahora enviamos el nombre del rol
            }
        };
    } catch (error) {
        console.error('❌ Error en login:', error);
        return { success: false, message: 'Error en el servidor' };
    }
}

module.exports = { registerUser , getAllUsers , login };
