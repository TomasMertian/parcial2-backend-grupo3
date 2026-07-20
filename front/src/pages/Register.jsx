import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom"
import api from '../services/api';
import { AuthContext } from "../context/AuthContext";
import React from 'react';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: ''});
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Enviamos los datos al back para crear el usuario
            await api.post('/auth/register', formData);
            alert("Usuario registrado con éxito");
            navigate('/login');
        } catch (error) {
            alert("Error al registrar el usuario");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrarse</h2>
            <input type="text" placeholder="Usuario" onChange={e => setFormData({...formData, username: e.target.value})} />
            <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
            <input type="password" placeholder="Contraseña" onChange={e => setFormData({...formData, password: e.target.value})} />
            <button disabled={loading}>{loading ? 'Cargando...' : 'Registrarse'}</button>
        </form>
    );
};

export default Register;

