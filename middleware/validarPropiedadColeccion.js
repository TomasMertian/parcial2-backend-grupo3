const validarPropiedadColeccion = (req, res, next) => {
  const idUsuarioToken = req.user.id;
  let idUsuarioSolicitud;

  if (req.method === 'POST') {
    idUsuarioSolicitud = Number(req.body.id_usuario);
  } else {
    idUsuarioSolicitud = Number(req.params.id_usuario);
  }

  if (idUsuarioToken !== idUsuarioSolicitud) {
    return res.status(403).json({
      error: 'No tienes permiso para acceder a esta colección',
    });
  }

  next();
};

module.exports = validarPropiedadColeccion;
