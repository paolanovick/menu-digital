require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
const connectDB = require('./config/db');
connectDB();

// Rutas básicas de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: '🍽️ API Menú Digital funcionando',
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando correctamente'
  });
});

// Importar rutas (las crearemos después)
const authRoutes = require('./routes/auth');
const restauranteRoutes = require('./routes/restaurantes');
const categoriaRoutes = require('./routes/categorias');
const platoRoutes = require('./routes/platos');
const importRoutes = require("./routes/import");
const anunciosRoutes = require("./routes/anuncios");
const superadminRoutes = require("./routes/superadmin");

// Usar rutas (descomentaremos después)
 app.use('/api/auth', authRoutes);
 app.use('/api/restaurantes', restauranteRoutes);
 app.use('/api/categorias', categoriaRoutes);
app.use('/api/platos', platoRoutes);
app.use("/api/import", importRoutes); 
app.use("/api/anuncios", anunciosRoutes);
 app.use("/api/superadmin", superadminRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Algo salió mal!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Puerto
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});
