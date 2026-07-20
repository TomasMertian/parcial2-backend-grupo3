import React, { useState } from "react";
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/usuarios', formData);
            alert("¡Usuario registrado con éxito! Ahora puedes iniciar sesión.");
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert("Error al registrar el usuario");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container login-wrapper">
            <form onSubmit={handleSubmit} className="login-card">
                <h2 style={{ textAlign: 'center', color: 'var(--primary)' }}>Registrarse</h2>
                
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    value={formData.nombre}
                    onChange={e => setFormData({...formData, nombre: e.target.value})} 
                    required
                />

                <input 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    required
                />
                
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})} 
                    required
                />
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Registrarse'}
                </button>
            </form>
        </div>
    );
};

export default Register;

