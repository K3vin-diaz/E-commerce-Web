const express = require('express');
const app = express();
const morgan = require('morgan');

const categoriaRouter = require('./routes/categoria');
const cuentaRouter = require('./routes/cuenta');
const listadeseosRouter = require('./routes/listadeseos');
const ordenRouter = require('./routes/orden');
const ordenproductoRouter = require('./routes/ordenproducto');
const productoRouter = require('./routes/producto');

app.use(express.json());
app.use(morgan('combined'));

app.use('/api/categoria', categoriaRouter);
app.use('/api/cuenta', cuentaRouter);
app.use('/api/listadeseos', listadeseosRouter);
app.use('/api/orden', ordenRouter);
app.use('/api/ordenproducto', ordenproductoRouter);
app.use('/api/producto', productoRouter);

app.all('*', (req, res, next) => {
    const error = new AppError(`No se pudo acceder a la ruta: ${req.originalUrl} en el servicio web`);
    next(error)
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`servidor escuchando en el puerto ${port}`)
})