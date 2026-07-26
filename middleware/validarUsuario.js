const validarUsuario = (req, res, next) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({
            error: "Faltan datos obligatorios"
        });
    }

    next();
};

module.exports = validarUsuario;