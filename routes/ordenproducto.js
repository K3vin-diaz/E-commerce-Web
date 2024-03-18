const express = require('express');
const router = express.Router();
const OrdenProductoDAO = require('../MySQL/DAO/ordenProductoDAO'); 
const { ErrorHandler } = require('../MySQL/middlewares/error-handler');
const { validarCampos } = require('../MySQL/middlewares/validar-campos');
const { check } = require('express-validator');

router.use(validarCampos);

router.get('/', async (req, res, next) => {
    try {
        const ordenProductos = await OrdenProductoDAO.getAllOrdenProductos();
        res.json(ordenProductos);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
});

router.get('/:id', [
    check('id').isNumeric().withMessage('El id debe ser numérico'),
    validarCampos
], async (req, res, next) => {
    try {
        const ordenProducto = await OrdenProductoDAO.getOrdenProductoById(req.params.id);
        res.json(ordenProducto);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
});

router.post('/', [
    check('idOrden').isNumeric().withMessage('El id de la orden debe ser numérico'),
    check('idProducto').isNumeric().withMessage('El id del producto debe ser numérico'),
    check('cantidadVendida').isNumeric().withMessage('La cantidad vendida debe ser numérica'),
    check('subtotal').isNumeric().withMessage('El subtotal debe ser numérico'),
    check('precioVenta').isNumeric().withMessage('El precio de venta debe ser numérico'),
    validarCampos
], async (req, res, next) => {
    try {
        const nuevoOrdenProducto = await OrdenProductoDAO.createOrdenProducto(req.body.idOrden, req.body.idProducto, req.body.cantidadVendida, req.body.subtotal, req.body.precioVenta);
        res.status(201).json(nuevoOrdenProducto);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
});

router.put('/:id', [
    check('id').isNumeric().withMessage('El id debe ser numérico'),
    check('idOrden').isNumeric().withMessage('El id de la orden debe ser numérico'),
    check('idProducto').isNumeric().withMessage('El id del producto debe ser numérico'),
    check('cantidadVendida').isNumeric().withMessage('La cantidad vendida debe ser numérica'),
    check('subtotal').isNumeric().withMessage('El subtotal debe ser numérico'),
    check('precioVenta').isNumeric().withMessage('El precio de venta debe ser numérico'),
    validarCampos
], async (req, res, next) => {
    try {
        const ordenProducto = await OrdenProductoDAO.updateOrdenProducto(req.params.id, req.body.idOrden, req.body.idProducto, req.body.cantidadVendida, req.body.subtotal, req.body.precioVenta);
        res.json(ordenProducto);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
});

router.delete('/:id', [
    check('id').isNumeric().withMessage('El id debe ser numérico'),
    validarCampos
], async (req, res, next) => {
    try {
        await OrdenProductoDAO.deleteOrdenProducto(req.params.id);
        res.json({ message: 'Producto de la orden eliminado' });
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
});

module.exports = router;