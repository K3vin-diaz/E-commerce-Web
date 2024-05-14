import { SessionStorageService } from "../views/src/services/SessionStorage.service.js";

export const manejarErrores = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

export const obtenerTodasLasOrdenes = async () => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch('http://localhost:3000/api/orden', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener todas las órdenes:', error);
    }
};

export const obtenerOrdenPorId = async (id) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch(`http://localhost:3000/api/orden/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener la orden por ID:', error);
    }
};

export const obtenerOrdenPorCuenta = async (idCuenta) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch(`http://localhost:3000/api/orden/cuenta/${idCuenta}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener la orden por ID:', error);
    }
};

export const crearOrden = async (fecha, idCuenta) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch('http://localhost:3000/api/orden', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ fecha, idCuenta })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al crear la orden:', error);
    }
};

export const actualizarOrden = async (id, fecha, idCuenta) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch(`http://localhost:3000/api/orden/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ fecha, idCuenta })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al actualizar la orden:', error);
    }
};

export const eliminarOrden = async (id) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch(`http://localhost:3000/api/orden/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return { message: 'Orden eliminada' };
    } catch (error) {
        console.error('Error al eliminar la orden:', error);
    }
};
