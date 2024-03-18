const express = require('express');
const router = express.Router();
const CategoriaDAO = require('../MySQL/DAO/categoriaDAO'); 
const { validarCampos } = require('../MySQL/middlewares/validar-campos');
const { ErrorHandler } = require('../MySQL/middlewares/error-handler'); 
const { check } = require('express-validator');

// Use the middleware for all routes
router.use(validarCampos);

router.get('/', async (req, res, next) => {
  try {
    const categorias = await CategoriaDAO.getAllCategorias();
    res.json(categorias);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.get('/:id', [
  check('id').isNumeric().withMessage('El id debe ser numérico'),
  validarCampos
], async (req, res, next) => {
  try {
    const categoria = await CategoriaDAO.getCategoriaById(req.params.id);
    res.json(categoria);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.post('/', [
  check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  check('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
  validarCampos
], async (req, res, next) => {
  try {
    const nuevaCategoria = await CategoriaDAO.createCategoria(req.body.nombre, req.body.descripcion);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.put('/:id', [
  check('id').isNumeric().withMessage('El id debe ser numérico'),
  check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  check('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
  validarCampos
], async (req, res, next) => {
  try {
    const categoria = await CategoriaDAO.updateCategoria(req.params.id, req.body.nombre, req.body.descripcion);
    res.json(categoria);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

router.delete('/:id', [
  check('id').isNumeric().withMessage('El id debe ser numérico'),
  validarCampos
], async (req, res, next) => {
  try {
    await CategoriaDAO.deleteCategoria(req.params.id);
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

module.exports = router;