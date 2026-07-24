const { Videojuego } = require("../models");
// agregue la importacion del archivo de redis
const redisClient = require("../config/redis");

//-------- GET /videojuego/:id (1. Ver videojuego) --------//
const obtenerVideojuegoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    // busca si el juego ya esta en cache
    const cacheJuego = await redisClient.get(`videojuego_${id}`);

    if (cacheJuego) {
      console.log(`sirviendo videojuego ${id} desde Redis`);
      return res.status(200).json({
        msg: "videojuego encontrado (desde cache)",
        juego: JSON.parse(cacheJuego),
      });
    }

    const juego = await Videojuego.findByPk(id);

    if (!juego) {
      return res.status(404).json({
        msg: `no existe el videojuego con id ${id}`,
      });
    }

    // guarda la copia en redis por 1 hora 
    await redisClient.setEx(`videojuego_${id}`, 3600, JSON.stringify(juego));

    return res.status(200).json({
      msg: "videojuego encontrado",
      juego,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "error al obtener el videojuego",
    });
  }
};

module.exports = {
  obtenerVideojuegoPorId,
};
