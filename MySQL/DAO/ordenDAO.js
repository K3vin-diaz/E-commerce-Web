const { Orden } = require('../models'); // Ajusta la ruta según la ubicación de tu modelo

class OrdenDAO {
  static async getAllOrdenes() {
    try {
      const ordenes = await Orden.findAll();
      return ordenes;
    } catch (error) {
      throw new Error(`Error al obtener todas las órdenes: ${error.message}`);
    }
  }

  static async getOrdenById(id) {
    try {
      const orden = await Orden.findByPk(id);
      return orden;
    } catch (error) {
      throw new Error(`Error al obtener la orden por ID: ${error.message}`);
    }
  }

  static async getAllOrdenesCuenta(id) {
    try {
      const orden = await Orden.findAll({
        order: ["createdAt"],
        where: {
          idcuenta: id
        }
      });
      return orden;
    } catch (error) {
      throw new Error(`Error al obtener la orden por ID: ${error.message}`);
    }
  }

  static async createOrden(fecha, idCuenta) {
    try {
      const nuevaOrden = await Orden.create({ fecha, idcuenta: idCuenta });
      return nuevaOrden;
    } catch (error) {
      throw new Error(`Error al crear una nueva orden: ${error.message}`);
    }
  }

  static async updateOrden(id, fecha, idCuenta) {
    try {
      const orden = await Orden.findByPk(id);
      if (orden) {
        await orden.update({ fecha, idcuenta: idCuenta });
        return orden;
      } else {
        throw new Error('Orden no encontrada');
      }
    } catch (error) {
      throw new Error(`Error al actualizar la orden: ${error.message}`);
    }
  }

  static async deleteOrden(id) {
    try {
      const orden = await Orden.findByPk(id);
      if (orden) {
        await orden.destroy();
        return true; // Indicar que la eliminación fue exitosa
      } else {
        throw new Error('Orden no encontrada');
      }
    } catch (error) {
      throw new Error(`Error al eliminar la orden: ${error.message}`);
    }
  }
}

module.exports = OrdenDAO;
