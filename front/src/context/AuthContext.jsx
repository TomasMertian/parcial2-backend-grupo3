import { createContext, useState, useEffect } from 'react';
import React from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); //Estado de carga inicial

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
        // Si hay un token, se recuperan los datos del usuario logueado
        const decoded = jwtDecode(token);
        setUser(decoded);
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