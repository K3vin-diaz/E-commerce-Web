import { HeaderComponent } from "./src/components/header/header.component.js"
import { FooterComponent } from "./src/components/footer/footer.component.js"
import { ProductIndexComponent } from "./src/components/product-index/product-index.component.js"
import { ProductSearchComponent } from "./src/components/product-search/product-search.component.js";
import { ProductCartComponent } from "./src/components/product-cart/product-cart.component.js";
import { IndexPage } from "./src/pages/index/index.page.js";
import { LoginPage } from "./src/pages/login/login.page.js";
import { RegisterPage } from "./src/pages/register/register.page.js";
import { SearchPage } from "./src/pages/search/search.page.js";
import { CartPage } from "./src/pages/cart/cart.page.js";
import { ProductPage } from "./src/pages/product/product.page.js";
import { CheckoutPage } from "./src/pages/checkout/checkout.page.js"; 

document.addEventListener('DOMContentLoaded', function () {
    //configuración de rutas
    page('/views/', () => showContent('index-page', "cont"));
    page('/views/login', () => showContent('login-page'));
    page('/views/register', () => showContent('register-page'));
    page('/views/search', () => showContent('search-page'));
    page('/views/cart', () => showContent('cart-page'));
    page('/views/product', () => showContent('product-page'));
    page('/views/checkout', () => showContent('checkout-page'));

    page('/views/*', () => showContent('index-page', "cont"));

    page();
})

function showContent(contentId, id) {
    const contentContainer = document.getElementById('content');
    if (id === undefined) {
        contentContainer.innerHTML = `<${contentId}></${contentId}>`;
    } else {
        contentContainer.innerHTML = `<${contentId} id = ${id}></${contentId}>`;
    }
}

window.navigateTo = function (path) {
    page(path);
}

//Components
window.customElements.define('header-info', HeaderComponent);
window.customElements.define('footer-info', FooterComponent);
window.customElements.define('product-index', ProductIndexComponent);
window.customElements.define('product-search', ProductSearchComponent);
window.customElements.define('product-cart', ProductCartComponent);
//Pages
window.customElements.define('index-page', IndexPage);
window.customElements.define('login-page', LoginPage);
window.customElements.define('register-page', RegisterPage);
window.customElements.define('search-page', SearchPage);
window.customElements.define('cart-page', CartPage);
window.customElements.define('product-page', ProductPage);
window.customElements.define('checkout-page', CheckoutPage);
