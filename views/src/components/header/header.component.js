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
                <a href="/"><img src="./src/assets/images/Logo v2.svg" class="logo"></a>
				<a href="/" class="links" id="index"><h1>Inicio</h1></a>
                <div class="search-container">
                    <input type="text" placeholder="Buscar..." class="search-input">
                    <button type="submit" class="search-button">
                        <img src="./src/assets/images/search.png" alt="Icono de búsqueda">
                    </button>
                </div>
                <a href="/registro" class="links" id="registro"><h1>Registrate</h1></a>
                <a href="/inicio" class="links" id="inicio"><h1>Identificate</h1></a>
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
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/components/header/header.component.css");
        shadow.appendChild(link);
    }
}