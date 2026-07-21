import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Login from './pages/Login';
import Register from "./pages/Register";
import React from 'react';
import './styles/global.css';
import Dashboard from "./pages/Dashboard";
import AddGame from "./pages/AddGame";
import UpdateGame from "./pages/UpdateGame";
import GameDetail from "./pages/GameDetail";

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

                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>} />

                        <Route path="/add-game" element={
                            <PrivateRoute>
                                <AddGame />
                            </PrivateRoute>} />

                        <Route path="/update-game/:id_videojuego" element={
                            <PrivateRoute>
                                <UpdateGame />
                            </PrivateRoute>} />
                        
                        <Route path="/game-detail/:id_videojuego" element={
                            <PrivateRoute>
                                <GameDetail />
                            </PrivateRoute>} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;