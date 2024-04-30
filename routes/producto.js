const express = require('express');
const router = express.Router();
const ProductoDAO = require('../MySQL/DAO/productoDAO'); 
const { ErrorHandler } = require('../MySQL/middlewares/error-handler'); 
const { validarCampos } = require('../MySQL/middlewares/validar-campos');
const { check } = require('express-validator');

router.use(validarCampos);

router.get('/', async (req, res, next) => {
    try {
        const productos = await ProductoDAO.getAllProductos();
        res.json(productos);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
});

router.get('/:nombre&:categorias', async (req, res, next) => {
    try {
        const productosFiltrados = await ProductoDAO.filterProductosByNombreAndCategorias(req.params.nombre, req.params.categorias);
        res.json(productosFiltrados);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
});

router.get('/:id', [
    check('id').isNumeric().withMessage('El id debe ser numérico'),
    validarCampos
], async (req, res, next) => {
    try {
        const producto = await ProductoDAO.getProductoById(req.params.id);
        res.json(producto);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
});

router.post('/', [
    check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    check('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    check('precio').isNumeric().withMessage('El precio debe ser numérico'),
    check('idCategoria').isNumeric().withMessage('El id de la categoría debe ser numérico'),
    validarCampos
], async (req, res, next) => {
    try {
        const nuevoProducto = await ProductoDAO.createProducto(req.body.nombre, req.body.descripcion, req.body.precio, req.body.idCategoria);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
});

router.put('/:id', [
    check('id').isNumeric().withMessage('El id debe ser numérico'),
    check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    check('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    check('precio').isNumeric().withMessage('El precio debe ser numérico'),
    check('idCategoria').isNumeric().withMessage('El id de la categoría debe ser numérico'),
    validarCampos
], async (req, res, next) => {
    try {
        const producto = await ProductoDAO.updateProducto(req.params.id, req.body.nombre, req.body.descripcion, req.body.precio, req.body.idCategoria);
        res.json(producto);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
});

router.delete('/:id', [
    check('id').isNumeric().withMessage('El id debe ser numérico'),
    validarCampos
], async (req, res, next) => {
    try {
        await ProductoDAO.deleteProducto(req.params.id);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
});

module.exports = router;