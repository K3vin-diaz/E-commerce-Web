import * as ordenProductoFetch from '../../../../fetch-api/ordenProductoFetch.js';
import { SessionStorageService } from "../../services/SessionStorage.service.js";

export class OrderPage extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.#agregaEstilo(this.shadow);
        this.listaProductos = [];

        this.id = SessionStorageService.getItem('orden');
        this.total = SessionStorageService.getItem('total');

        ordenProductoFetch.obtenerProductoDeOrdenPorOrden(this.id)
            .then(response => {
                this.listaProductos = response;
                this.#render(this.shadow);
            })
            .catch(error => {
                console.error("Error al obtener las ordenes:", error);
            });
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="cart-container">
                <h1>Orden #${this.id}</h1>
                <div class="pedidos">
                    <div class="lista">
                        ${this.listaProductos.map(producto => this.#renderCard(producto)).join('')}
                        <div class="total" id="total">
                            <h1>Total: $${this.total}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <button class="floating-button" onclick="navigateTo('/views/history')">Regresar</button>
		`;
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/pages/order/order.page.css");
        shadow.appendChild(link);
    }

    #renderCard(producto) {
        return `
            <product-order id="${producto.idproducto}"></product-order>
        `
    }
}
