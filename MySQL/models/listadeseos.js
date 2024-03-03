'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListaDeseos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ListaDeseos.belongsTo(models.Cuenta, { foreignKey: 'idcuenta' });
      ListaDeseos.belongsTo(models.Producto, { foreignKey: 'idproducto' });
    }
  }
  ListaDeseos.init({
    idcuenta: DataTypes.INTEGER,
    idproducto: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ListaDeseos',
  });
  return ListaDeseos;
};