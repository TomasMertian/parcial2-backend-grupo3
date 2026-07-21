const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");
const {
  agregarAColeccion,
  obtenerColeccionUsuario,
  actualizarJuegoColeccion,
  eliminarJuegoColeccion,
} = require("../controllers/coleccionUsuarioController");

router.post("/",verificarToken, agregarAColeccion);

router.get("/:id_usuario",verificarToken, obtenerColeccionUsuario);

router.put("/:id_usuario/:id_videojuego",verificarToken, actualizarJuegoColeccion);

router.delete("/:id_usuario/:id_videojuego",verificarToken, eliminarJuegoColeccion);

module.exports = router;
