'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Cargue usuarios base para que podamos probar las rutas.
    await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Lucia Garcia',
        email: 'luciagarcia@test.com',
        contraseña: '123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Juan Lopez',
        email: 'juanlopez@test.com',
        contraseña: '1234',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Para vaciar la tabla de usuarios por si hay que resetear la base de datos
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};