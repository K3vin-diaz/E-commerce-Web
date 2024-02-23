// Controlador para la entidad Categoria

const CategoriaDAO = require('./DAO/categoriaDAO.js');

class categoriaController {
  constructor(categoriaDAO) {
    this.categoriaDAO = categoriaDAO;
  }

  async getAllCategorias() {
    try {
      const categorias = await this.categoriaDAO.getAllCategorias();
      return categorias;
    } catch (error) {
      console.error('Error al obtener todas las categorías:', error);
      throw error;
    }
  }

  async getCategoriaById(categoriaId) {
    try {
      const categoria = await this.categoriaDAO.getCategoriaById(categoriaId);
      return categoria;
    } catch (error) {
      console.error('Error al obtener la categoría por ID:', error);
      throw error;
    }
  }

  async createCategoria(nombre, descripcion) {
    try {
      const nuevaCategoria = await this.categoriaDAO.createCategoria(nombre, descripcion);
      return nuevaCategoria;
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      throw error;
    }
  }

  async updateCategoria(categoriaId, nombre, descripcion) {
    try {
      const categoriaActualizada = await this.categoriaDAO.updateCategoria(categoriaId, nombre, descripcion);
      return categoriaActualizada;
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
      throw error;
    }
  }

  async deleteCategoria(categoriaId) {
    try {
      const eliminacionExitosa = await this.categoriaDAO.deleteCategoria(categoriaId);
      return eliminacionExitosa;
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
      throw error;
    }
  }
}

module.exports = categoriaController;