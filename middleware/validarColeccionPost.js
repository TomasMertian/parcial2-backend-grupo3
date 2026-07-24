const { body, validationResult } = require('express-validator');

const validarCamposPost = [
  body('id_usuario')
    .isInt({ min: 1 })
    .withMessage('id_usuario debe ser un número entero positivo'),
  body('id_videojuego')
    .isInt({ min: 1 })
    .withMessage('id_videojuego debe ser un número entero positivo'),
  body('estado')
    .optional()
    .customSanitizer((valor) => {
      if (valor === 'Pendiente') return 'en_progreso';
      return valor;
    })
    .isIn([
      'jugando', 'Jugando',
      'en_progreso', 'En_progreso',
      'completado', 'Completado',
    ])
    .withMessage('estado debe ser uno de: jugando, en_progreso, completado'),
  body('calificacion')
    .optional()
    .isFloat({ min: 1, max: 10 })
    .withMessage('calificacion debe ser un número entre 1 y 10'),
  body('tiempo_jugado')
    .optional()
    .isInt({ min: 0 })
    .withMessage('tiempo_jugado debe ser un número entero mayor o igual a 0'),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        error: 'Error de validación en los datos enviados',
        detalles: errores.array(),
      });
    }
    next();
  },
];

module.exports = validarCamposPost;
