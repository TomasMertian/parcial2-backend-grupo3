const newUser = await User.create({nombre ,email, password })

const user = await User.findone({where:{email} })
if (!user){
    return res.status(404).json({error: 'usuario no encontrado'})
}

const isValid = await user.validarPassword(password)
if (!isValid){
    return res.status(401).json({error: 'Contraseña incorrecta'});
}