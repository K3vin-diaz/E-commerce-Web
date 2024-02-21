'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuenta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cuenta.hasMany(models.Orden, { foreignKey: 'idcuenta' });
      Cuenta.hasMany(models.ListaDeseos, { foreignKey: 'idcuenta' });
    }
  }
  Cuenta.init({
    usuario: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cuenta',
  });
  return Cuenta;
};