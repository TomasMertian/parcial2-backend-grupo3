const express = require('express');
const router = express.Router();

const coleccionRoutes = require('./coleccionUsuarioRoutes');
const videojuegoRoutes = require('./videojuegoRoutes');
const userRoutes = require('./userRoutes');

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

router.get('/test', (req, res) => {
  res.json({
    message: 'Endpoint de prueba',
    data: {
      backend: 'Express',
      database: 'PostgreSQL',
      orm: 'Sequelize'
    }
  });
});

router.use('/coleccion', coleccionRoutes);
router.use('/videojuegos', videojuegoRoutes);
router.use('/usuarios', userRoutes);

module.exports = router;
