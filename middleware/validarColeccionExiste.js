const { ColeccionUsuario } = require('../models');

const validarColeccionExiste = async (req, res, next) => {
  try {
    const { id_usuario, id_videojuego } = req.params;

    const registro = await ColeccionUsuario.findOne({
      where: { id_usuario, id_videojuego },
    });

    if (!registro) {
      return res.status(404).json({
        error: 'Juego no encontrado en la colección',
      });
    }

    req.coleccionExistente = registro;
    next();
  } catch (error) {
    console.error('Error en validarColeccionExiste:', error);
    return res.status(500).json({
      error: 'Error al verificar la colección',
    });
  }
};

module.exports = validarColeccionExiste;
