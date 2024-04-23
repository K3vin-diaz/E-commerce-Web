export class IndexPage extends HTMLElement {

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
            <div class="banner">
                <img src="src/assets/images/banner.png" id="banner-img" alt="Imagen de banner">
                <img src="src/assets/images/efecto.png" id="detail-img" alt="Imagen del frente">
                <header-info site="/"></header-info>
                <div class="producto">
                    <h1>Intel Core <br> i9 14th Gen</h1>
                </div>
                <div class="descripcion">
                    <p>Nuevo modelo</p>
                </div>
                <div class="boton-detalles">
                    <button class="ver-detalles" id="btn1">Ver detalles</button>
                </div>
            </div>
            <product-index producto-Id="1" version="1"></product-index>
            <product-index producto-Id="3" version="2"></product-index>
            <a href="/login" class="test">LOGIN</a>
            <a href="/register" class="test">REGISTER</a>
            <a href="/search" class="test">SEARCH</a>
		`;
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/pages/index/index.page.css");
        shadow.appendChild(link);
    }
}

window.onload = function () {
    resizeBanner();
};

window.addEventListener('resize', resizeBanner);

function resizeBanner() {
    const contenedor = document.querySelector('#cont');
    const shadowRoot = contenedor.shadowRoot;

    var banner = shadowRoot.querySelector('.banner');
    var img = shadowRoot.getElementById('banner-img');
    var imgDetail = shadowRoot.getElementById('detail-img');
    var imgHeight = img.clientHeight;
    banner.style.height = imgHeight + 'px';
    imgDetail.style.height = imgHeight + 'px';
}
