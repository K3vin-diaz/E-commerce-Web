import { SessionStorageService } from "../../services/SessionStorage.service.js";
import * as cuentaFetch from '../../../../fetch-api/cuentaFetch.js';

export class RegisterPage extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.#agregaEstilo(this.shadow);
        this.#render(this.shadow);
        this.shadow.querySelector('button').addEventListener('click', this.#registrar.bind(this));
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
                        <input type="password" id="confirm-password">
                    </div>
                </div>
                <button>Crear</button>
            </div>
		`;
    }

    #registrar() {
        const usernameInput = this.shadow.querySelector('#username');
        const emailInput = this.shadow.querySelector('#email');
        const passwordInput = this.shadow.querySelector('#password');
        const confirmPasswordInput = this.shadow.querySelector('#confirm-password');
        const confirmPassword = confirmPasswordInput.value.trim();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === '') {
            alert('Por favor, introduce un nombre de usuario.');
            return;
        }
        if (email === '') {
            alert('Por favor, introduce un correo electrónico.');
            return;
        }
        if (!isValidEmail(email)) {
            alert('Por favor, introduce un correo electrónico válido.');
            return;
        }
        if (password === '') {
            alert('Por favor, introduce una contraseña.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        cuentaFetch.registrar(username, email, password)
            .then(response => {
                SessionStorageService.setItem('token', response.token);
                console.log('Respuesta del servidor:', response);
            })
            .catch(error => {
                console.error('Error en el registro:', error);
            });
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/pages/register/register.page.css");
        shadow.appendChild(link);
    }


}

