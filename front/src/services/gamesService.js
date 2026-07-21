import api from "./api";

// Obtener la colección de un usuario
export const obtenerColeccion = async (idUsuario) => {
  const response = await api.get(`/coleccion/${idUsuario}`);
  return response.data;
};

// Obtener un videojuego por ID
export const obtenerVideojuegoPorId = async (idVideojuego) => {
  const response = await api.get(`/videojuegos/${idVideojuego}`);
  return response.data.juego;
};

// Agregar un juego a la colección
export const agregarJuego = async (datosJuego) => {
  const response = await api.post("/coleccion", datosJuego);
  return response.data;
};

// Actualizar un juego de la colección
export const actualizarJuego = async (idUsuario, idVideojuego, datosJuego) => {
  const response = await api.put(
    `/coleccion/${idUsuario}/${idVideojuego}`,
    datosJuego,
  );

  return response.data;
};

// Eliminar un juego de la colección
export const eliminarJuego = async (idUsuario, idVideojuego) => {
  const response = await api.delete(`/coleccion/${idUsuario}/${idVideojuego}`);

  return response.data;
};
