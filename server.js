require('dotenv').config();
console.log('🔍 Variables de entorno cargadas:', process.env); // Muestra las variables cargadas

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRoutes = require('./src/routes/userRoutes'); // Asegúrate de que la ruta es correcta

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/usuarios', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API del sistema médico funcionando');
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
