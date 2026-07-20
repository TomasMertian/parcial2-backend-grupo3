const express = require("express");
const router = express.Router();

const {
  registrarUsuario,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/userController");

const { login } = require("../controllers/authController")

router.post("/login",login)
router.post("/", registrarUsuario);

router.get("/:id", obtenerUsuarioPorId);

router.put("/:id", actualizarUsuario);

router.delete("/:id", eliminarUsuario);

module.exports = router;