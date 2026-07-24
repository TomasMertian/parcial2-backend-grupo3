const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");
const validarColeccionPost = require("../middleware/validarColeccionPost");
const validarColeccionPut = require("../middleware/validarColeccionPut");
const validarColeccionExiste = require("../middleware/validarColeccionExiste");
const validarPropiedadColeccion = require("../middleware/validarPropiedadColeccion");

const {
  agregarAColeccion,
  obtenerColeccionUsuario,
  actualizarJuegoColeccion,
  eliminarJuegoColeccion,
} = require("../controllers/coleccionUsuarioController");

router.post(
  "/",
  verificarToken,
  validarColeccionPost,
  validarPropiedadColeccion,
  agregarAColeccion
);

router.get(
  "/:id_usuario",
  verificarToken,
  validarPropiedadColeccion,
  obtenerColeccionUsuario
);

router.put(
  "/:id_usuario/:id_videojuego",
  verificarToken,
  validarColeccionPut,
  validarPropiedadColeccion,
  validarColeccionExiste,
  actualizarJuegoColeccion
);

router.delete(
  "/:id_usuario/:id_videojuego",
  verificarToken,
  validarPropiedadColeccion,
  validarColeccionExiste,
  eliminarJuegoColeccion
);

module.exports = router;
