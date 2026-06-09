'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // lista inicial del catalogo de juegos
    await queryInterface.bulkInsert('Videojuegos', [
      {
        titulo: 'League of Legends',
        genero: 'MOBA',
        plataforma: 'PC',
        precio: 0.00, // gratuito
        descripcion: 'Juego de estrategia por equipos donde dos bandos de cinco campeones se enfrentan para destruir la base del otro.',
        desarrollador: 'Riot Games',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Call of Duty: Black Ops 3',
        genero: 'Shooter / FPS',
        plataforma: 'Multiplataforma',
        precio: 59.99,
        descripcion: 'Shooter en primera persona con un multijugador frenetico y el clásico modo zombies.',
        desarrollador: 'Treyarch',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Red Dead Redemption',
        genero: 'Accion / Aventura',
        plataforma: 'Multiplataforma',
        precio: 49.99,
        descripcion: 'Una historia epica en el Salvaje Oeste protagonizada por el exforajido John Marston.',
        desarrollador: 'Rockstar Games',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // para vaciar la tabla de videojuegos por si lo necesitamos
    await queryInterface.bulkDelete('Videojuegos', null, {});
  }
};