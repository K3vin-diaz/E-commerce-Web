
const manejarErrores = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

const obtenerTodasLasOrdenes = async () => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/orden');
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener todas las órdenes:', error);
    }
};

const obtenerOrdenPorId = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/orden/${id}`);
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener la orden por ID:', error);
    }
};

const crearOrden = async (fecha, idCuenta) => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/orden', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fecha, idCuenta })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al crear la orden:', error);
    }
};

const actualizarOrden = async (id, fecha, idCuenta) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/orden/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fecha, idCuenta })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al actualizar la orden:', error);
    }
};

const eliminarOrden = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/orden/${id}`, {
            method: 'DELETE'
        });
        manejarErrores(respuesta);
        return { message: 'Orden eliminada' };
    } catch (error) {
        console.error('Error al eliminar la orden:', error);
    }
};
module.exports = {
    obtenerTodasLasOrdenes,
    obtenerOrdenPorId,
    crearOrden,
    actualizarOrden,
    eliminarOrden
};
