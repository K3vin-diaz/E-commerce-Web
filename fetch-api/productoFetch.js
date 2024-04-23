const fetch = require('node-fetch');

const manejarErrores = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

const obtenerTodosLosProductos = async () => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/producto');
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener todos los productos:', error);
    }
};

const obtenerProductoPorId = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/producto/${id}`);
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener el producto por ID:', error);
    }
};

const crearProducto = async (nombre, descripcion, precio, idCategoria) => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, descripcion, precio, idCategoria })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al crear el producto:', error);
    }
};

const actualizarProducto = async (id, nombre, descripcion, precio, idCategoria) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/producto/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, descripcion, precio, idCategoria })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
    }
};

const eliminarProducto = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/producto/${id}`, {
            method: 'DELETE'
        });
        manejarErrores(respuesta);
        return { message: 'Producto eliminado' };
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
};
