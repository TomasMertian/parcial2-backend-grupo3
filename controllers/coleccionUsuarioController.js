const { ColeccionUsuario, Usuario, Videojuego } = require("../models");

const agregarAColeccion = async (req, res) => {
  try {
    const { id_usuario, id_videojuego, estado, calificacion, tiempo_jugado } =
      req.body;

    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const juego = await Videojuego.findByPk(id_videojuego);
    if (!juego) {
      return res.status(404).json({ error: "Videojuego no encontrado" });
    }

    const existe = await ColeccionUsuario.findOne({
      where: { id_usuario, id_videojuego },
    });

    if (existe) {
      return res.status(400).json({
        error: "El juego ya está en la colección del usuario",
      });
    }

    const juegoAgregado = await ColeccionUsuario.create({
      id_usuario,
      id_videojuego,
      estado,
      calificacion,
      tiempo_jugado,
    });

    return res.status(201).json({
      msg: "Juego agregado a la colección",
      coleccion: juegoAgregado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error al agregar a colección",
    });
  }
};

const obtenerColeccionUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const coleccion = await ColeccionUsuario.findAll({
      where: { id_usuario: id_usuario },
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

const actualizarJuegoColeccion = async (req, res) => {
  try {
    const { estado, calificacion, tiempo_jugado } = req.body;

    await req.coleccionExistente.update({
      estado,
      calificacion,
      tiempo_jugado,
    });

    return res.status(200).json({
      msg: "Juego actualizado correctamente",
      juego: req.coleccionExistente,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error al actualizar juego",
    });
  }
};

const eliminarJuegoColeccion = async (req, res) => {
  try {
    await req.coleccionExistente.destroy();

    return res.status(200).json({
      msg: "Juego eliminado de la colección",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error al eliminar juego",
    });
  }
};

module.exports = {
  agregarAColeccion,
  obtenerColeccionUsuario,
  actualizarJuegoColeccion,
  eliminarJuegoColeccion,
};
