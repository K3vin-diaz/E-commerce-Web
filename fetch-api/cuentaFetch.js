
const manejarErrores = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

const obtenerTodasLasCuentas = async () => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/cuenta');
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener todas las cuentas:', error);
    }
};

const obtenerCuentaPorId = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/cuenta/${id}`);
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener la cuenta por ID:', error);
    }
};

const crearCuenta = async (usuario, email, password) => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/cuenta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, email, password })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al crear la cuenta:', error);
    }
};

const actualizarCuenta = async (id, usuario, email, password) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/cuenta/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, email, password })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al actualizar la cuenta:', error);
    }
};

const eliminarCuenta = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/cuenta/${id}`, {
            method: 'DELETE'
        });
        manejarErrores(respuesta);
        return { message: 'Cuenta eliminada' };
    } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
    }
};

module.exports = {
    obtenerTodasLasCuentas,
    obtenerCuentaPorId,
    crearCuenta,
    actualizarCuenta,
    eliminarCuenta
};