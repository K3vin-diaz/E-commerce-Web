export const manejarErrores = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

export const obtenerTodosLosProductos = async () => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/producto');
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener todos los productos:', error);
    }
};

export const obtenerProductoPorId = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/producto/${id}`);
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener el producto por ID:', error);
    }
};

export const crearProducto = async (nombre, descripcion, precio, idCategoria) => {
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

export const actualizarProducto = async (id, nombre, descripcion, precio, idCategoria) => {
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

export const eliminarProducto = async (id) => {
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
