export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const site = this.getAttribute("site");
        const shadow = this.attachShadow({ mode: "open" });
        this.#addStyles(shadow);
        this.#render(shadow, site);
    }

    #render(shadow, site) {
        shadow.innerHTML += `
		<header>
			<div class="header-content">
                <a href="/views/"><img src="./src/assets/images/Logo v2.svg" class="logo"></a>
				<a href="/views/" class="links" id="index"><h1>Inicio</h1></a>
                <div class="search-container">
                    <input type="text" placeholder="Buscar..." class="search-input" id="search-input">
                    <button type="submit" class="search-button" id="search-button">
                        <img src="./src/assets/images/search.png" alt="Icono de búsqueda">
                    </button>
                </div>
                <a href="/views/register" class="links" id="registro"><h1>Registrate</h1></a>
                <a href="/views/login" class="links" id="inicio"><h1>Identificate</h1></a>
			</div>
		</header>
	  	`;

        switch (site) {
            case "/":
                const indexElement = shadow.getElementById('index');
                indexElement.classList.add('selec');
                break;
            case "login":
                const loginElement = shadow.getElementById('inicio');
                loginElement.classList.add('selec');
                break;
            case "register":
                const registroElement = shadow.getElementById('registro');
                registroElement.classList.add('selec');
                break;
            default:
                break;
        }
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
            this.#redirectToSearchPage(searchInput.value);
        });

        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.#redirectToSearchPage(searchInput.value);
            }
        });
    }

    #redirectToSearchPage() {
        navigateTo('/views/search');
    }
}