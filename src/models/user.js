const pool = require('../config/db');

async function createUser(cedula, userName, password, rolId) {
    const [result] = await pool.query('INSERT INTO user (Cedula, UserName, Password, RolID) VALUES (?, ?, ?, ?)', [cedula, userName, password, rolId]);
    return result.insertId;
}

async function getUserByCedula(cedula) {
    const [rows] = await pool.query('SELECT * FROM user WHERE Cedula = ?', [cedula]);
    return rows[0];
}

module.exports = {
    createUser,
    getUserByCedula
};