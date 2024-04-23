const fetch = require('node-fetch');

const manejarErrores = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

const obtenerTodosLosProductosDeOrden = async () => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/ordenproducto');
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener todos los productos de órdenes:', error);
    }
};

const obtenerProductoDeOrdenPorId = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/ordenproducto/${id}`);
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener el producto de orden por ID:', error);
    }
};

const crearProductoDeOrden = async (idOrden, idProducto, cantidadVendida, subtotal, precioVenta) => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/ordenproducto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idOrden, idProducto, cantidadVendida, subtotal, precioVenta })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al crear el producto de orden:', error);
    }
};

const actualizarProductoDeOrden = async (id, idOrden, idProducto, cantidadVendida, subtotal, precioVenta) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/ordenproducto/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idOrden, idProducto, cantidadVendida, subtotal, precioVenta })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al actualizar el producto de orden:', error);
    }
};

const eliminarProductoDeOrden = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/ordenproducto/${id}`, {
            method: 'DELETE'
        });
        manejarErrores(respuesta);
        return { message: 'Producto de orden eliminado' };
    } catch (error) {
        console.error('Error al eliminar el producto de orden:', error);
    }
};