import { createContext, useState, useEffect, use } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); //Estado de carga inicial

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            //si hay un token se marca al usuario como logueado
            setUser({ logged: true });
        }
        setLoading(false);
    }, []);

    return (
        // 'value' es lo que otros componentes pueden consultar
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};