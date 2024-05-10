const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const CuentaDAO = require('./MySQL/DAO/cuentaDAO');

const categoriaRouter = require('./routes/categoria');
const cuentaRouter = require('./routes/cuenta');
const listadeseosRouter = require('./routes/listadeseos');
const ordenRouter = require('./routes/orden');
const ordenproductoRouter = require('./routes/ordenproducto');
const productoRouter = require('./routes/producto');
const cors = require('cors');


app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

//JWT
const secretKey = 'mi_clave_secreta';

function generateToken(user) {
    return jwt.sign(user, secretKey, { expiresIn: '1h' });
}

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const cuentas = await CuentaDAO.getAllCuentas();
        const cuenta = cuentas.find(cuenta => {
            return cuenta.usuario === username || cuenta.email === username;
        });
        if (cuenta && cuenta.password === password) {
            const user = { username: cuenta.usuario };
            const token = generateToken(user);
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const cuentas = await CuentaDAO.getAllCuentas();
        const existingUser = cuentas.find(cuenta => cuenta.usuario === username);
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
        }
        const existingEmail = cuentas.find(cuenta => cuenta.email === email);
        if (existingEmail) {
            return res.status(400).json({ error: 'El email ya está en uso' });
        }
        const nuevaCuenta = await CuentaDAO.createCuenta(username, email, password);

        const user = { username: nuevaCuenta.usuario };
        const token = generateToken(user);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error durante el registro' });
    }
});

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado: Token no proporcionado' });
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Acceso denegado: Token no válido' });
        }
        req.user = user;
        next();
    });
}

app.get('/protegido', verifyToken, (req, res) => {
    res.json({ mensaje: 'Ruta protegida. Usuario autenticado: ' + req.user.username });
});
//JWT

app.use('/api/categoria', verifyToken, categoriaRouter);
app.use('/api/cuenta', verifyToken, cuentaRouter);
app.use('/api/listadeseos', verifyToken, listadeseosRouter);
app.use('/api/orden', verifyToken, ordenRouter);
app.use('/api/ordenproducto', verifyToken, ordenproductoRouter);
app.use('/api/producto', verifyToken, productoRouter);

app.all('*', (req, res, next) => {
    const error = new AppError(`No se pudo acceder a la ruta: ${req.originalUrl} en el servicio web`);
    next(error)
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`servidor escuchando en el puerto ${port}`)
})