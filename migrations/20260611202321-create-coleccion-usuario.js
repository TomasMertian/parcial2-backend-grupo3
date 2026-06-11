'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Coleccion-usuario', {
       id_usuario:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull : false,
        references : {
          model: 'Users',
          key:'id_usuario'
        },
        
       },
       id_videojuego:{
        type: Sequelize.INTEGER,
        primaryKey :true,
        allowNull : false,
        references:{
          model: 'Videojuegos',
          key:'id_videojuego'
        }
       },
       tiempo_jugado:{
        type : Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'tiempo jugado en minutos'
       },
       calificacion:{
        type : Sequelize.FLOAT,
        allowNull : false,
        comment : 'puntaje del 1 al 10',
       },
       estado:{
        type : Sequelize.STRING,
        allowNull : false,
        defaultValue : 'Sin_jugar'
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
    await queryInterface.dropTable('Coleccion-usuario');
  }
};
