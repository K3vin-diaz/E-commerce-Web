export class FooterComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.#addStyles(shadow);
        this.#render(shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
		<footer>
			<div class="footer-content">
				<h1>TekEz© 2024</h1>
			</div>
		</footer>
	  	`;
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/components/footer/footer.component.css");
        shadow.appendChild(link);
    }
}