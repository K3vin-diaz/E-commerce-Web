const Orden = require('../models/Orden');

class OrdenDAO {

  constructor() { }

  async crearOrden(ordenData) {
    try {
      const orden = new Orden(ordenData);
      return await orden.save();
    } catch (error) {
      throw error;
    }
  }

  async obtenerOrdenPorId(id) {
    try {
      return await Orden.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async actualizarOrden(id, ordenData) {
    try {
      return await Orden.findByIdAndUpdate(id, ordenData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async eliminarOrden(id) {
    try {
      return await Orden.findByIdAndRemove(id);
    } catch (error) {
      throw error;
    }
  }

  async obtenerOrdenes(limit = 10) {
    try {
      return await Orden.find().limit(limit);
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new OrdenDAO();