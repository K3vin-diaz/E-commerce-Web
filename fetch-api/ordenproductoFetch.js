import { SessionStorageService } from "../views/src/services/SessionStorage.service.js";

export const manejarErrores = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

export const obtenerTodosLosProductosDeOrden = async () => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch('http://localhost:3000/api/ordenproducto', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener todos los productos de órdenes:', error);
    }
};

export const obtenerProductoDeOrdenPorId = async (id) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch(`http://localhost:3000/api/ordenproducto/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener el producto de orden por ID:', error);
    }
};

export const obtenerProductoDeOrdenPorOrden = async (ordenId) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch(`http://localhost:3000/api/ordenproducto/orden/${ordenId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener el producto de orden por ID:', error);
    }
};

export const crearProductoDeOrden = async (idOrden, idProducto, cantidadVendida, subtotal, precioVenta) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch('http://localhost:3000/api/ordenproducto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ idOrden, idProducto, cantidadVendida, subtotal, precioVenta })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al crear el producto de orden:', error);
    }
};

export const actualizarProductoDeOrden = async (id, idOrden, idProducto, cantidadVendida, subtotal, precioVenta) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch(`http://localhost:3000/api/ordenproducto/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ idOrden, idProducto, cantidadVendida, subtotal, precioVenta })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al actualizar el producto de orden:', error);
    }
};

export const eliminarProductoDeOrden = async (id) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch(`http://localhost:3000/api/ordenproducto/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return { message: 'Producto de orden eliminado' };
    } catch (error) {
        console.error('Error al eliminar el producto de orden:', error);
    }
};