const express = require('express');
const router = express.Router();
const rolesController = require('../controller/rolesController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', authenticateToken, rolesController.getAllRoles);
router.get('/:id', authenticateToken, rolesController.getRoleById);
router.post('/', authenticateToken, rolesController.createRole);
router.put('/:id', authenticateToken, rolesController.updateRole);
router.delete('/:id', authenticateToken, rolesController.deleteRole);

module.exports = router;