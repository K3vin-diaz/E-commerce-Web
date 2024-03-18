const express = require('express');
const router = express.Router();
const CuentaDAO = require('../MySQL/DAO/cuentaDAO'); 
const { ErrorHandler } = require('../MySQL/middlewares/error-handler');
const { validarCampos } = require('../MySQL/middlewares/validar-campos');
const { check } = require('express-validator');

router.use(validarCampos);

router.get('/', async (req, res, next) => {
  try {
    const cuentas = await CuentaDAO.getAllCuentas();
    res.json(cuentas);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.get('/:id', [
  check('id').isNumeric().withMessage('El id debe ser numérico'),
  validarCampos
], async (req, res, next) => {
  try {
    const cuenta = await CuentaDAO.getCuentaById(req.params.id);
    res.json(cuenta);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.post('/', [
  check('usuario').notEmpty().withMessage('El usuario es obligatorio'),
  check('email').isEmail().withMessage('El email debe ser válido'),
  check('password').isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres'),
  validarCampos
], async (req, res, next) => {
  try {
    const nuevaCuenta = await CuentaDAO.createCuenta(req.body.usuario, req.body.email, req.body.password);
    res.status(201).json(nuevaCuenta);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.put('/:id', [
  check('id').isNumeric().withMessage('El id debe ser numérico'),
  check('usuario').notEmpty().withMessage('El usuario es obligatorio'),
  check('email').isEmail().withMessage('El email debe ser válido'),
  check('password').isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres'),
  validarCampos
], async (req, res, next) => {
  try {
    const cuenta = await CuentaDAO.updateCuenta(req.params.id, req.body.usuario, req.body.email, req.body.password);
    res.json(cuenta);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.delete('/:id', [
  check('id').isNumeric().withMessage('El id debe ser numérico'),
  validarCampos
], async (req, res, next) => {
  try {
    await CuentaDAO.deleteCuenta(req.params.id);
    res.json({ message: 'Cuenta eliminada' });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

module.exports = router;