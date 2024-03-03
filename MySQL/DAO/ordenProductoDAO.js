const { OrdenProducto } = require('../models/ordenproducto'); 

class OrdenProductoDAO {
  static async getAllOrdenProductos() {
    try {
      const ordenProductos = await OrdenProducto.findAll();
      return ordenProductos;
    } catch (error) {
      throw new Error(`Error al obtener todos los productos de la orden: ${error.message}`);
    }
  }

  static async getOrdenProductoById(id) {
    try {
      const ordenProducto = await OrdenProducto.findByPk(id);
      return ordenProducto;
    } catch (error) {
      throw new Error(`Error al obtener el producto de la orden por ID: ${error.message}`);
    }
  }

  static async createOrdenProducto(idOrden, idProducto, cantidadVendida, subtotal, precioVenta) {
    try {
      const nuevoOrdenProducto = await OrdenProducto.create({
        idorden: idOrden,
        idproducto: idProducto,
        cantidadvendida: cantidadVendida,
        subtotal: subtotal,
        precioVenta: precioVenta
      });
      return nuevoOrdenProducto;
    } catch (error) {
      throw new Error(`Error al crear un nuevo producto de la orden: ${error.message}`);
    }
  }

  static async updateOrdenProducto(id, idOrden, idProducto, cantidadVendida, subtotal, precioVenta) {
    try {
      const ordenProducto = await OrdenProducto.findByPk(id);
      if (ordenProducto) {
        await ordenProducto.update({
          idorden: idOrden,
          idproducto: idProducto,
          cantidadvendida: cantidadVendida,
          subtotal: subtotal,
          precioVenta: precioVenta
        });
        return ordenProducto;
      } else {
        throw new Error('Producto de la orden no encontrado');
      }
    } catch (error) {
      throw new Error(`Error al actualizar el producto de la orden: ${error.message}`);
    }
  }

  static async deleteOrdenProducto(id) {
    try {
      const ordenProducto = await OrdenProducto.findByPk(id);
      if (ordenProducto) {
        await ordenProducto.destroy();
        return true; // Indicar que la eliminación fue exitosa
      } else {
        throw new Error('Producto de la orden no encontrado');
      }
    } catch (error) {
      throw new Error(`Error al eliminar el producto de la orden: ${error.message}`);
    }
  }
}

module.exports = OrdenProductoDAO;
