// Controlador para la entidad listaDeseos

const ListaDeseosDAO = require('./DAO/listaDeseosDAO');

class ListaDeseosController {
  constructor(listaDeseosDAO) {
    this.listaDeseosDAO = listaDeseosDAO;
  }

  async getAllListasDeseos() {
    try {
      const listasDeseos = await this.listaDeseosDAO.getAllListasDeseos();
      return listasDeseos;
    } catch (error) {
      console.error('Error al obtener todas las listas de deseos:', error);
      throw error;
    }
  }

  async getListaDeseosById(listaDeseosId) {
    try {
      const listaDeseos = await this.listaDeseosDAO.getListaDeseosById(listaDeseosId);
      return listaDeseos;
    } catch (error) {
      console.error('Error al obtener la lista de deseos por ID:', error);
      throw error;
    }
  }

  async createListaDeseos(idCuenta, idProducto) {
    try {
      const nuevaListaDeseos = await this.listaDeseosDAO.createListaDeseos(idCuenta, idProducto);
      return nuevaListaDeseos;
    } catch (error) {
      console.error('Error al crear una nueva lista de deseos:', error);
      throw error;
    }
  }

  async updateListaDeseos(listaDeseosId, idCuenta, idProducto) {
    try {
      const listaDeseosActualizada = await this.listaDeseosDAO.updateListaDeseos(listaDeseosId, idCuenta, idProducto);
      return listaDeseosActualizada;
    } catch (error) {
      console.error('Error al actualizar la lista de deseos:', error);
      throw error;
    }
  }

  async deleteListaDeseos(listaDeseosId) {
    try {
      const eliminacionExitosa = await this.listaDeseosDAO.deleteListaDeseos(listaDeseosId);
      return eliminacionExitosa;
    } catch (error) {
      console.error('Error al eliminar la lista de deseos:', error);
      throw error;
    }
  }
}

module.exports = ListaDeseosController;