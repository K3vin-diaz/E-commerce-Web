import { CookieService } from "../../services/Cookie.service.js";
import { SessionStorageService } from "../../services/SessionStorage.service.js";
import * as productoFecth from '../../../../fetch-api/productoFetch.js';

export class CartPage extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.total = 0;
    }

    connectedCallback() {
        this.#agregaEstilo(this.shadow);
        this.listaProductos = [];

        const listaIds = CookieService.getProductsInCart();
        const promesasProductos = listaIds.map(productoId => productoFecth.obtenerProductoPorId(productoId));

        Promise.all(promesasProductos)
            .then(productos => {
                this.listaProductos = productos;
                this.#render(this.shadow);
            })
            .catch(error => {
                console.error("Error al obtener los productos:", error);
            });
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="aviso2" id="aviso2">
                <h1>Gracias por su compra</h1>
            </div>
            <div class="cart-container">
                <h1>Carrito de compras</h1>
                <h1 id="aviso">Agrega productos al carrito. . .</h1>
                <div class="carrito">
                    <div class="lista">
                        ${this.listaProductos.map(producto => this.#renderCard(producto)).join('')}
                        <div class="total" id="total">
                            <h1>Total: $${this.total}</h1>
                        </div>
                    </div>
                    <div class="boton" id="boton">
                        <a href="/views/checkout"><button id="comprar">Comprar</button></a>
                    </div>
                </div>
            </div>
		`;

        if (this.total === 0) {
            shadow.getElementById('aviso').style.display = 'block';
            shadow.getElementById('boton').style.display = 'none';
            shadow.getElementById('total').style.display = 'none';
        }

        shadow.getElementById(`comprar`).addEventListener('click', () => this.#guardarTotal());

        if (SessionStorageService.getItem('pago') === 'true') {
            shadow.getElementById('aviso2').style.display = "block";
            SessionStorageService.setItem('pago', false)
        }
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/pages/cart/cart.page.css");
        shadow.appendChild(link);
    }

    #renderCard(product) {
        const precio = product.precio
        this.total += parseFloat(precio);
        return `
			<product-cart id="${product.id}" nombre="${product.nombre}" descripcion="${product.descripcion}" precio="${product.precio}" categoria="${product.categoria}"></product-cart>
		`
    }

    #guardarTotal() {
        SessionStorageService.setItem('total', this.total);
    }
}
