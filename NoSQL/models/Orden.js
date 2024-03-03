const mongoose = require('mongoose');

const ordenProductoSchema = new mongoose.Schema({
  idProducto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true,
  },
  cantidadVendida: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  precioVenta: {
    type: Number,
    required: true,
  },
});

const ordenSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  cuenta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuenta',
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  ordenproducto: [ordenProductoSchema],
});

module.exports = mongoose.model('Orden', ordenSchema);