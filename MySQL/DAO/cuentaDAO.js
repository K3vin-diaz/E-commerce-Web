const { Cuenta } = require('../models'); // Ajusta la ruta según la ubicación de tu modelo

class CuentaDAO {
  static async getAllCuentas() {
    try {
      const cuentas = await Cuenta.findAll();
      return cuentas;
    } catch (error) {
      throw new Error(`Error al obtener todas las cuentas: ${error.message}`);
    }
  }

  static async getCuentaById(id) {
    try {
      const cuenta = await Cuenta.findByPk(id);
      return cuenta;
    } catch (error) {
      throw new Error(`Error al obtener la cuenta por ID: ${error.message}`);
    }
  }

  static async createCuenta(usuario, email, password) {
    try {
      const nuevaCuenta = await Cuenta.create({ usuario, email, password });
      return nuevaCuenta;
    } catch (error) {
      throw new Error(`Error al crear una nueva cuenta: ${error.message}`);
    }
  }

  static async updateCuenta(id, usuario, email, password) {
    try {
      const cuenta = await Cuenta.findByPk(id);
      if (cuenta) {
        await cuenta.update({ usuario, email, password });
        return cuenta;
      } else {
        throw new Error('Cuenta no encontrada');
      }
    } catch (error) {
      throw new Error(`Error al actualizar la cuenta: ${error.message}`);
    }
  }

  static async deleteCuenta(id) {
    try {
      const cuenta = await Cuenta.findByPk(id);
      if (cuenta) {
        await cuenta.destroy();
        return true; // Indicar que la eliminación fue exitosa
      } else {
        throw new Error('Cuenta no encontrada');
      }
    } catch (error) {
      throw new Error(`Error al eliminar la cuenta: ${error.message}`);
    }
  }
}

module.exports = CuentaDAO;
