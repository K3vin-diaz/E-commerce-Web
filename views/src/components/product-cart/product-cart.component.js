import { SessionStorageService } from "../../services/SessionStorage.service.js";

export class ProductCartComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.id = this.getAttribute('id');
        this.nombre = this.getAttribute('nombre');
        this.descripcion = this.getAttribute('descripcion');
        this.precio = this.getAttribute('precio');
        const categoria = this.getAttribute('categoria');
        const shadow = this.attachShadow({ mode: "open" });
        this.#agregarEstilo(shadow);
        this.#render(shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <section>
                <div class="tarjeta">
                    <div class="imagen-container">
                        <img src="./src/assets/images/banner.png">
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

    #guardarProducto(id) {
        SessionStorageService.setItem('producto', id);
    }
}