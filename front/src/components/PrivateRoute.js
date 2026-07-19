import { Children, useContext } from "react";
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

// Este componente envuelve a otros componentes (children)
const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    //Si esta cargando mostramos un mensaje
    if (loading) return <div>Cargando...</div>;

    //Si hay un usuario (existe el user), mostramos el contenido, sino lo redirigimos al login
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;