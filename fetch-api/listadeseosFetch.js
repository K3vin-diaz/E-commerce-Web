
const manejarErrores = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

const obtenerTodasLasListasDeseos = async () => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/listadeseos');
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener todas las listas de deseos:', error);
    }
};

const obtenerListaDeseosPorId = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/listadeseos/${id}`);
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener la lista de deseos por ID:', error);
    }
};

const crearListaDeseos = async (idCuenta, idProducto) => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/listadeseos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idCuenta, idProducto })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al crear la lista de deseos:', error);
    }
};

const actualizarListaDeseos = async (id, idCuenta, idProducto) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/listadeseos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idCuenta, idProducto })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al actualizar la lista de deseos:', error);
    }
};

const eliminarListaDeseos = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/listadeseos/${id}`, {
            method: 'DELETE'
        });
        manejarErrores(respuesta);
        return { message: 'Lista de deseos eliminada' };
    } catch (error) {
        console.error('Error al eliminar la lista de deseos:', error);
    }
};

module.exports = {
    obtenerTodasLasListasDeseos,
    obtenerListaDeseosPorId,
    crearListaDeseos,
    actualizarListaDeseos,
    eliminarListaDeseos
};