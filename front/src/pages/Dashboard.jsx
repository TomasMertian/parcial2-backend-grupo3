import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { obtenerColeccion, eliminarJuego } from "../services/gamesService";

import GameCard from "../components/ui/GameCard";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

const Dashboard = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [juegos, setJuegos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    



    const cargarColeccion = async () => {

        try {

            if (user) {

                const data = await obtenerColeccion(user.id);

                setJuegos(data.coleccion);

            }

        } catch (error) {

            console.error(
                "Error al cargar colección:",
                error
            );

        }

    };



    useEffect(() => {

        cargarColeccion();

    }, [user]);



    const handleDelete = async (juego) => {

        try {

            await eliminarJuego(
                user.id,
                juego.id_videojuego
            );


            setJuegos(
                juegos.filter(
                    item =>
                    item.id_videojuego !== juego.id_videojuego
                )
            );


        } catch (error) {

            console.error(
                "Error al eliminar juego:",
                error
            );

        }

    };

    const generos = [
        "",
        ...new Set(juegos.map((juego) => juego.Videojuego.genero))
    ];

    const plataformas = [
        "",
        ...new Set(juegos.map((juego) => juego.Videojuego.plataforma))
    ];

    const juegosFiltrados = juegos.filter((juego) => {
        const coincideNombre = juego.Videojuego.titulo
            .toLowerCase()
            .includes(busqueda.toLowerCase());
    
        const coincideGenero = genero === "" || juego.Videojuego.genero === genero;
    
        const coincidePlataforma = plataforma === "" || juego.Videojuego.plataforma === plataforma;

        return (coincideNombre && coincideGenero && coincidePlataforma);
    });



return (

    <div className="dashboard">

        <h1>
            Mi colección de juegos
        </h1>

        <div className="dashboard-controls">

            <button
                onClick={() => navigate("/add-game")}
            >
                Agregar juego
            </button>

            <Input
                type="text"
                name="busqueda"
                placeholder="Buscar juego por título"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <Select
                name="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                options={generos}
            />

            <Select
                name="plataforma"
                value={plataforma}
                onChange={(e) => setPlataforma(e.target.value)}
                options={plataformas}
            />

        </div>

        <div className="games-container">

            {juegosFiltrados.map((juego) => (

                <GameCard
                    key={juego.id_videojuego}
                    juego={juego}
                    onDelete={() => handleDelete(juego)}
                    onUpdate={() =>
                        navigate(`/update-game/${juego.id_videojuego}`)
                    }
                    onDetail={() =>
                        navigate(`/game-detail/${juego.id_videojuego}`)
                    }
                />

            ))}

        </div>

    </div>

);

};


export default Dashboard;