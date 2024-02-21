'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrdenProductos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idorden: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Ordens', // Nombre de la tabla de la relación
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
      cantidadvendida: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      subtotal: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      precioVenta: {
        type: Sequelize.DECIMAL,
        allowNull: false
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
    await queryInterface.dropTable('OrdenProductos');
  }
};