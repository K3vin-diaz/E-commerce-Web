import * as productoFecth from '../../../../fetch-api/productoFetch.js';

export class SearchPage extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.#agregaEstilo(this.shadow);
        productoFecth.obtenerTodosLosProductos()
            .then(listaProductos => {
                this.products = listaProductos;
                this.#render(this.shadow);
            })
            .catch(error => {
                console.error('Ocurrió un error al obtener los productos:', error);
            });
    }

    #render(shadow) {
        shadow.innerHTML += `
            <section class="search-content">
                <div class="filtros">
                    <h1>Ordenar por:</h1>
                    <select id="opciones">
                        <option value="menor">Menor a mayor precio</option>
                        <option value="mayor">Mayor a menor precio</option>
                    </select>
                    
                    <h1>Categorías:</h1>
                    <div class="categorias">
                        <div class="opcion">
                            <label for="Celulares">Celulares</label>
                            <input type="checkbox" id="Celulares" name="Celulares">
                        </div>

                        <div class="opcion">
                            <label for="Laptops">Laptops</label>
                            <input type="checkbox" id="Laptops" name="Laptops">
                        </div>

                        <div class="opcion">
                            <label for="Piezas">Piezas de pc</label>
                            <input type="checkbox" id="Piezas" name="Piezas">
                        </div>

                        <div class="opcion">
                            <label for="Perifericos">Periféricos</label>
                            <input type="checkbox" id="Perifericos" name="Perifericos">
                        </div>
                    </div>
                </div>
                <div class="resultados">
                    ${this.products.map(producto => this.#renderCard(producto)).join('')}
                </div>
            </section>
		`;
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
}
