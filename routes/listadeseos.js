const express = require('express');
const router = express.Router();
const ListaDeseosDAO = require('../MySQL/DAO/listaDeseosDAO'); 
const { ErrorHandler } = require('../MySQL/middlewares/error-handler'); 
const { validarCampos } = require('../MySQL/middlewares/validar-campos');
const { check } = require('express-validator');

router.use(validarCampos);

router.get('/', async (req, res, next) => {
  try {
    const listasDeseos = await ListaDeseosDAO.getAllListasDeseos();
    res.json(listasDeseos);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.get('/:id', [
  check('id').isNumeric().withMessage('El id debe ser numérico'),
  validarCampos
], async (req, res, next) => {
  try {
    const listaDeseos = await ListaDeseosDAO.getListaDeseosById(req.params.id);
    res.json(listaDeseos);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.post('/', [
  check('idCuenta').isNumeric().withMessage('El id de la cuenta debe ser numérico'),
  check('idProducto').isNumeric().withMessage('El id del producto debe ser numérico'),
  validarCampos
], async (req, res, next) => {
  try {
    const nuevaListaDeseos = await ListaDeseosDAO.createListaDeseos(req.body.idCuenta, req.body.idProducto);
    res.status(201).json(nuevaListaDeseos);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.put('/:id', [
  check('id').isNumeric().withMessage('El id debe ser numérico'),
  check('idCuenta').isNumeric().withMessage('El id de la cuenta debe ser numérico'),
  check('idProducto').isNumeric().withMessage('El id del producto debe ser numérico'),
  validarCampos
], async (req, res, next) => {
  try {
    const listaDeseos = await ListaDeseosDAO.updateListaDeseos(req.params.id, req.body.idCuenta, req.body.idProducto);
    res.json(listaDeseos);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.delete('/:id', [
  check('id').isNumeric().withMessage('El id debe ser numérico'),
  validarCampos
], async (req, res, next) => {
  try {
    await ListaDeseosDAO.deleteListaDeseos(req.params.id);
    res.json({ message: 'Lista de deseos eliminada' });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

module.exports = router;