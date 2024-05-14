import { SessionStorageService } from "../../services/SessionStorage.service.js";
import * as productoFecth from '../../../../fetch-api/productoFetch.js';
import { CookieService } from "../../services/Cookie.service.js";

export class ProductPage extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.#agregaEstilo(this.shadow);
        this.#render(this.shadow);
        this.#consultaProducto(SessionStorageService.getItem('producto'), this.shadow);
    }

    #render(shadow) {
        const productoId = SessionStorageService.getItem('producto');
        const img = './src/assets/images/'+ productoId + ".jpg"
        shadow.innerHTML += `
            <div class="aviso" id="aviso">
                <h1>Se agregó al carrito de compras</h1>
            </div>
            <div class="contenido">
                <div class="nombre">
                    <h1 id="nombre">...</h1>
                </div>
                <div class="precio">
                    <h1 id="precio">...</h1>
                </div>
                <div class="img">
                    <img src=${img}>
                </div>
                <div class="descripcion">
                    <h1 id="descripcion">...</h1>
                </div>
                <div class="botones">
                    <button class="comprar" id="comprar">Comprar</button>
                    <button class="boton-icono" id="i${productoId}"><img src="./src/assets/images/heart.png"></button>
                </div>
                <button class="floating-button" onclick="navigateTo('/views/')">Regresar</button>
            </div>
		`;
        if (!SessionStorageService.getItem('token')) {
            shadow.getElementById(`i${productoId}`).remove();
            shadow.getElementById('comprar').remove();
        } else {
            shadow.getElementById(`comprar`).addEventListener('click', () => this.#addToCartHandler(shadow, SessionStorageService.getItem("producto")));
        }
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/pages/product/product.page.css");
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

    #addToCartHandler(shadow, product) {
        CookieService.addProductToCart(product);
        const avisoElement = shadow.getElementById('aviso');
        avisoElement.style.display = "block";

        const addToCartEvent = new CustomEvent('addToCart', {
            bubbles: true,
            detail: { product }
        });

        window.dispatchEvent(addToCartEvent);
    }
}
