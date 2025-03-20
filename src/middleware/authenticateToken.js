const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  // El token debe estar en el encabezado Authorization

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido' });
        }
        req.user = user;  // El objeto del usuario estará disponible en las siguientes rutas
        next();
    });
};

module.exports = authenticateToken;
