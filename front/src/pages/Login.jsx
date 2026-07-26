import React, { useState, useContext } from "react";
import api from '../services/api';
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log("Intentando loguear con:", formData);
        setLoading(true);

        try {
            const res = await api.post('/usuarios/login', formData);
            localStorage.setItem('token', res.data.token);
            
            const decoded = jwtDecode(res.data.token);
            setUser(decoded);

            navigate('/dashboard');
            
        } catch (error) {
            console.error(error);
            alert("Credenciales incorrectas");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container login-wrapper">
            <form onSubmit={handleSubmit} className="login-card">
                <h2 style={{ textAlign: 'center', color: 'var(--primary)' }}>Iniciar Sesión</h2>
                
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                />
                
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})} 
                />
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>

                <div style={{ marginTop: "15px", textAlign: "center" }}>
                    <p>¿No estás registrado? <Link to="/register">Regístrate aquí</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;