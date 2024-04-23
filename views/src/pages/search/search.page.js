export class SearchPage extends HTMLElement {

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
            <header-info></header-info>
            <div class="filtros">
                
            </div>
            <div class="resultados">
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
