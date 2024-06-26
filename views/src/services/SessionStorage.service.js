export class SessionStorageService{
    constructor(){}

    static setItem(key, value){
        sessionStorage.setItem(key, value);
    }

    static getItem(key){
        return sessionStorage.getItem(key);
    }

    static removeItem(key){
        return sessionStorage.removeItem(key);
    }
}