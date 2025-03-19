const rolesModel = require('../models/roles');

async function getAllRoles(req, res) {
    try {
        const roles = await rolesModel.getAllRoles();
        res.json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener roles' });
    }
}

async function getRoleById(req, res) {
    try {
        const role = await rolesModel.getRoleById(req.params.id);
        if (!role) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener rol' });
    }
}

async function createRole(req, res) {
    try {
        const roleId = await rolesModel.createRole(req.body.nombreRol);
        res.json({ message: 'Rol creado', roleId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear rol' });
    }
}

async function updateRole(req, res) {
    try {
        await rolesModel.updateRole(req.params.id, req.body.nombreRol);
        res.json({ message: 'Rol actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar rol' });
    }
}

async function deleteRole(req, res) {
    try {
        await rolesModel.deleteRole(req.params.id);
        res.json({ message: 'Rol eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar rol' });
    }
}

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};