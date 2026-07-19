import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Login from './pages/Login';
import Register from "./pages/Register";
import './styles/global.css';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/*Ruta por defecto que redirige al login*/}
                        <Route path="/" element={<Navigate to="/login" />} />

                        {/*Ejemplo de ruta privada*/}
                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <h1>Zona privada - Colección de Juegos</h1>
                            </PrivateRoute>
                        } />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;