// Controlador para la entidad producto

const ProductoDAO = require('./DAO/productoDAO');

class ProductoController {
  constructor(productoDAO) {
    this.productoDAO = productoDAO;
  }

  async getAllProductos() {
    try {
      const productos = await this.productoDAO.getAllProductos();
      return productos;
    } catch (error) {
      console.error('Error al obtener todos los productos:', error);
      throw error;
    }
  }

  async getProductoById(productoId) {
    try {
      const producto = await this.productoDAO.getProductoById(productoId);
      return producto;
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error);
      throw error;
    }
  }

  async createProducto(nombre, descripcion, precio, idCategoria) {
    try {
      const nuevoProducto = await this.productoDAO.createProducto(
        nombre,
        descripcion,
        precio,
        idCategoria
      );
      return nuevoProducto;
    } catch (error) {
      console.error('Error al crear un nuevo producto:', error);
      throw error;
    }
  }

  async updateProducto(productoId, nombre, descripcion, precio, idCategoria) {
    try {
      const productoActualizado = await this.productoDAO.updateProducto(
        productoId,
        nombre,
        descripcion,
        precio,
        idCategoria
      );
      return productoActualizado;
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw error;
    }
  }

  async deleteProducto(productoId) {
    try {
      const eliminacionExitosa = await this.productoDAO.deleteProducto(productoId);
      return eliminacionExitosa;
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw error;
    }
  }
}

module.exports = ProductoController;