const { ColeccionUsuario, Usuario, Videojuego } = require("../models");

// ------- POST /coleccion (1. Agregar a colección) --------//
const agregarAColeccion = async (req, res) => {
  try {
    const { id_usuario, id_videojuego, estado, calificacion, tiempo_jugado } =
      req.body;

    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const juego = await Videojuego.findByPk(id_videojuego);
    if (!juego) {
      return res.status(404).json({ msg: "Videojuego no encontrado" });
    }

    const existe = await ColeccionUsuario.findOne({
      where: { id_usuario, id_videojuego },
    });

    if (existe) {
      return res.status(400).json({
        msg: "El juego ya está en la colección del usuario",
      });
    }

    const nuevaEntrada = await ColeccionUsuario.create({
      id_usuario,
      id_videojuego,
      estado,
      calificacion,
      tiempo_jugado,
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

// ------- PUT /coleccion/:id_usuario/:id_videojuego (3. Actualizar) --------//
const actualizarJuegoColeccion = async (req, res) => {
  try {
    const { id_usuario, id_videojuego } = req.params;
    const { estado, calificacion, tiempo_jugado } = req.body;

    const juego = await ColeccionUsuario.findOne({
      where: {
        id_usuario: id_usuario,
        id_videojuego: id_videojuego,
      },
    });

    if (!juego) {
      return res.status(404).json({
        msg: "Juego no encontrado en la colección",
      });
    }

    await juego.update({
      estado,
      calificacion,
      tiempo_jugado,
    });

    return res.status(200).json({
      msg: "Juego actualizado correctamente",
      juego,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error al actualizar juego",
    });
  }
};

// ------- DELETE /coleccion/:id_usuario/:id_videojuego (4. Eliminar) --------//
const eliminarJuegoColeccion = async (req, res) => {
  try {
    const { id_usuario, id_videojuego } = req.params;

    const juego = await ColeccionUsuario.findOne({
      where: {
        id_usuario: id_usuario,
        id_videojuego: id_videojuego,
      },
    });

    if (!juego) {
      return res.status(404).json({
        msg: "Juego no encontrado en la colección",
      });
    }

    await juego.destroy();

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
  eliminarJuegoColeccion
};
