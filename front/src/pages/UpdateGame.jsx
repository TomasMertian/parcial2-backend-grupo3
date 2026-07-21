import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { actualizarJuego } from "../services/gamesService";

import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";


const UpdateGame = () => {

    const { user } = useContext(AuthContext);

    const { id_videojuego } = useParams();


    const [formData, setFormData] = useState({
        estado: "",
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

            await actualizarJuego(
                user.id,
                id_videojuego,
                formData
            );


            alert("Juego actualizado correctamente");


        } catch (error) {

            console.error(
                "Error al actualizar:",
                error
            );

            alert("No se pudo actualizar el juego");
        }

    };


    return (

        <div className="container">

            <h1>
                Actualizar juego
            </h1>


            <form onSubmit={handleSubmit}>


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
                    placeholder="Nueva calificación"
                    value={formData.calificacion}
                    onChange={handleChange}
                />


                <Input
                    name="tiempo_jugado"
                    type="number"
                    placeholder="Nuevo tiempo jugado"
                    value={formData.tiempo_jugado}
                    onChange={handleChange}
                />


                <Button type="submit">
                    Guardar cambios
                </Button>


            </form>


        </div>

    );

};


export default UpdateGame;