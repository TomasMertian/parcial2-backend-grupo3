const express = require("express");
const router = express.Router();

const {
  obtenerVideojuegoPorId,
} = require("../controllers/videojuegoController");

router.get("/:id", obtenerVideojuegoPorId);

module.exports = router;
