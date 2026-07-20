const { Usuario } = require("../models");

const verificarUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        // guardamos el usuario encontrado para usarlo después si hace falta
        req.usuario = usuario;

        next();

    } catch (error) {
        console.error("Error verificando usuario:", error);
        res.status(500).json({
            error: "Error del servidor"
        });
    }
};

module.exports = verificarUsuario;