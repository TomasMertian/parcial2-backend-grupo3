const express = require("express");
const router = express.Router();

const {
  registrarUsuario,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/userController");

const { login } = require("../controllers/authController");
const verificarToken = require("../middleware/authMiddleware");

router.post("/login",login)

router.post("/", registrarUsuario);

router.get("/:id",verificarToken, obtenerUsuarioPorId);

router.put("/:id",verificarToken, actualizarUsuario);

router.delete("/:id",verificarToken, eliminarUsuario);

module.exports = router;