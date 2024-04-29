export class CookieService {
    constructor() {}

    static setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = `; expires=${date.toUTCString()}`
        }

        document.cookie = `${name}=${value}${expires}; path=/`;
    }

    static getCookie(name) {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return cookieValue.trim();
            }
        }

        return null;
    }

    static addProductToCart(product) {
        let products = this.getProductsInCart();
        products.push(product);
        const productsString = JSON.stringify(products);
        this.setCookie('ProductsInCart', productsString, 30);
    }

    static getProductsInCart() {
        const productsCookie = this.getCookie('ProductsInCart');
        return productsCookie ? JSON.parse(productsCookie) : [];
    }
}
