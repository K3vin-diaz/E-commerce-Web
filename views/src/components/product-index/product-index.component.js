import * as productoFecth from '../../../../fetch-api/productoFetch.js';

export class ProductIndexComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const productoId = this.getAttribute("producto-Id");
        const version = this.getAttribute("version");
        const shadow = this.attachShadow({ mode: "open" });
        this.#agregarEstilo(shadow);
        this.#render(shadow, productoId, version);
        this.#consultaProducto(productoId, shadow);
    }

    #render(shadow, productoId, version) {
        if (version === "1") {
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
            `
        } else {
            shadow.innerHTML += `
            <section>
                <div class="tarjeta">
                    <div class="imagen-container">
                        <img src="./src/assets/images/banner.png">
                        <button class="boton-icono"><img src="./src/assets/images/heart.png"></button>
                    </div>
                    <div class="info">
                        <p id="nombre"  class="version2">...</p>
                        <p id="descripcion"  class="version2">...</p>
                        <p id="precio"  class="version2">...</p>
                        <div class="version2">
                            <button class="ver-detalles" id="btn${productoId}">Ver detalles</button>
                        </div>
                    </div>
                </div>
            </section>
            `
        }


        /* shadow.getElementById(`btn${product.id}`).addEventListener('click', () => this.#addToCartHandler(product)); */
    }

    #agregarEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/components/product-index/product-index.component.css");
        shadow.appendChild(link);
    }

    #consultaProducto(productoId, shadow) {
        productoFecth.obtenerProductoPorId(productoId)
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