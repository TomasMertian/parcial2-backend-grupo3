const jwt = require('jsonwebtoken')
const { Usuario } = require('../models')

const login = async (req, res) => {
    try{
        const { email,password } = req.body;
        
        //1- buscar usuario
        const user = await Usuario.findOne({where:{email} })
        if (!user){
            return res.status(404).json({error: 'usuario no encontrado'});
        }
        
        //2 Validar contraseña
        const isValid = await user.validarPassword(password)
        if (!isValid){
            return res.status(401).json({error: 'Contraseña incorrecta'});
            }
        // 3 generar el token
        const token = jwt.sign(
            { id: user.id_usuario, email: user.email},
            process.env.JWT_SECRET || 'secreto_desarrollo',
            { expiresIn: '24h'}
        );
        return res.status(200).json({ token });
    }catch (error){
    console.error('error en login:',error)
    return res.status(500).json({error: 'error interno del servidor'})
    }    
};

module.exports = { login };