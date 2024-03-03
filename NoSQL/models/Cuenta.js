const mongoose = require('mongoose');

const listaDeseoSchema = new mongoose.Schema({
    idProducto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true,
    },
  });

const cuentaSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  listadeseos: [listaDeseoSchema],
});

module.exports = mongoose.model('Cuenta', cuentaSchema);