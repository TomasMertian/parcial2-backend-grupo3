const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // buscamos el token en las cabeceras de la peticion
    const authHeader = req.headers['authorization']
    //verificamos que la cabecera exista y arranque con bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            error: 'acceso denegado, no se proporciono un token de autenticacion'
        });
    }
    try{
        //extraemos solo el string del token
        const token = authHeader.split(' ')[1];
        // verificamos si el token es valido y no expiro
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'secreto_desarrollo'
        );
        req.user = decoded
        next();  

    }catch (error){
        console.error('error al verificar el token', error);
        return res.status(401).json({ error: 'token invalido o expirado'});
    }
};
module.exports = verificarToken;