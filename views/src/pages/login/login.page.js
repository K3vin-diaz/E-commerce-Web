import { SessionStorageService } from "../../services/SessionStorage.service.js";
import * as cuentaFetch from '../../../../fetch-api/cuentaFetch.js';

export class LoginPage extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.#agregaEstilo(this.shadow);
        this.#render(this.shadow);
        this.shadow.querySelector('button').addEventListener('click', this.#iniciarSesion.bind(this));
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="login">
                <h1>Iniciar sesión</h1>
                <div class="login-form">
                    <div class="input-group">
                        <label for="username">Usuario</label>
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

    #iniciarSesion() {
        const username = this.shadow.querySelector('#username').value;
        const password = this.shadow.querySelector('#password').value;

        if (username === '') {
            alert('Por favor, introduce un nombre de usuario.');
            return;
        }
        if (password === '') {
            alert('Por favor, introduce una contraseña.');
            return;
        }
        cuentaFetch.iniciarSesion(username, password)
            .then(response => {
                SessionStorageService.setItem('token', response.token);
                
                alert('Ingresaste correctamente!');
                const loginEvento = new CustomEvent('loginEvento', {
                    bubbles: true,
                    detail: { username }
                });
                
                window.dispatchEvent(loginEvento);
                navigateTo('/views/');
            })
            .catch(error => {
                alert('Usuario o contraseña incorrectos.');
            });
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/pages/login/login.page.css");
        shadow.appendChild(link);
    }
}
