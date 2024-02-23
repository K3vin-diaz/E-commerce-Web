// Controlador para la entidad cuenta

const CuentaDAO = require('./DAO/cuentaDAO');

class CuentaController {
  constructor(cuentaDAO) {
    this.cuentaDAO = cuentaDAO;
  }

  async getAllCuentas() {
    try {
      const cuentas = await this.cuentaDAO.getAllCuentas();
      return cuentas;
    } catch (error) {
      console.error('Error al obtener todas las cuentas:', error);
      throw error;
    }
  }

  async getCuentaById(cuentaId) {
    try {
      const cuenta = await this.cuentaDAO.getCuentaById(cuentaId);
      return cuenta;
    } catch (error) {
      console.error('Error al obtener la cuenta por ID:', error);
      throw error;
    }
  }

  async createCuenta(usuario, email, password) {
    try {
      const nuevaCuenta = await this.cuentaDAO.createCuenta(usuario, email, password);
      return nuevaCuenta;
    } catch (error) {
      console.error('Error al crear la cuenta:', error);
      throw error;
    }
  }

  async updateCuenta(cuentaId, usuario, email, password) {
    try {
      const cuentaActualizada = await this.cuentaDAO.updateCuenta(cuentaId, usuario, email, password);
      return cuentaActualizada;
    } catch (error) {
      console.error('Error al actualizar la cuenta:', error);
      throw error;
    }
  }

  async deleteCuenta(cuentaId) {
    try {
      const eliminacionExitosa = await this.cuentaDAO.deleteCuenta(cuentaId);
      return eliminacionExitosa;
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
      throw error;
    }
  }
}

module.exports = CuentaController;