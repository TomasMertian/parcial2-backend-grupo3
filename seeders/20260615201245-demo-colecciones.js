'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Coleccion-usuario', [
            {
                id_usuario: 1, // Lucia Garcia
                id_videojuego: 1, // League of Legends
                tiempo_jugado: 120,
                calificacion: 9,
                estado: 'Jugando',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_usuario: 1, // Lucia Garcia
                id_videojuego: 3, // Red Dead Redemption
                tiempo_jugado: 85,
                calificacion: 10,
                estado: 'Completado',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_usuario: 2, // Juan Lopez
                id_videojuego: 2, // Call of Duty: Black Ops 3
                tiempo_jugado: 5,
                calificacion: 7,
                estado: 'Jugando',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        // vaciamos la tabla por si lo necesitamos
        await queryInterface.bulkDelete('Coleccion-usuario', null, {});
    }
};