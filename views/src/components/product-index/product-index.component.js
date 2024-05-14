import * as productoFecth from '../../../../fetch-api/productoFetch.js';
import { SessionStorageService } from "../../services/SessionStorage.service.js";

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
            const img = './src/assets/images/'+ productoId + ".jpg"
            shadow.innerHTML += `
            <section>
                <div class="tarjeta">
                    <div class="info">
                        <p id="nombre">...</p>
                        <p id="descripcion">...</p>
                        <p id="precio">...</p>
                        <a href="/views/product" class="ver-detalles" id="btn${productoId}">Ver detalles</a>
                    </div>
                    <div class="imagen-container">
                        <img src="${img}">
                        <button class="boton-icono" id="i${productoId}"><img src="./src/assets/images/heart.png"></button>
                    </div>
                </div>
            </section>
            `
        } else {
            const img = './src/assets/images/'+ productoId + ".jpg"
            shadow.innerHTML += `
            <section>
                <div class="tarjeta">
                    <div class="imagen-container">
                        <img src="${img}">
                        <button class="boton-icono" id="i${productoId}"><img src="./src/assets/images/heart.png"></button>
                    </div>
                    <div class="info">
                        <p id="nombre"  class="version2">...</p>
                        <p id="descripcion"  class="version2">...</p>
                        <p id="precio"  class="version2">...</p>
                        <div class="version2">
                            <a href="/views/product" class="ver-detalles" id="btn${productoId}">Ver detalles</a>
                        </div>
                    </div>
                </div>
            </section>
            `;
        }
        if(!SessionStorageService.getItem('token')){
            shadow.getElementById(`i${productoId}`).remove();
        }
        shadow.getElementById(`btn${productoId}`).addEventListener('click', () => this.#guardarProducto(productoId));
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
                element3.innerHTML = "$" + producto.precio;
            })
    }

    #guardarProducto(id) {
        SessionStorageService.setItem('producto', id);
    }
}