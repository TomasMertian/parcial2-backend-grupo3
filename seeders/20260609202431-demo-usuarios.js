'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // usuarios base para que podamos probar las rutas
    await queryInterface.bulkInsert('Users', [
      {
        nombre: 'Lucia Garcia',
        email: 'luciagarcia@test.com',
        password: '123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Juan Lopez',
        email: 'juanlopez@test.com',
        password: '1234',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // para vaciar la tabla de usuarios por si lo necesitamos
    await queryInterface.bulkDelete('Users', null, {});
  }
};
