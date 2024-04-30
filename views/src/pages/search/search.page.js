import * as productoFecth from '../../../../fetch-api/productoFetch.js';

export class SearchPage extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.#agregaEstilo(this.shadow);
        window.addEventListener('buscarEvento', (event) => this.#filtrar(event.detail.busqueda));
        this.#render(this.shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <section class="search-content">
                <div class="filtros">
                    <h1>Ordenar por:</h1>
                    <select id="opciones">
                        <option value="default" selected disabled>Seleccione una opción</option>    
                        <option value="menor">Menor a mayor precio</option>
                        <option value="mayor">Mayor a menor precio</option>
                    </select>
                    
                    <h1>Categorías:</h1>
                    <div class="categorias">
                        <div class="opcion">
                            <label for="Celulares" id="1">Celulares</label>
                            <input type="checkbox" id="Celulares" name="Celulares">
                        </div>

                        <div class="opcion">
                            <label for="Laptops" id="2">Laptops</label>
                            <input type="checkbox" id="Laptops" name="Laptops">
                        </div>

                        <div class="opcion">
                            <label for="Piezas" id="3">Piezas de pc</label>
                            <input type="checkbox" id="Piezas" name="Piezas">
                        </div>

                        <div class="opcion">
                            <label for="Perifericos" id="4">Periféricos</label>
                            <input type="checkbox" id="Perifericos" name="Perifericos">
                        </div>
                    </div>
                </div>
                <div class="resultados">
                </div>
            </section>
		`;

        this.categoriasSeleccionadas = [];

        const opciones = shadow.querySelectorAll('input[type="checkbox"]');
        opciones.forEach(opcion => {
            opcion.addEventListener('click', () => {
                const categoria = opcion.parentNode.querySelector('label').id;

                if (this.categoriasSeleccionadas.includes(categoria)) {
                    this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(cat => cat !== categoria);
                } else {
                    this.categoriasSeleccionadas.push(categoria);
                }
                this.#filtrar(this.busqueda, this.categoriasSeleccionadas);
            });
        });

        const selectOrden = shadow.querySelector('#opciones');

        selectOrden.addEventListener('change', () => {
            const valorSeleccionado = selectOrden.value;

            if (valorSeleccionado === 'menor') {
                this.products.sort((a, b) => a.precio - b.precio);
            } else if (valorSeleccionado === 'mayor') {
                this.products.sort((a, b) => b.precio - a.precio);
            }

            const resultados = this.shadow.querySelector('.resultados');
            resultados.innerHTML = '';

            resultados.innerHTML = `${this.products.map(producto => this.#renderCard(producto)).join('')}`;
        });
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/pages/search/search.page.css");
        shadow.appendChild(link);
    }

    #renderCard(product) {
        return `
			<product-search id="${product.id}" nombre="${product.nombre}" descripcion="${product.descripcion}" precio="${product.precio}" categoria="${product.categoria}"></product-search>
		`
    }

    #filtrar(busqueda, categorias) {
        let categ = categorias;
        this.busqueda = busqueda;

        if (!busqueda) {
            if (!categ || categ.length === 0) {
                productoFecth.obtenerTodosLosProductos()
                    .then(listaProductos => {
                        this.products = listaProductos;
                        this.shadow.querySelector('.resultados').innerHTML = ``;
                        this.shadow.querySelector('.resultados').innerHTML = `${this.products.map(producto => this.#renderCard(producto)).join('')}`;
                    })
                    .catch(error => {
                        console.error('Ocurrió un error al obtener los productos:', error);
                    });
            } else {
                productoFecth.obtenerProductosFiltrados("DEFAULT", categ)
                    .then(listaProductos => {
                        this.products = listaProductos;
                        this.shadow.querySelector('.resultados').innerHTML = ``;
                        this.shadow.querySelector('.resultados').innerHTML = `${this.products.map(producto => this.#renderCard(producto)).join('')}`;
                    })
                    .catch(error => {
                        console.error('Ocurrió un error al obtener los productos:', error);
                    });
            }
        } else {
            if (!categ || categ.length === 0) {
                categ = [1, 2, 3, 4];
            }

            productoFecth.obtenerProductosFiltrados(busqueda, categ)
                .then(listaProductos => {
                    this.products = listaProductos;
                    this.shadow.querySelector('.resultados').innerHTML = ``;
                    this.shadow.querySelector('.resultados').innerHTML = `${this.products.map(producto => this.#renderCard(producto)).join('')}`;
                })
                .catch(error => {
                    console.error('Ocurrió un error al obtener los productos:', error);
                });

        }
    }
}
