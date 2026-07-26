const express = require("express");
const router = express.Router();
const validarUsuario = require("../middleware/validarUsuario");
const verificarUsuario = require("../middleware/verificarUsuario");


const {
  registrarUsuario,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/userController");

const { login } = require("../controllers/authController");
const verificarToken = require("../middleware/authMiddleware");

router.post("/login",login)

router.post("/", validarUsuario, registrarUsuario);

router.get("/:id", 
  verificarToken, 
  verificarUsuario, 
  obtenerUsuarioPorId);

router.put(
    "/:id",
    verificarToken,
    verificarUsuario,
    actualizarUsuario
);

router.delete(
    "/:id",
    verificarToken,
    verificarUsuario,
    eliminarUsuario
);

module.exports = router;