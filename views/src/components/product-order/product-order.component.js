import { SessionStorageService } from "../../services/SessionStorage.service.js";
import * as productFetch from '../../../../fetch-api/productoFetch.js';

export class ProductOrderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.id = this.getAttribute('id');
        this.nombre = this.getAttribute('nombre');
        this.precio = this.getAttribute('precio');
        const shadow = this.attachShadow({ mode: "open" });
        
        productFetch.obtenerProductoPorId(this.id)
            .then(response => {
                this.nombre = response.nombre;
                this.precio = response.precio;
                this.#agregarEstilo(shadow);
                this.#render(shadow);
            })
            .catch(error => {
                console.error("Error al obtener las ordenes:", error);
            });
    }

    #render(shadow) {
        const img = './src/assets/images/'+ this.id + ".jpg"
        shadow.innerHTML += `
            <section>
                <div class="tarjeta">
                    <div class="imagen-container">
                        <img src="${img}">
                    </div>
                    <div class="info">
                        <p id="nombre">${this.nombre}</p>
                        <p id="precio">$${this.precio}</p>
                    </div>
                </div>
                <div class="salto">
                </div>
            </section>
            `;
    }

    #agregarEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/components/product-cart/product-cart.component.css");
        shadow.appendChild(link);
    }

}