export class IndexPage extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.#agregaEstilo(this.shadow);
        this.#render(this.shadow);
        this.#waitForImagesToLoad(this.shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="banner">
                <img src="src/assets/images/banner.png" id="banner-img" alt="Imagen de banner">
                <img src="src/assets/images/efecto.png" id="detail-img" alt="Imagen del frente">
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
		`;
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/pages/index/index.page.css");
        shadow.appendChild(link);
    }

    #waitForImagesToLoad(shadow) {
        const img = shadow.querySelector('#banner-img');
        const detailImg = shadow.querySelector('#detail-img');

        const imagesToLoad = [img, detailImg];
        let loadedCount = 0;

        const checkAllImagesLoaded = () => {
            loadedCount++;
            if (loadedCount === imagesToLoad.length) {
                resizeBanner(shadow);
            }
        };

        imagesToLoad.forEach(image => {
            if (image.complete) {
                checkAllImagesLoaded();
            } else {
                image.addEventListener('load', checkAllImagesLoaded);
            }
        });
    }
}

window.onload = function () {
    resizeBanner();
};

window.addEventListener('resize', resizeBanner);

function resizeBanner() {
    const contenedor = document.querySelector('#cont');
    if (contenedor !== null) {
        const shadowRoot = contenedor.shadowRoot;

        var banner = shadowRoot.querySelector('.banner');
        var img = shadowRoot.getElementById('banner-img');
        var imgDetail = shadowRoot.getElementById('detail-img');
        var imgHeight = img.clientHeight;
        var bannerHeight = imgHeight - (imgHeight/4)
        banner.style.height = bannerHeight + 'px';
        imgDetail.style.height = imgHeight + 'px';
    }
}
