import { SessionStorageService } from "../../services/SessionStorage.service.js";

export class LoginPage extends HTMLElement {

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
            <div class="login">
                <h1>Iniciar sesión</h1>
                <div class="login-form">
                    <div class="input-group">
                        <label for="username">Usuario / Correo</label>
                        <input type="text" id="username">
                    </div>
                    <div class="input-group">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password">
                    </div>
                </div>
                <button>Iniciar</button>
            </div>
		`;
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/pages/login/login.page.css");
        shadow.appendChild(link);
    }
}
