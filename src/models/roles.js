const pool = require('../config/db');

async function getAllRoles() {
    const [rows] = await pool.query('SELECT * FROM roles');
    return rows;
}

async function getRoleById(rolId) {
    const [rows] = await pool.query('SELECT * FROM roles WHERE RolID = ?', [rolId]);
    return rows[0];
}

async function createRole(nombreRol) {
    const [result] = await pool.query('INSERT INTO roles (NombreRol) VALUES (?)', [nombreRol]);
    return result.insertId;
}

async function updateRole(rolId, nombreRol) {
    await pool.query('UPDATE roles SET NombreRol = ? WHERE RolID = ?', [nombreRol, rolId]);
}

async function deleteRole(rolId) {
    await pool.query('DELETE FROM roles WHERE RolID = ?', [rolId]);
}

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};