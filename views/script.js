import { HeaderComponent } from "./src/components/header/header.component.js"
import { FooterComponent } from "./src/components/footer/footer.component.js"
import { ProductIndexComponent } from "./src/components/product-index/product-index.component.js"
import { IndexPage } from "./src/pages/index/index.page.js";
import { LoginPage } from "./src/pages/login/login.page.js";
import { RegisterPage } from "./src/pages/register/register.page.js";
import { SearchPage } from "./src/pages/search/search.page.js";

document.addEventListener('DOMContentLoaded', function(){
    //configuración de rutas
    page('/', ()=> showContent('index-page'));
    page('/login', ()=> showContent('login-page'));
    page('/register', ()=> showContent('register-page'));
    page('/search', ()=> showContent('search-page'));

    //inicializar el routeo
    page();
})

function showContent(contentId){
    const contentContainer =  document.getElementById('content');
    contentContainer.innerHTML = `<${contentId}></${contentId}>`
}

//Components
window.customElements.define('header-info', HeaderComponent);
window.customElements.define('footer-info', FooterComponent);
window.customElements.define('product-index', ProductIndexComponent);
//Pages
window.customElements.define('index-page', IndexPage);
window.customElements.define('login-page', LoginPage);
window.customElements.define('register-page', RegisterPage);
window.customElements.define('search-page', SearchPage);
/* window.customElements.define('cart-page', CartPage); */
