'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orden extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orden.hasMany(models.OrdenProducto, { foreignKey: 'idorden' });
      Orden.belongsTo(models.Cuenta, { foreignKey: 'idcuenta' });
    }
  }
  Orden.init({
    fecha: DataTypes.DATE,
    idcuenta: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orden',
  });
  return Orden;
};