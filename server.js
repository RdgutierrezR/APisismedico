require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRoutes = require('./src/routes/userRoutes');
const diagnosticoSintomasRoutes = require('./src/routes/diagnosticoRoutes'); // Nueva ruta unificada

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/usuarios', userRoutes);
app.use('/api/diagnostico-sintomas', diagnosticoSintomasRoutes); // Nueva ruta

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API del sistema médico funcionando');
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
