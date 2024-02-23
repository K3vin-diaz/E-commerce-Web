// Controlador para la entidad orden

const OrdenDAO = require('./DAO/ordenDAO');

class OrdenController {
  constructor(ordenDAO) {
    this.ordenDAO = ordenDAO;
  }

  async getAllOrdenes() {
    try {
      const ordenes = await this.ordenDAO.getAllOrdenes();
      return ordenes;
    } catch (error) {
      console.error('Error al obtener todas las órdenes:', error);
      throw error;
    }
  }

  async getOrdenById(ordenId) {
    try {
      const orden = await this.ordenDAO.getOrdenById(ordenId);
      return orden;
    } catch (error) {
      console.error('Error al obtener la orden por ID:', error);
      throw error;
    }
  }

  async createOrden(fecha, idCuenta) {
    try {
      const nuevaOrden = await this.ordenDAO.createOrden(fecha, idCuenta);
      return nuevaOrden;
    } catch (error) {
      console.error('Error al crear una nueva orden:', error);
      throw error;
    }
  }

  async updateOrden(ordenId, fecha, idCuenta) {
    try {
      const ordenActualizada = await this.ordenDAO.updateOrden(ordenId, fecha, idCuenta);
      return ordenActualizada;
    } catch (error) {
      console.error('Error al actualizar la orden:', error);
      throw error;
    }
  }

  async deleteOrden(ordenId) {
    try {
      const eliminacionExitosa = await this.ordenDAO.deleteOrden(ordenId);
      return eliminacionExitosa;
    } catch (error) {
      console.error('Error al eliminar la orden:', error);
      throw error;
    }
  }
}

module.exports = OrdenController;