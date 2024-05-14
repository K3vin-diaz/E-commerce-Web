import { CookieService } from "../../services/Cookie.service.js";
import { SessionStorageService } from "../../services/SessionStorage.service.js";
import * as cuentaFetch from '../../../../fetch-api/cuentaFetch.js';

export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.cart = null;
        window.addEventListener('addToCart', (event) => this.#addToCartHandler(shadow, event.detail.product));
        window.addEventListener('pagarCarrito', () => this.#vaciarCarro(shadow));
        window.addEventListener('loginEvento', (event) => this.#changeToUser(event.detail.username, shadow));

        this.#verificarUsuario(shadow);

        const links = shadow.querySelectorAll('.links');
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');
                this.#handleLinkClick(href, shadow);
            });
        });
        this.#handleLinkClick("/views/", shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <header>
                <div class="header-content">
                    <a href="/views/" class="links"><img src="./src/assets/images/Logo v2.svg" class="logo"></a>
                    <a href="/views/" class="links" id="index"><h1>Inicio</h1></a>
                    <div class="search-container">
                        <input type="text" placeholder="Buscar..." class="search-input" id="search-input">
                        <button type="submit" class="search-button" id="search-button">
                            <img src="./src/assets/images/search.png" alt="Icono de búsqueda">
                        </button>
                    </div>
                    <div id="extraContainer">
                        <a href="/views/register" class="links" id="registro"><h1>Registrate</h1></a>
                        <a href="/views/login" class="links" id="inicio"><h1>Identifícate</h1></a>
                    </div>
                </div>
            </header>
            `;

        this.#setupSearchHandlers(shadow);
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/components/header/header.component.css");
        shadow.appendChild(link);
    }

    #setupSearchHandlers(shadow) {
        const searchInput = shadow.getElementById('search-input');
        const searchButton = shadow.getElementById('search-button');

        searchButton.addEventListener('click', () => {
            const busqueda = searchInput.value;
            navigateTo('/views/search');
            this.#handleLinkClick("/views/search", shadow);
            const buscarEvento = new CustomEvent('buscarEvento', {
                bubbles: true,
                detail: { busqueda }
            });

            window.dispatchEvent(buscarEvento);
        });

        searchInput.addEventListener('keypress', (event) => {
            const busqueda = searchInput.value;
            if (event.key === 'Enter') {
                navigateTo('/views/search');
                this.#handleLinkClick("/views/search", shadow);
                const buscarEvento = new CustomEvent('buscarEvento', {
                    bubbles: true,
                    detail: { busqueda }
                });

                window.dispatchEvent(buscarEvento);
            }
        });
    }

    #addToCartHandler(shadow) {
        const cart = shadow.getElementById('cart-text');
        if (cart) {
            const cartText = cart.textContent.trim();
            const numberOnly = cartText.replace('Carrito (', '').replace(')', '');
            let currentCount = parseInt(numberOnly);

            currentCount++;
            cart.textContent = "Carrito (" + currentCount + ")";
        }
    }

    #handleLinkClick(href, shadow) {
        const indexElement = shadow.getElementById('index');
        const loginElement = shadow.getElementById('inicio');
        const registroElement = shadow.getElementById('registro');
        const userElement = shadow.getElementById('userContent');
        const cartElement = shadow.getElementById('cart');

        indexElement.classList.remove('selec');
        if (loginElement) {
            loginElement.classList.remove('selec');
            registroElement.classList.remove('selec');
        } else {
            userElement.classList.remove('selec');
            cartElement.classList.remove('selec');
        }

        switch (href) {
            case "/views/":
                indexElement.classList.add('selec');
                break;
            case "/views/login":
                loginElement.classList.add('selec');
                break;
            case "/views/register":
                registroElement.classList.add('selec');
                break;
            case "/views/search":
                if (userElement) {
                    userElement.classList.add('selec');
                } else {
                    registroElement.classList.add('selec');
                }
                break;
            case "/views/cart":
                cartElement.classList.add('selec');
                break;
            case "/views/history":
                if (userElement) {
                    userElement.classList.add('selec');
                }
                break;
            default:
                break;
        }
    }

    #changeToUser(user, shadow) {
        this.#handleLinkClick("/views/", shadow);
        const count = CookieService.getProductsInCart().length;
        const cont = shadow.getElementById("extraContainer");
        cont.innerHTML = '';

        cont.innerHTML += `
            <a href="/views/cart" class="links" id="cart"><h1 id="cart-text">Carrito (${count})</h1></a>
            <div class="userContent" id="userContent">
                <h1 id="user">${user}▼</h1>
                <ul>
                    <li><a href="/views" id="lista">Lista<br>de deseos</a></li>
                    <li><a href="/views/history" id="history">Historial<br>de pedidos</a></li>
                    <li><a href="/views" id="cerrar">Cerrar sesión</a></li>
                </ul>
            </div>
        `;

        shadow.getElementById("cart").addEventListener('click', (event) => {
            const href = shadow.getElementById("cart").getAttribute('href');
            this.#handleLinkClick(href, shadow);
        });

        shadow.getElementById("cerrar").addEventListener('click', (event) => {
            SessionStorageService.removeItem('token');
            this.#verificarUsuario(shadow);
        });

        shadow.getElementById("history").addEventListener('click', (event) => {
            const href = shadow.getElementById("history").getAttribute('href');
            this.#handleLinkClick(href, shadow);
        });

        shadow.getElementById("lista").addEventListener('click', (event) => {
            const href = shadow.getElementById("lista").getAttribute('href');
            this.#handleLinkClick(href, shadow);
            alert("No realizado 🥲");
        });

        SessionStorageService.setItem('pago', false);
    }

    #vaciarCarro(shadow) {
        shadow.getElementById('cart-text').textContent = "Carrito (0)";
        SessionStorageService.setItem('pago', true);
    }

    #verificarUsuario(shadow) {
        const token = SessionStorageService.getItem('token');
        if (token !== 'undefined' && typeof token !== undefined && token !== null) {
            this.#addStyles(shadow);
            this.#render(shadow);
            cuentaFetch.usuario()
                .then(response => {
                    this.#changeToUser(response.username, shadow);
                })
        } else {
            shadow.innerHTML = ``;
            this.#addStyles(shadow);
            this.#render(shadow);
        }
    }
}