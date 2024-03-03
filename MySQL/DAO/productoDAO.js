const { Producto } = require('../models/producto'); // Ajusta la ruta según la ubicación de tu modelo

class ProductoDAO {
  static async getAllProductos() {
    try {
      const productos = await Producto.findAll();
      return productos;
    } catch (error) {
      throw new Error(`Error al obtener todos los productos: ${error.message}`);
    }
  }

  static async getProductoById(id) {
    try {
      const producto = await Producto.findByPk(id);
      return producto;
    } catch (error) {
      throw new Error(`Error al obtener el producto por ID: ${error.message}`);
    }
  }

  static async createProducto(nombre, descripcion, precio, idCategoria) {
    try {
      const nuevoProducto = await Producto.create({
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        idcategoria: idCategoria
      });
      return nuevoProducto;
    } catch (error) {
      throw new Error(`Error al crear un nuevo producto: ${error.message}`);
    }
  }

  static async updateProducto(id, nombre, descripcion, precio, idCategoria) {
    try {
      const producto = await Producto.findByPk(id);
      if (producto) {
        await producto.update({
          nombre: nombre,
          descripcion: descripcion,
          precio: precio,
          idcategoria: idCategoria
        });
        return producto;
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }

  static async deleteProducto(id) {
    try {
      const producto = await Producto.findByPk(id);
      if (producto) {
        await producto.destroy();
        return true; // Indicar que la eliminación fue exitosa
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }
}

module.exports = ProductoDAO;
