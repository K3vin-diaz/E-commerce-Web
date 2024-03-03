'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ListaDeseos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idcuenta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cuenta', // Nombre de la tabla de la relación
          key: 'id', // Clave primaria de la tabla de la relación
        },
      },
      idproducto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Productos', // Nombre de la tabla de la relación
          key: 'id', // Clave primaria de la tabla de la relación
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ListaDeseos');
  }
};