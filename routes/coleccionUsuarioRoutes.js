const express = require("express");
const router = express.Router();

const {
  agregarAColeccion,
  obtenerColeccionUsuario,
  actualizarJuegoColeccion,
  eliminarJuegoColeccion,
} = require("../controllers/coleccionUsuarioController");

router.post("/", agregarAColeccion);

router.get("/:id_usuario", obtenerColeccionUsuario);

router.put("/:id_usuario/:id_videojuego", actualizarJuegoColeccion);

router.delete("/:id_usuario/:id_videojuego", eliminarJuegoColeccion);

module.exports = router;
