const Categoria = require('../models/Categoria');

class CategoriaDAO {

  constructor() { }

  async crearCategoria(categoriaData) {
    try {
      const categoria = new Categoria(categoriaData);
      return await categoria.save();
    } catch (error) {
      throw error;
    }
  }

  async obtenerCategoriaPorId(id) {
    try {
      return await Categoria.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async actualizarCategoria(id, categoriaData) {
    try {
      return await Categoria.findByIdAndUpdate(id, categoriaData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async eliminarCategoria(id) {
    try {
      return await Categoria.findByIdAndRemove(id);
    } catch (error) {
      throw error;
    }
  }

  async obtenerCategorias(limit = 10) {
    try {
      return await Categoria.find().limit(limit);
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new CategoriaDAO();