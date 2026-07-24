import React from "react";

const GameCard = ({ 
    juego,
    onDelete,
    onUpdate,
    onDetail
}) => {

    return (
        <div className="game-card">

            <h3>
                {juego.Videojuego.titulo}
            </h3>


            <p>
                Estado: {juego.estado}
            </p>


            <p>
                Calificación: {juego.calificacion}/10
            </p>


            <p>
                Tiempo jugado: {juego.tiempo_jugado} horas
            </p>


            <div>

                <button onClick={onDetail}>
                    Ver detalle
                </button>


                <button onClick={onUpdate}>
                    Actualizar
                </button>


                <button onClick={onDelete}>
                    Eliminar
                </button>

            </div>

        </div>
    );
};

export default GameCard;