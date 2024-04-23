const productoFetch = require('./fetch-api/productoFetch');

async function test() {
    try {
        // Obtener todos los productos
        console.log("Obteniendo todos los productos:");
        const todosLosProductos = await productoFetch.obtenerTodosLosProductos();
        console.log(todosLosProductos);

        // Obtener producto por ID
        console.log("\nObteniendo producto por ID:");
        const productoPorId = await productoFetch.obtenerProductoPorId(1); 
        console.log(productoPorId);

        // Crear producto
        /* console.log("\nCreando un nuevo producto:");
        const nuevoProducto = await productoFetch.crearProducto("Nombre del Producto", "Descripción del Producto", 10.99, 1);
        console.log(nuevoProducto); */

        // Actualizar producto
        console.log("\nActualizando un producto:");
        const productoActualizado = await productoFetch.actualizarProducto(5, "Nuevo Nombre222", "Nueva Descripción", 15.99, 1); 
        console.log(productoActualizado);

        // Eliminar producto
        console.log("\nEliminando un producto:");
        const resultadoEliminacion = await productoFetch.eliminarProducto(5); 
        console.log(resultadoEliminacion);
    } catch (error) {
        console.error('Error en el test:', error);
    }
}

test();