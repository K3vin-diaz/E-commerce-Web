import { SessionStorageService } from "../../services/SessionStorage.service.js";
import * as ordenProductoFetch from '../../../../fetch-api/ordenProductoFetch.js';

export class OrderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.id = this.getAttribute('id');
        this.fecha = this.#formatDate(this.getAttribute('fecha'));
        this.total = 0;
        const shadow = this.attachShadow({ mode: "open" });

        ordenProductoFetch.obtenerProductoDeOrdenPorOrden(this.id)
            .then(response => {
                response.forEach(producto => {
                    this.total += parseFloat(producto.subtotal);
                });
                this.#agregarEstilo(shadow);
                this.#render(shadow);
            })
            .catch(error => {
                console.error("Error al obtener el usuario:", error);
            });
    }

    #render(shadow) {
        shadow.innerHTML += `
            <section id="sec${this.id}" class="orden">
                <div class="tarjeta">
                    <div class="info">
                        <p id="id">Orden #${this.id}</p>
                        <p id="fecha">${this.fecha}</p>
                        <p id="total">$${this.total}</p>
                    </div>
                </div>
                <div class="salto">
                </div>
            </section>
            `;
            
        shadow.getElementById("sec" + this.id).addEventListener('click', () => this.#verOrden());
    }

    #agregarEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/components/order/order.component.css");
        shadow.appendChild(link);
    }

    #formatDate(isoString) {
        const date = new Date(isoString);
    
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
    
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
    
        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    #verOrden(){
        SessionStorageService.setItem('orden', this.id);
        SessionStorageService.setItem('total', this.total);
        navigateTo('/views/order');
    }
}