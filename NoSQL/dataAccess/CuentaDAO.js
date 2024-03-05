const Cuenta = require('../models/Cuenta');

class CuentaDAO {

  constructor() { }

  async crearCuenta(cuentaData) {
    try {
      const cuenta = new Cuenta(cuentaData);
      return await cuenta.save();
    } catch (error) {
      throw error;
    }
  }

  async obtenerCuentaPorId(id) {
    try {
      return await Cuenta.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async actualizarCuenta(id, cuentaData) {
    try {
      return await Cuenta.findByIdAndUpdate(id, cuentaData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async eliminarCuenta(id) {
    try {
      return await Cuenta.findByIdAndRemove(id);
    } catch (error) {
      throw error;
    }
  }

  async obtenerCuentas(limit = 10) {
    try {
      return await Cuenta.find().limit(limit);
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new CuentaDAO();