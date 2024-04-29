import { SessionStorageService } from "../../services/SessionStorage.service.js";

export class RegisterPage extends HTMLElement {

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
                <h1>Crea tu cuenta</h1>
                <div class="login-form">
                    <div class="input-group">
                        <label for="username">Usuario</label>
                        <input type="text" id="username">
                    </div>
                    <div class="input-group">
                        <label for="email">Correo</label>
                        <input type="email" id="email">
                    </div>
                </div>
                <div class="login-form">  
                    <div class="input-group">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password">
                    </div>
                    <div class="input-group">
                        <label for="password">Confirmar contraseña</label>
                        <input type="password" id="password">
                    </div>
                </div>
                <button>Crear</button>
            </div>
		`;
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/pages/register/register.page.css");
        shadow.appendChild(link);
    }
}
