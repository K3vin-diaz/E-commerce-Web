  const CuentaDAO = require('./DAO/cuentaDAO.js');
  const CategoriaDAO = require('./DAO/categoriaDAO.js');
  const ProductoDAO = require('./DAO/productoDAO.js');
  const ListaDeseosDAO = require('./DAO/listaDeseosDAO.js');
  const OrdenProductoDAO = require('./DAO/ordenProductoDAO.js');
  const OrdenDAO = require('./DAO/ordenDAO.js');



  async function main() {

    // Probar la clase CategoriaDAO
    try {
      // Crear una nueva categoría
      const nuevaCategoria = await CategoriaDAO.createCategoria('Categoria de prueba', 'Descripción de prueba');
      console.log('Nueva categoría creada:', nuevaCategoria);
      // const nuevaCategoria2 = await CategoriaDAO.createCategoria('Categoria de prueba2', 'Descripción de prueba');


      // // Obtener todas las categorías
      // const todasLasCategorias = await CategoriaDAO.getAllCategorias();
      // console.log('Todas las categorías:', todasLasCategorias);

      // // Obtener una categoría por ID
      // const categoriaPorId = await CategoriaDAO.getCategoriaById(nuevaCategoria.id);
      // console.log('Categoría por ID:', categoriaPorId);

      // // Actualizar una categoría
      // const categoriaActualizada = await CategoriaDAO.updateCategoria(nuevaCategoria.id, 'Nueva categoría', 'Nueva descripción');
      // console.log('Categoría actualizada:', categoriaActualizada);

      // // Eliminar una categoría
      // const eliminacionExitosa = await CategoriaDAO.deleteCategoria(nuevaCategoria.id);
      // console.log('Eliminación exitosa:', eliminacionExitosa);

      // // Obtener todas las categorías después de la eliminación
      // const categoriasDespuesDeEliminacion = await CategoriaDAO.getAllCategorias();
      // console.log('Categorías después de la eliminación:', categoriasDespuesDeEliminacion);
    } catch (error) {
      console.error('Error en el main:', error.message);
    }

  // // Probar la clase CuentaDAO
  // try {
  //   // Crear una nueva cuenta
  //   const nuevaCuenta = await CuentaDAO.createCuenta('usuario1', 'usuario1@example.com', 'password123');
  //   console.log('Nueva cuenta creada:', nuevaCuenta);
  //   const nuevaCuenta2 = await CuentaDAO.createCuenta('usuario2', 'usuario2@example.com', 'pass');

  //   // Obtener todas las cuentas
  //   const todasLasCuentas = await CuentaDAO.getAllCuentas();
  //   console.log('Todas las cuentas:', todasLasCuentas);

  //   // Obtener una cuenta por ID
  //   const cuentaPorId = await CuentaDAO.getCuentaById(nuevaCuenta.id);
  //   console.log('Cuenta por ID:', cuentaPorId);

  //   // Actualizar una cuenta
  //   const cuentaActualizada = await CuentaDAO.updateCuenta(nuevaCuenta.id, 'usuario1_actualizado', 'nuevo_correo@example.com', 'nueva_password');
  //   console.log('Cuenta actualizada:', cuentaActualizada);

  //   // Eliminar una cuenta
  //   const eliminacionExitosa = await CuentaDAO.deleteCuenta(nuevaCuenta.id);
  //   console.log('Eliminación exitosa:', eliminacionExitosa);

  //   // Obtener todas las cuentas después de la eliminación
  //   const cuentasDespuesDeEliminacion = await CuentaDAO.getAllCuentas();
  //   console.log('Cuentas después de la eliminación:', cuentasDespuesDeEliminacion);
  // } catch (error) {
  //   console.error('Error en el main:', error.message);
  // }

  // // Probar la clase orden
  // try {
  //   // Crear una nueva orden
  //   const nuevaOrden = await OrdenDAO.createOrden('2024-02-22', 2);
  //   const nuevaOrden2 = await OrdenDAO.createOrden('2024-02-25', 2);
  //   console.log('Nueva orden creada:', nuevaOrden);

  //   // Obtener todas las órdenes
  //   const todasLasOrdenes = await OrdenDAO.getAllOrdenes();
  //   console.log('Todas las órdenes:', todasLasOrdenes);

  //   // Obtener una orden por ID
  //   const ordenPorId = await OrdenDAO.getOrdenById(nuevaOrden.id);
  //   console.log('Orden por ID:', ordenPorId);

  //   // Actualizar una orden
  //   const ordenActualizada = await OrdenDAO.updateOrden(nuevaOrden.id, '2024-02-23', 2);

  //   // Eliminar una orden
  //   const eliminacionExitosa = await OrdenDAO.deleteOrden(nuevaOrden.id);
  //   console.log('Eliminación exitosa:', eliminacionExitosa);

  //   // Obtener todas las órdenes después de la eliminación
  //   const ordenesDespuesDeEliminacion = await OrdenDAO.getAllOrdenes();
  //   console.log('Órdenes después de la eliminación:', ordenesDespuesDeEliminacion);
  // } catch (error) {
  //   console.error('Error en el main:', error.message);
  // }


  // // Probar la clase Producto
  // try {
  //   // Crear un nuevo producto
  //   const nuevoProducto = await ProductoDAO.createProducto('Producto de prueba', 'Descripción de prueba', 399.99, 1);
  //   console.log('Nuevo producto creado:', nuevoProducto);
  //   const nuevoProducto2 = await ProductoDAO.createProducto('Producto de prueba2', 'Descripción de prueba', 599.99, 1);
  //   const nuevoProducto3 = await ProductoDAO.createProducto('Producto de prueba3', 'Descripción de prueba', 799.99, 1);

  //   // Obtener todos los productos
  //   const todosLosProductos = await ProductoDAO.getAllProductos();
  //   console.log('Todos los productos:', todosLosProductos);

  //   // Obtener un producto por ID
  //   const productoPorId = await ProductoDAO.getProductoById(nuevoProducto.id);
  //   console.log('Producto por ID:', productoPorId);

  //   // Actualizar un producto
  //   const productoActualizado = await ProductoDAO.updateProducto(nuevoProducto.id, 'Nuevo producto', 'Nueva descripción', 29.99, 2);
  //   console.log('Producto actualizado:', productoActualizado);

  //   // Eliminar un producto
  //   const eliminacionExitosa = await ProductoDAO.deleteProducto(nuevoProducto.id);
  //   console.log('Eliminación exitosa:', eliminacionExitosa);

  //   // Obtener todos los productos después de la eliminación
  //   const productosDespuesDeEliminacion = await ProductoDAO.getAllProductos();
  //   console.log('Productos después de la eliminación:', productosDespuesDeEliminacion);
  // } catch (error) {
  //   console.error('Error en el main:', error.message);
  // }

  // // Probar la clase listaDeseos
  // try {
  //   // Crear una nueva lista de deseos
  //   const nuevaListaDeseos = await ListaDeseosDAO.createListaDeseos(2, 2);
  //   console.log('Nueva lista de deseos creada:', nuevaListaDeseos);
  //   const nuevaListaDeseos2 = await ListaDeseosDAO.createListaDeseos(2, 2);
  //   // Obtener todas las listas de deseos
  //   const todasLasListasDeseos = await ListaDeseosDAO.getAllListasDeseos();
  //   console.log('Todas las listas de deseos:', todasLasListasDeseos);

  //   // Obtener una lista de deseos por ID
  //   const listaDeseosPorId = await ListaDeseosDAO.getListaDeseosById(nuevaListaDeseos.id);
  //   console.log('Lista de deseos por ID:', listaDeseosPorId);

  //   // Actualizar una lista de deseos
  //   const listaDeseosActualizada = await ListaDeseosDAO.updateListaDeseos(nuevaListaDeseos.id, 2, 3);
  //   console.log('Lista de deseos actualizada:', listaDeseosActualizada);

  //   // Eliminar una lista de deseos
  //   const eliminacionExitosa = await ListaDeseosDAO.deleteListaDeseos(nuevaListaDeseos.id);
  //   console.log('Eliminación exitosa:', eliminacionExitosa);

  //   // Obtener todas las listas de deseos después de la eliminación
  //   const listasDeseosDespuesDeEliminacion = await ListaDeseosDAO.getAllListasDeseos();
  //   console.log('Listas de deseos después de la eliminación:', listasDeseosDespuesDeEliminacion);
  // } catch (error) {
  //   console.error('Error en el main:', error.message);
  // }

  // // Probar la clase ordenProductos
  // try {
  //   // Crear un nuevo producto de la orden
  //   const nuevoOrdenProducto = await OrdenProductoDAO.createOrdenProducto(2, 2, 1, 539.00, 500.00);
  //   console.log('Nuevo producto de la orden creado:', nuevoOrdenProducto);

  //   // Obtener todos los productos de la orden
  //   const todosLosOrdenProductos = await OrdenProductoDAO.getAllOrdenProductos();
  //   console.log('Todos los productos de la orden:', todosLosOrdenProductos);

  //   // Obtener un producto de la orden por ID
  //   const ordenProductoPorId = await OrdenProductoDAO.getOrdenProductoById(nuevoOrdenProducto.id);
  //   console.log('Producto de la orden por ID:', ordenProductoPorId);

  //   // Actualizar un producto de la orden
  //   const ordenProductoActualizado = await OrdenProductoDAO.updateOrdenProducto(nuevoOrdenProducto.id, 2, 2, 3, 1000.99, 1300.00);
  //   console.log('Producto de la orden actualizado:', ordenProductoActualizado);

  //   // Eliminar un producto de la orden
  //   const eliminacionExitosa = await OrdenProductoDAO.deleteOrdenProducto(nuevoOrdenProducto.id);
  //   console.log('Eliminación exitosa:', eliminacionExitosa);

  //   // Obtener todos los productos de la orden después de la eliminación
  //   const ordenProductosDespuesDeEliminacion = await OrdenProductoDAO.getAllOrdenProductos();
  //   console.log('Productos de la orden después de la eliminación:', ordenProductosDespuesDeEliminacion);
  // } catch (error) {
  //   console.error('Error en el main:', error.message);
  // }



}

// Ejecutar el método main
main();