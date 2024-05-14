import { SessionStorageService } from "../../services/SessionStorage.service.js";
import * as ordenFetch from '../../../../fetch-api/ordenFetch.js';
import * as cuentaFetch from '../../../../fetch-api/cuentaFetch.js';

export class HistoryPage extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.total = 0;
    }

    connectedCallback() {
        this.#agregaEstilo(this.shadow);
        this.listaOrdenes = [];

        cuentaFetch.usuario()
            .then(response => {
                ordenFetch.obtenerOrdenPorCuenta(response.id)
                    .then(response => {
                        this.listaOrdenes = response;
                        this.#render(this.shadow);
                    })
                    .catch(error => {
                        console.error("Error al obtener las ordenes:", error);
                    });
            })
            .catch(error => {
                console.error("Error al obtener el usuario:", error);
            });
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="cart-container">
                <h1>Historial de pedidos</h1>
                <h1 id="aviso">Compra productos. . .</h1>
                <div class="pedidos">
                    <div class="lista">
                        ${this.listaOrdenes.map(orden => this.#renderCard(orden)).join('')}
                    </div>
                </div>
            </div>
		`;

        if (this.total === 0) {
            shadow.getElementById('aviso').style.display = 'block';
            shadow.getElementById('boton').style.display = 'none';
            shadow.getElementById('total').style.display = 'none';
        }
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/pages/history/history.page.css");
        shadow.appendChild(link);
    }

    #renderCard(orden) {
        this.total ++;
        return `
			<order-history id="${orden.id}" fecha="${orden.createdAt}"></order-history>
		`
    }
}
