import { CookieService } from "../../services/Cookie.service.js";

export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.cart = null;
        this.#addStyles(shadow);
        this.#render(shadow);
        window.addEventListener('addToCart', (event) => this.#addToCartHandler(shadow, event.detail.product));
        /* window.addEventListener('login', (event) => this.#changeToUser(event.detail.user, shadow)); */

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
            navigateTo('/views/search');
            this.#changeToUser('LoanWeefos', shadow);
            this.#handleLinkClick("/views/search", shadow);
        });

        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                navigateTo('/views/search');
                this.#changeToUser('LoanWeefos', shadow);
                this.#handleLinkClick("/views/search", shadow);
            }
        });
    }

    #addToCartHandler(shadow) {
        const cart = shadow.getElementById('cart');
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
                userElement.classList.add('selec');
                break;
            case "/views/cart":
                cartElement.classList.add('selec');
                break;
            default:
                break;
        }
    }

    #changeToUser(user, shadow) {
        const count = CookieService.getProductsInCart().length;
        const cont = shadow.getElementById("extraContainer");
        cont.innerHTML = '';

        cont.innerHTML += `
            <a href="/views/cart" class="links" id="cart"><h1 id="cart-text">Carrito (${count})</h1></a>
            <div class="userContent" id="userContent">
                <h1 id="user">${user}▼</h1>
                <ul>
                    <li><a href="/">Lista<br>de deseos</a></li>
                    <li><a href="/">Historial<br>de pedidos</a></li>
                    <li><a href="/views/">Cerrar sesión</a></li>
                </ul>
            </div>
        `;

        shadow.getElementById("cart").addEventListener('click', (event) => {
            const href = shadow.getElementById("cart").getAttribute('href');
            this.#handleLinkClick(href, shadow);
        });
    }
}