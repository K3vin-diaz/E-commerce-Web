const express = require('express');
const app = express();
app.use(express.json());

const CuentaDAO = require('./dao/CuentaDAO');
// Importa tus otros DAOs aquí

app.post('/cuenta', async (req, res) => {
  try {
    const cuenta = await CuentaDAO.crearCuenta(req.body);
    res.json(cuenta);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.get('/cuenta/:id', async (req, res) => {
  try {
    const cuenta = await CuentaDAO.obtenerCuentaPorId(req.params.id);
    res.json(cuenta);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.put('/cuenta/:id', async (req, res) => {
  try {
    const cuenta = await CuentaDAO.actualizarCuenta(req.params.id, req.body);
    res.json(cuenta);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.delete('/cuenta/:id', async (req, res) => {
  try {
    const cuenta = await CuentaDAO.eliminarCuenta(req.params.id);
    res.json(cuenta);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.get('/cuenta', async (req, res) => {
  try {
    const cuentas = await CuentaDAO.obtenerCuentas();
    res.json(cuentas);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// Repite el proceso para tus otros modelos aquí

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));