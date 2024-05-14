const express = require('express');
const router = express.Router();
const OrdenDAO = require('../MySQL/DAO/ordenDAO');
const { ErrorHandler } = require('../MySQL/middlewares/error-handler');
const { validarCampos } = require('../MySQL/middlewares/validar-campos');
const { check } = require('express-validator');

router.use(validarCampos);

router.get('/', async (req, res, next) => {
  try {
    const ordenes = await OrdenDAO.getAllOrdenes();
    res.json(ordenes);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.get('/cuenta/:idCuenta', [
  check('idCuenta').isNumeric().withMessage('El id debe ser numérico'),
  validarCampos
], async (req, res, next) => {
  try {
    const ordenes = await OrdenDAO.getAllOrdenesCuenta(req.params.idCuenta);
    res.json(ordenes);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.get('/:id', [
  check('id').isNumeric().withMessage('El id debe ser numérico'),
  validarCampos
], async (req, res, next) => {
  try {
    const orden = await OrdenDAO.getOrdenById(req.params.id);
    res.json(orden);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.post('/', [
  check('fecha').notEmpty().withMessage('La fecha es obligatoria'),
  check('idCuenta').isNumeric().withMessage('El id de la cuenta debe ser numérico'),
  validarCampos
], async (req, res, next) => {
  try {
    const nuevaOrden = await OrdenDAO.createOrden(req.body.fecha, req.body.idCuenta);
    res.status(201).json(nuevaOrden);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.put('/:id', [
  check('id').isNumeric().withMessage('El id debe ser numérico'),
  check('fecha').notEmpty().withMessage('La fecha es obligatoria'),
  check('idCuenta').isNumeric().withMessage('El id de la cuenta debe ser numérico'),
  validarCampos
], async (req, res, next) => {
  try {
    const orden = await OrdenDAO.updateOrden(req.params.id, req.body.fecha, req.body.idCuenta);
    res.json(orden);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.delete('/:id', [
  check('id').isNumeric().withMessage('El id debe ser numérico'),
  validarCampos
], async (req, res, next) => {
  try {
    await OrdenDAO.deleteOrden(req.params.id);
    res.json({ message: 'Orden eliminada' });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

module.exports = router;