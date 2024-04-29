import { SessionStorageService } from "../../services/SessionStorage.service.js";
import { CookieService } from "../../services/Cookie.service.js";

export class CheckoutPage extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.#agregaEstilo(this.shadow);
        this.#render(this.shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="checkout">
                <div class="titulos">
                    <h1>Método de pago</h1>
                    <h2>Total: ${SessionStorageService.getItem('total')}</h2>
                </div>
                <div class="checkout-form">
                    <div class="input-group">
                        <label for="tarjeta">Núm. de tarjeta</label>
                        <input type="text" id="tarjeta">
                    </div>
                    <div class="input-group">
                        <label for="fecha">Fecha de caducidad</label>
                        <input type="date" id="fecha">
                    </div>
                </div>
                <div class="checkout-form">  
                    <div class="input-group">
                        <label for="titular">Titular de la tarjeta</label>
                        <input type="titular" id="titular">
                    </div>
                </div>
                <div class="checkout-form">  
                    <div class="input-group">
                        <label for="cvv">CVV</label>
                        <input type="text" id="cvv">
                    </div>
                    <div class="input-group">
                        <a href="/views/cart"><button class="pagar" id="pagar">Pagar</button></a>
                    </div>
                </div>
            </div>
		`;

        shadow.getElementById(`pagar`).addEventListener('click', () => this.#pagarCarritoHandler());
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/pages/checkout/checkout.page.css");
        shadow.appendChild(link);
    }

    #pagarCarritoHandler() {
        CookieService.deleteCookie('ProductsInCart');

        const pagarCarritoEvento = new CustomEvent('pagarCarrito', {
            bubbles: true
        });

        window.dispatchEvent(pagarCarritoEvento);
    }
}
