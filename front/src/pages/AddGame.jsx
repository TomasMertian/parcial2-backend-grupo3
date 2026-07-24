import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { agregarJuego } from "../services/gamesService";

import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";


const AddGame = () => {

    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        id_videojuego: "",
        estado: "Jugando",
        calificacion: "",
        tiempo_jugado: ""
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await agregarJuego({
                id_usuario: user.id,
                id_videojuego: formData.id_videojuego,
                estado: formData.estado,
                calificacion: formData.calificacion,
                tiempo_jugado: formData.tiempo_jugado
            });

            alert("Juego agregado correctamente");

            setFormData({
                id_videojuego: "",
                estado: "Jugando",
                calificacion: "",
                tiempo_jugado: ""
            });

        } catch (error) {

            console.error(
                "Error al agregar juego:",
                error
            );

            alert("No se pudo agregar el juego");
        }
    };


    return (
        <div className="container">

            <h1>
                Agregar juego a mi colección
            </h1>


            <form onSubmit={handleSubmit}>

                <Input
                    name="id_videojuego"
                    type="number"
                    placeholder="ID del videojuego"
                    value={formData.id_videojuego}
                    onChange={handleChange}
                />


                <Select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    options={[
                        "Jugando",
                        "Completado",
                        "Pendiente"
                    ]}
                />


                <Input
                    name="calificacion"
                    type="number"
                    placeholder="Calificación"
                    value={formData.calificacion}
                    onChange={handleChange}
                />


                <Input
                    name="tiempo_jugado"
                    type="number"
                    placeholder="Tiempo jugado"
                    value={formData.tiempo_jugado}
                    onChange={handleChange}
                />


                <Button type="submit">
                    Agregar juego
                </Button>

            </form>

        </div>
    );
};


export default AddGame;