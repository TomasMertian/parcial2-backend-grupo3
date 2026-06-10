const { Videojuego } = require("../models");

//-------- GET /videojuego/:id (1. Ver videojuego) --------//
const obtenerVideojuegoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const juego = await Videojuego.findByPk(id);

    if (!juego) {
      return res.status(404).json({
        msg: `No existe el videojuego con id ${id}`,
      });
    }

    return res.status(200).json({
      msg: "Videojuego encontrado",
      juego,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error al obtener el videojuego",
    });
  }
};

module.exports = {
  obtenerVideojuegoPorId,
};
