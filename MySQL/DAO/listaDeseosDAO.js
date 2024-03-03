const { ListaDeseos } = require('./models'); // Ajusta la ruta según la ubicación de tu modelo

class ListaDeseosDAO {
  static async getAllListasDeseos() {
    try {
      const listasDeseos = await ListaDeseos.findAll();
      return listasDeseos;
    } catch (error) {
      throw new Error(`Error al obtener todas las listas de deseos: ${error.message}`);
    }
  }

  static async getListaDeseosById(id) {
    try {
      const listaDeseos = await ListaDeseos.findByPk(id);
      return listaDeseos;
    } catch (error) {
      throw new Error(`Error al obtener la lista de deseos por ID: ${error.message}`);
    }
  }

  static async createListaDeseos(idCuenta, idProducto) {
    try {
      const nuevaListaDeseos = await ListaDeseos.create({ idcuenta: idCuenta, idproducto: idProducto });
      return nuevaListaDeseos;
    } catch (error) {
      throw new Error(`Error al crear una nueva lista de deseos: ${error.message}`);
    }
  }

  static async updateListaDeseos(id, idCuenta, idProducto) {
    try {
      const listaDeseos = await ListaDeseos.findByPk(id);
      if (listaDeseos) {
        await listaDeseos.update({ idcuenta: idCuenta, idproducto: idProducto });
        return listaDeseos;
      } else {
        throw new Error('Lista de deseos no encontrada');
      }
    } catch (error) {
      throw new Error(`Error al actualizar la lista de deseos: ${error.message}`);
    }
  }

  static async deleteListaDeseos(id) {
    try {
      const listaDeseos = await ListaDeseos.findByPk(id);
      if (listaDeseos) {
        await listaDeseos.destroy();
        return true; // Indicar que la eliminación fue exitosa
      } else {
        throw new Error('Lista de deseos no encontrada');
      }
    } catch (error) {
      throw new Error(`Error al eliminar la lista de deseos: ${error.message}`);
    }
  }
}

module.exports = ListaDeseosDAO;
