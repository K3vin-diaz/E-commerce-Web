import { SessionStorageService } from "../views/src/services/SessionStorage.service.js";

const manejarErrores = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

const obtenerTodasLasCategorias = async () => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch('http://localhost:3000/api/categoria', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
    }
};

const obtenerCategoriaPorId = async (id) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch(`http://localhost:3000/api/categoria/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener la categoría por ID:', error);
    }
};

const crearCategoria = async (nombre, descripcion) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch('http://localhost:3000/api/categoria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nombre, descripcion })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al crear la categoría:', error);
    }
};

const actualizarCategoria = async (id, nombre, descripcion) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch(`http://localhost:3000/api/categoria/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nombre, descripcion })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
    }
};

const eliminarCategoria = async (id) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch(`http://localhost:3000/api/categoria/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return { message: 'Categoría eliminada' };
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
    }
};

module.exports = {
    obtenerTodasLasCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};