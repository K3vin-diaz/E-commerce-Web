'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdenProducto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrdenProducto.belongsTo(models.Producto, { foreignKey: 'idproducto' });
      OrdenProducto.belongsTo(models.Orden, { foreignKey: 'idorden' });
    }
  }
  OrdenProducto.init({
    idorden: DataTypes.INTEGER,
    idproducto: DataTypes.INTEGER,
    cantidadvendida: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL,
    precioVenta: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'OrdenProducto',
  });
  return OrdenProducto;
};