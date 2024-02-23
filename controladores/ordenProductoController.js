// Controlador para la entidad ordenProducto

const OrdenProductoDAO = require('./DAO/ordenProductoDAO');

class OrdenProductoController {
  constructor(ordenProductoDAO) {
    this.ordenProductoDAO = ordenProductoDAO;
  }

  async getAllOrdenProductos() {
    try {
      const ordenProductos = await this.ordenProductoDAO.getAllOrdenProductos();
      return ordenProductos;
    } catch (error) {
      console.error('Error al obtener todos los productos de la orden:', error);
      throw error;
    }
  }

  async getOrdenProductoById(ordenProductoId) {
    try {
      const ordenProducto = await this.ordenProductoDAO.getOrdenProductoById(ordenProductoId);
      return ordenProducto;
    } catch (error) {
      console.error('Error al obtener el producto de la orden por ID:', error);
      throw error;
    }
  }

  async createOrdenProducto(idOrden, idProducto, cantidadVendida, subtotal, precioVenta) {
    try {
      const nuevoOrdenProducto = await this.ordenProductoDAO.createOrdenProducto(
        idOrden,
        idProducto,
        cantidadVendida,
        subtotal,
        precioVenta
      );
      return nuevoOrdenProducto;
    } catch (error) {
      console.error('Error al crear un nuevo producto de la orden:', error);
      throw error;
    }
  }

  async updateOrdenProducto(
    ordenProductoId,
    idOrden,
    idProducto,
    cantidadVendida,
    subtotal,
    precioVenta
  ) {
    try {
      const ordenProductoActualizado = await this.ordenProductoDAO.updateOrdenProducto(
        ordenProductoId,
        idOrden,
        idProducto,
        cantidadVendida,
        subtotal,
        precioVenta
      );
      return ordenProductoActualizado;
    } catch (error) {
      console.error('Error al actualizar el producto de la orden:', error);
      throw error;
    }
  }

  async deleteOrdenProducto(ordenProductoId) {
    try {
      const eliminacionExitosa = await this.ordenProductoDAO.deleteOrdenProducto(
        ordenProductoId
      );
      return eliminacionExitosa;
    } catch (error) {
      console.error('Error al eliminar el producto de la orden:', error);
      throw error;
    }
  }
}

module.exports = OrdenProductoController;