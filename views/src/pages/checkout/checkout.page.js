import { SessionStorageService } from "../../services/SessionStorage.service.js";
import { CookieService } from "../../services/Cookie.service.js";
import * as ordenFetch from '../../../../fetch-api/ordenFetch.js';
import * as ordenProductoFetch from '../../../../fetch-api/ordenproductoFetch.js';
import * as productoFetch from '../../../../fetch-api/productoFetch.js';

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
                    <h2>Total: $${SessionStorageService.getItem('total')}</h2>
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
        const fechaActual = new Date().toISOString().split('T')[0];
        const productosEnCarrito = CookieService.getProductsInCart();

        const ordenId = 1;
        const fechaOrden = fechaActual;
        
        const pagarCarritoEvento = new CustomEvent('pagarCarrito', {
            bubbles: true
        });
        window.dispatchEvent(pagarCarritoEvento);

        CookieService.deleteCookie('ProductsInCart');

        ordenFetch.crearOrden(fechaOrden, ordenId)
            .then(orden => {
                productosEnCarrito.forEach(producto => {
                    let productoConsultado;
                    productoFetch.obtenerProductoPorId(producto)
                        .then(producto => {
                            productoConsultado = producto;
                            const cantidad = 1;
                            const subtotal = productoConsultado.precio * cantidad;
                            ordenProductoFetch.crearProductoDeOrden(orden.id, producto.id, cantidad, subtotal, productoConsultado.precio * 1)
                                .then(ordenProducto => {
                                    console.log(orden.id, producto.id, cantidad, subtotal, productoConsultado.precio * 1);
                                })
                                .catch(error => {
                                    console.error('Error al crear ordenProducto:', error);
                                });
                        })
                });
            })
            .catch(error => {
                console.error('Error al crear la orden:', error);
            });
    }
}
