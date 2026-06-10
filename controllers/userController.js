const Usuario = require('../models/User');

//-------- POST /usuarios (1. Registrar) --------//
const registrarUsuario = async(req, res) => {
    try {
        const {nombre, email, contraseña} = req.body;

        // Buscamos si el email ya existe en la Base de Datos
        const existeUsuario = await Usuario.findOne({where: {email}});

        // Si existeUsuario tiene datos, corta la ejecución y da error 400
        if (existeUsuario) {
            return res.status(400).json({
                msg: `El correo electrónico ${email} ya está registrado`
            });
        }

        // Crear el usuario directamente en la Base de Datos
        const nuevoUsuario = await Usuario.create({nombre, email, contraseña});

        return res.status(201).json({
            msg: `Usuario registrado con éxito`,
            user: {
                id_usuario: nuevoUsuario.id_usuario,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email
            }
        });

    }catch (error) {
        console.log(error);
        return res.status(500).json({
            error: `No se pudo registrar el usuario`
        });
    }
};

//-------- GET /usuarios/:id (2. Ver detalle) --------//
const obetenerUsuarioPorId = async (req, res) => {
    try {
        const {id} = req.params;

        // Busca el usuario mediante el id en la Base de Datos
        const usuarioId = await Usuario.findByPk(id);

        // Control de existencia: Si no se encuentra, retorna un estado 404
        if (!usuarioId) {
            return res.status(404).json({
                msg: `No existe el usuario con el id ${id}`
            });
        }

        return res.status(200).json({
            msg: "Usuario encontrado con éxito",
            user: usuarioId
        });

    }catch (error) {
        console.log(error);
        return res.status(500).json({
            error: `No se pudo obtener el detalle del usuario con id n° ${req.params.id}`
        });
    }
};


//-------- PUT /usuarios/:id (3. Editar datos) --------//
const actualizarUsuario = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, email, contraseña} = req.body;

        // Busca al usuario en la Base de Datos
        const usuarioOriginal = await Usuario.findByPk(id);

        // Si no lo encuentra, retorna un estado 404
        if (!usuarioOriginal) {
            return res.status(404).json({
                msg: `No existe el usuario con id ${id}`
            });
        }

        // Si se intenta cambiar el email, verificar que no esté en uso por otro usuario
        // 1. Buscamos si alguien ya tiene ese email en la Base de Datos
        const emailDuplicado = await Usuario.findOne({where: {email} });

        // 2. Si SÍ se encuentra (existe), da error 400
        if (emailDuplicado && emailDuplicado.id_usuario !== usuarioOriginal.id_usuario) {
            return res.status(400).json ({
                msg: `El correo electrónico ${email} ya está en uso por otro usuario.`
            });
        }

        // Actualiza los datos directamente de la Base de Datos (mantiene lo viejo si no viene nada nuevo)
        await usuarioOriginal.update({
            nombre: nombre || usuarioOriginal.nombre,
            email: email || usuarioOriginal.email,
            contraseña: contraseña || usuarioOriginal.contraseña
        });

        // Muestra un mensaje de control por la consola del servidor
        console.log(`[FLAG] Usuario con id ${id} actualizado con éxito.`);

        return res.status(200).json({
            msg: `Usuario modificado con éxito`,
            user: {
                id_usuario: usuarioOriginal.id_usuario,
                nombre: usuarioOriginal.nombre,
                email: usuarioOriginal.email
            }
        });
    }catch (error) {
    console.log(error);
    return res.status(500).json({
        error: `solicitud invalida.`
        });
    }
};


//-------- DELETE /usuarios/:id (4. Eliminar Cuenta) --------//
const eliminarUsuario = async (req,res) => {
    try {
        const {id} = req.params;

        // Comprueba si el usuario existe usando el id
        const existeUsuario = await Usuario.findByPk(id);

        // Si no existe, da un error 404 (not found) y corta la ejecución
        if (!existeUsuario) {
            return res.status(404).json({
                msg: `No se puede eliminar: No existe el usuario con id ${id}`
            });
        }

        // Si existe, le dice a la Base de Datos que lo borre
        await existeUsuario.destroy();

        // Devuelve el código 200 confirmando que se eliminó correctamente
        return res.status(200).json({
            msg: `El usuario con id: ${id} fue eliminado correctamente`
        });


    }catch (error) {
        console.log(error);
        return res.status(500).json({
            error: `No se pudo eliminar el usuario con id n° ${req.params.id}`
        });
    }
};

module.exports = {
    registrarUsuario,
    obetenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};