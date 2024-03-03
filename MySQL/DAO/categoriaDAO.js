const { Categoria } = require('../models/categoria'); // Asegúrate de ajustar la ruta según la ubicación de tu modelo

class CategoriaDAO {
  static async getAllCategorias() {
    try {
      const categorias = await Categoria.findAll();
      return categorias;
    } catch (error) {
      throw new Error(`Error al obtener todas las categorías: ${error.message}`);
    }
  }

  static async getCategoriaById(id) {
    try {
      const categoria = await Categoria.findByPk(id);
      return categoria;
    } catch (error) {
      throw new Error(`Error al obtener la categoría por ID: ${error.message}`);
    }
  }

  static async createCategoria(nombre, descripcion) {
    try {
      const nuevaCategoria = await Categoria.create({ nombre, descripcion });
      return nuevaCategoria;
    } catch (error) {
      throw new Error(`Error al crear una nueva categoría: ${error.message}`);
    }
  }

  static async updateCategoria(id, nombre, descripcion) {
    try {
      const categoria = await Categoria.findByPk(id);
      if (categoria) {
        await categoria.update({ nombre, descripcion });
        return categoria;
      } else {
        throw new Error('Categoría no encontrada');
      }
    } catch (error) {
      throw new Error(`Error al actualizar la categoría: ${error.message}`);
    }
  }

  static async deleteCategoria(id) {
    try {
      const categoria = await Categoria.findByPk(id);
      if (categoria) {
        await categoria.destroy();
        return true; // Indicar que la eliminación fue exitosa
      } else {
        throw new Error('Categoría no encontrada');
      }
    } catch (error) {
      throw new Error(`Error al eliminar la categoría: ${error.message}`);
    }
  }
}

module.exports = CategoriaDAO;
