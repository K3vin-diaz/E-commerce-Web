import { SessionStorageService } from "../../services/SessionStorage.service.js";

export class ProductSearchComponent extends HTMLElement {
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
        const img = './src/assets/images/'+ this.id + ".jpg"
        shadow.innerHTML += `
            <section>
                <div class="tarjeta">
                    <div class="imagen-container">
                        <img src="${img}">
                        <button class="boton-icono"><img src="./src/assets/images/heart.png"></button>
                    </div>
                    <div class="info">
                        <p id="nombre">${this.nombre}</p>
                        <p id="precio">$${this.precio}</p>
                        <div class="boton-detalles">
                            <a href="/views/product"><button class="ver-detalles" id="btn${this.id}">Ver detalles</button></a>
                        </div>
                    </div>
                </div>
            </section>
            `;

        shadow.getElementById(`btn${this.id}`).addEventListener('click', () => this.#guardarProducto(this.id));
    }

    #agregarEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/components/product-search/product-search.component.css");
        shadow.appendChild(link);
    }

    #guardarProducto(id) {
        SessionStorageService.setItem('producto', id);
    }
}