'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Videojuegos', {
      id_videojuego:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      genero:{
        type: Sequelize.STRING,
        allowNull : false
      },
      titulo:{
        type: Sequelize.STRING,
        allowNull : false
      },
      precio:{
        type: Sequelize.STRING,
        allowNull : false
      },
      descripcion:{
        type: Sequelize.STRING,
        allowNull : false
      },
      desarrollador:{
        type: Sequelize.STRING,
        allowNull : false
      },
      plataforma:{
        type: Sequelize.STRING,
        allowNull : false
      },
      createdAt:{
        allowNull : false,
        type: Sequelize.DATE
      },
      updatedAt:{
        allowNull : false,
        type : Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Videojuegos');
  }
};
