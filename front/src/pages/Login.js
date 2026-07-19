import { useState, useContext, use } from "react";
import api from '../services/api';
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false); //Maneja si el botón debe estar o no deshabilitado
    const { serUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/auth/login', formData)
            //guardamos el token recibido
            localStorage.setItem('token', res.data.token);
            //Actualizamos para que la app sepa que esta logueado
            setUser({ logged: true });
        }catch (error) {
            alert("Credenciales incorrectas")
        }finally {
            setLoading(false); //libero el formulario
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
            <input type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
            <button disabled={loading}>{loading ? 'Cargando...' : 'Iniciar Sesión'}</button>
        </form>
    );
};