import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { obtenerVideojuegoPorId } from "../services/gamesService";


const GameDetail = () => {

    const { id_videojuego } = useParams();

    const [juego, setJuego] = useState(null);


    useEffect(() => {

        const cargarJuego = async () => {

            try {

                const data = await obtenerVideojuegoPorId(id_videojuego);

                setJuego(data);

            } catch (error) {

                console.error(
                    "Error al cargar videojuego:",
                    error
                );

            }

        };


        cargarJuego();

    }, [id_videojuego]);



    if (!juego) {
        return (
            <div className="container">
                <h2>Cargando juego...</h2>
            </div>
        );
    }

    return (

    <div className="container">

        <h1>
            {juego.titulo}
        </h1>

        <p>
            <strong>Género:</strong> {juego.genero}
        </p>

        <p>
            <strong>Plataforma:</strong> {juego.plataforma}
        </p>

        <p>
            <strong>Desarrollador:</strong> {juego.desarrollador}
        </p>

        <p>
            <strong>Precio:</strong> ${juego.precio}
        </p>

        <p>
            <strong>Descripción:</strong>
        </p>

        <p>
            {juego.descripcion}
        </p>

    </div>

);

};


export default GameDetail;