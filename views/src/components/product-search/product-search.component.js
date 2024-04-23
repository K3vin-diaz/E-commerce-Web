import * as productoFecth from '../../../../fetch-api/productoFetch.js';

export class ProductSearchComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const productoId = this.getAttribute("producto-Id");
        const shadow = this.attachShadow({ mode: "open" });
        this.#agregarEstilo(shadow);
        this.#render(shadow, productoId, version);
        this.#consultarProductos(shadow);
    }

    #render(shadow, productoId, version) {
        shadow.innerHTML += `
            <section>
                <div class="tarjeta">
                    <div class="info">
                        <p id="nombre">...</p>
                        <p id="descripcion">...</p>
                        <p id="precio">...</p>
                        <div class="boton-detalles">
                            <button class="ver-detalles" id="btn${productoId}">Ver detalles</button>
                        </div>
                    </div>
                    <div class="imagen-container">
                        <img src="./src/assets/images/banner.png">
                        <button class="boton-icono"><img src="./src/assets/images/heart.png"></button>
                    </div>
                </div>
            </section>
            `;

        /* shadow.getElementById(`btn${product.id}`).addEventListener('click', () => this.#addToCartHandler(product)); */
    }

    #agregarEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/components/product-index/product-index.component.css");
        shadow.appendChild(link);
    }

    #consultarProductos(shadow) {
        productoFecth.obtenerTodosLosProductos()
            .then(producto => {
                let element = shadow.querySelector('#nombre');
                element.innerHTML = producto.nombre;
                let element2 = shadow.querySelector('#descripcion');
                element2.innerHTML = producto.descripcion;
                let element3 = shadow.querySelector('#precio');
                element3.innerHTML = producto.precio;
            })
    }
}