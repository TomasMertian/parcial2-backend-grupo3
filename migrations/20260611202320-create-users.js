'use strict';

const { INTEGER } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('Users', {
      id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
      },
      nombre:{
        type: Sequelize.STRING,
        allowNull : false
      },
      email:{
        type: Sequelize.STRING,
        allowNull : false,
        unique : true,
      },
      password:{
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
    await queryInterface.dropTable('Users')
  }
};
