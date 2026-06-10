const express = require("express");
const router = express.Router();

const {
  agregarAColeccion,
  obtenerColeccionUsuario,
} = require("../controllers/coleccionUsuarioController");

router.post("/", agregarAColeccion);

router.get("/:id_usuario", obtenerColeccionUsuario);

module.exports = router;
