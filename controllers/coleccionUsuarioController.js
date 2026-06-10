const { ColeccionUsuario, Usuario, Videojuego } = require("../models");

// ------- POST /coleccion (1. Agregar a colección) --------//
const agregarAColeccion = async (req, res) => {
  try {
    const { usuario_id, videojuego_id, estado, calificacion, tiempo_juego } =
      req.body;

    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const juego = await Videojuego.findByPk(videojuego_id);
    if (!juego) {
      return res.status(404).json({ msg: "Videojuego no encontrado" });
    }

    const existe = await ColeccionUsuario.findOne({
      where: { usuario_id, videojuego_id },
    });

    if (existe) {
      return res.status(400).json({
        msg: "El juego ya está en la colección del usuario",
      });
    }

    const nuevaEntrada = await ColeccionUsuario.create({
      usuario_id,
      videojuego_id,
      estado,
      calificacion,
      tiempo_juego,
    });

    return res.status(201).json({
      msg: "Juego agregado a la colección",
      coleccion: nuevaEntrada,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error al agregar a colección",
    });
  }
};

// ------- GET /coleccion/:id_usuario (2. Ver colección) --------//
const obtenerColeccionUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const coleccion = await ColeccionUsuario.findAll({
      where: { usuario_id: id_usuario },
      include: [
        {
          model: Videojuego,
        },
      ],
    });

    return res.status(200).json({
      msg: "Colección del usuario",
      coleccion,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error al obtener colección",
    });
  }
};

module.exports = {
  agregarAColeccion,
  obtenerColeccionUsuario,
};
